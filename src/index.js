import TabContent from './Components/TabContent';
import { OAuthWindowManager } from './OAuthWindowManager';

// Use CommonJS build to avoid ES module issues with axios
const {
  NintendoAuth,
  NintendoParentalAPI,
  DeviceManager,
  PlayTimeMonitor
} = require('@allow2/nintendo-switch-api');

function plugin(context) {
  let nintendo = {};
  let state = null;
  let auth = null;
  let api = null;
  let deviceManager = null;
  let playTimeMonitor = null;
  let oauthManager = null;

  nintendo.onLoad = function(loadState) {
    console.log('Nintendo Switch plugin loading...');

    state = loadState || {
      auth: { sessionToken: null },
      devices: {},
      childPlayers: {},
      pairings: {}, // playerId → { allow2ChildId, activityType, enabled, deviceId }
      settings: { pollInterval: 300000 }
    };

    // Initialize Nintendo API
    auth = new NintendoAuth();
    if (state.auth.sessionToken) {
      auth.setSessionToken(state.auth.sessionToken);
    }

    api = new NintendoParentalAPI(auth);
    deviceManager = new DeviceManager(api);
    playTimeMonitor = new PlayTimeMonitor(api);
    oauthManager = new OAuthWindowManager(context.BrowserWindow);

    // Setup monitoring events
    playTimeMonitor.on('playTimeIncreased', async (data) => {
      console.log('Play time increased:', data);

      // Find pairing
      const pairing = state.pairings[data.playerId];
      if (!pairing || !pairing.enabled) return;

      // Report to Allow2
      try {
        await context.allow2.reportUsage(
          pairing.allow2ChildId,
          pairing.activityType,
          data.delta
        );

        // Check quota
        const child = context.allow2.getChild(pairing.allow2ChildId);
        const quota = child.activities[pairing.activityType];

        if (quota && quota.timeRemaining <= 0) {
          // ENFORCE: Disable gaming
          await deviceManager.disableGaming(pairing.deviceId);

          context.sendToRenderer && context.sendToRenderer('quotaExhausted', {
            playerId: data.playerId,
            nickname: data.nickname,
            allow2ChildId: pairing.allow2ChildId
          });
        }
      } catch (error) {
        console.error('Error reporting usage:', error);
      }
    });

    playTimeMonitor.on('gamingActive', (data) => {
      context.sendToRenderer && context.sendToRenderer('gamingActive', data);
    });

    // Start monitoring paired children
    Object.entries(state.pairings).forEach(([playerId, pairing]) => {
      if (pairing.enabled && pairing.deviceId) {
        playTimeMonitor.startMonitoring(pairing.deviceId, state.settings.pollInterval);
      }
    });

    setupIPCHandlers(context);
    console.log('Nintendo Switch plugin loaded');
  };

  nintendo.newState = function(newState) {
    state = newState;
  };

  nintendo.onSetEnabled = function(enabled) {
    if (enabled) {
      Object.entries(state.pairings).forEach(([playerId, pairing]) => {
        if (pairing.enabled) {
          playTimeMonitor.startMonitoring(pairing.deviceId, state.settings.pollInterval);
        }
      });
    } else {
      playTimeMonitor.cleanup();
    }
  };

  nintendo.onUnload = function(callback) {
    oauthManager?.close();
    playTimeMonitor?.cleanup();
    callback(null);
  };

  function setupIPCHandlers(context) {
    // Start OAuth flow
    context.ipcMain.handle('startOAuth', async (event) => {
      try {
        // Generate OAuth URL with PKCE
        const { authUrl, state: oauthState, verifier } = auth.generateAuthUrl();

        // Open browser and handle flow
        const result = await oauthManager.startOAuthFlow(authUrl, oauthState, verifier, auth);

        if (result.needsSelection) {
          // Multiple accounts - return to renderer for selection
          return [null, { needsSelection: true, accounts: result.accounts, state: result.state, verifier: result.verifier }];
        } else {
          // Single account or selection complete - save token
          state.auth = { sessionToken: result.sessionToken };
          context.configurationUpdate(state);

          // Authenticate
          await auth.authenticate();

          return [null, { success: true, sessionToken: result.sessionToken }];
        }
      } catch (error) {
        return [error];
      }
    });

    // Handle account selection (multiple accounts case)
    context.ipcMain.handle('selectAccount', async (event, { accountHref, state: oauthState, verifier }) => {
      try {
        const result = await oauthManager.selectAccount(accountHref, oauthState, verifier, auth);

        // Save session token
        state.auth = { sessionToken: result.sessionToken };
        context.configurationUpdate(state);

        // Authenticate
        await auth.authenticate();

        return [null, { success: true }];
      } catch (error) {
        return [error];
      }
    });

    // Authenticate (legacy - keep for backward compatibility)
    context.ipcMain.handle('authenticateNintendo', async (event, sessionToken) => {
      try {
        auth.setSessionToken(sessionToken);
        await auth.authenticate();
        state.auth = { sessionToken };
        context.configurationUpdate(state);
        return [null, { success: true }];
      } catch (error) {
        return [error];
      }
    });

    // Discover devices and children
    context.ipcMain.handle('discoverDevices', async (event) => {
      try {
        const devices = await deviceManager.discover();
        const childPlayers = {};

        for (const device of devices) {
          const players = await deviceManager.getChildPlayers(device.deviceId);
          players.forEach(player => {
            childPlayers[player.playerId] = player;
          });
        }

        state.devices = devices.reduce((acc, d) => ({ ...acc, [d.deviceId]: d }), {});
        state.childPlayers = childPlayers;
        context.configurationUpdate(state);

        return [null, { devices, childPlayers }];
      } catch (error) {
        return [error];
      }
    });

    // Pair child
    context.ipcMain.handle('pairChild', async (event, { playerId, allow2ChildId, activityType }) => {
      try {
        const player = state.childPlayers[playerId];
        const pairing = {
          allow2ChildId,
          activityType: activityType || 1,
          enabled: true,
          deviceId: player.deviceId
        };

        state.pairings[playerId] = pairing;
        context.configurationUpdate(state);

        playTimeMonitor.startMonitoring(player.deviceId, state.settings.pollInterval);
        return [null, { success: true }];
      } catch (error) {
        return [error];
      }
    });

    // Toggle monitoring
    context.ipcMain.handle('toggleMonitoring', async (event, { playerId, enabled }) => {
      try {
        state.pairings[playerId].enabled = enabled;
        context.configurationUpdate(state);

        const pairing = state.pairings[playerId];
        if (enabled) {
          playTimeMonitor.startMonitoring(pairing.deviceId, state.settings.pollInterval);

          // Re-enable gaming if Allow2 quota available
          const child = context.allow2.getChild(pairing.allow2ChildId);
          const quota = child.activities[pairing.activityType];
          if (quota && quota.timeRemaining > 0) {
            await deviceManager.enableGaming(pairing.deviceId, quota.timeRemaining);
          }
        } else {
          playTimeMonitor.stopMonitoring(pairing.deviceId);
        }

        return [null, { success: true }];
      } catch (error) {
        return [error];
      }
    });

    // Manual sync
    context.ipcMain.handle('syncNow', async (event, playerId) => {
      try {
        const pairing = state.pairings[playerId];
        await playTimeMonitor.poll(pairing.deviceId);
        return [null, { success: true }];
      } catch (error) {
        return [error];
      }
    });

    // Unpair
    context.ipcMain.handle('unpairChild', async (event, playerId) => {
      try {
        const pairing = state.pairings[playerId];
        playTimeMonitor.stopMonitoring(pairing.deviceId);
        delete state.pairings[playerId];
        context.configurationUpdate(state);
        return [null, { success: true }];
      } catch (error) {
        return [error];
      }
    });
  }

  return nintendo;
}

module.exports = {
  plugin,
  TabContent,
  requiresMainProcess: true
};
