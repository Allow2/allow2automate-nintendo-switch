import axios from 'axios';

/**
 * Nintendo Switch Parental Controls "Moon" API Client
 *
 * Provides read-only access to Nintendo Switch gaming data via the
 * Parental Controls API. Tokens expire every 15 minutes and must be refreshed.
 *
 * Rate Limiting: Maximum 1 request per minute per device
 */
class NintendoMoonAPI {
  constructor(sessionToken) {
    this.baseURL = 'https://api-lp1.pctl.srv.nintendo.net/moon/v1';
    this.sessionToken = sessionToken;
    this.accessToken = null;
    this.tokenExpiry = null;
    this.lastRequestTime = {};
    this.eventHandlers = {};
  }

  /**
   * Register event handler
   * Events: authExpired, deviceUpdate, gamingStateChanged
   */
  on(event, handler) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(handler);
  }

  /**
   * Emit event to all registered handlers
   */
  emit(event, data) {
    const handlers = this.eventHandlers[event] || [];
    handlers.forEach(handler => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in ${event} handler:`, error);
      }
    });
  }

  /**
   * Authenticate with Nintendo and get access token
   */
  async authenticate() {
    try {
      console.log('[NintendoAPI] Authenticating...');

      // Exchange session token for access token
      const response = await axios.post(
        `${this.baseURL}/users/me`,
        {},
        {
          headers: {
            'X-Moon-Session-Token': this.sessionToken,
            'Content-Type': 'application/json'
          }
        }
      );

      this.accessToken = response.data.accessToken;
      // Tokens expire in 15 minutes
      this.tokenExpiry = Date.now() + (15 * 60 * 1000);

      console.log('[NintendoAPI] Authentication successful');
      return true;
    } catch (error) {
      console.error('[NintendoAPI] Authentication failed:', error.message);
      this.emit('authExpired', { error: error.message });
      throw new Error(`Nintendo authentication failed: ${error.message}`);
    }
  }

  /**
   * Refresh access token if expired or close to expiry
   */
  async refreshToken() {
    if (!this.tokenExpiry || Date.now() >= this.tokenExpiry - (60 * 1000)) {
      console.log('[NintendoAPI] Refreshing token...');
      await this.authenticate();
    }
  }

  /**
   * Rate limit check - max 1 request per minute per device
   */
  async checkRateLimit(deviceId) {
    const now = Date.now();
    const lastRequest = this.lastRequestTime[deviceId] || 0;
    const timeSinceLastRequest = now - lastRequest;

    if (timeSinceLastRequest < 60000) {
      const waitTime = 60000 - timeSinceLastRequest;
      console.log(`[NintendoAPI] Rate limit: waiting ${waitTime}ms for device ${deviceId}`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.lastRequestTime[deviceId] = Date.now();
  }

  /**
   * Make authenticated API request
   */
  async request(endpoint, options = {}) {
    await this.refreshToken();

    try {
      const response = await axios({
        method: options.method || 'GET',
        url: `${this.baseURL}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      return response.data;
    } catch (error) {
      console.error(`[NintendoAPI] Request failed: ${endpoint}`, error.message);

      if (error.response?.status === 401) {
        this.emit('authExpired', { error: 'Token expired' });
      }

      throw error;
    }
  }

  /**
   * Get list of paired Nintendo Switch devices
   */
  async getDevices() {
    console.log('[NintendoAPI] Fetching devices...');

    try {
      const data = await this.request('/devices');
      const devices = data.devices || [];

      console.log(`[NintendoAPI] Found ${devices.length} device(s)`);
      this.emit('deviceUpdate', { devices });

      return devices.map(device => ({
        deviceId: device.deviceId,
        name: device.name || 'Nintendo Switch',
        model: device.model || 'Unknown',
        serialNumber: device.serialNumber
      }));
    } catch (error) {
      console.error('[NintendoAPI] Failed to get devices:', error.message);
      throw error;
    }
  }

  /**
   * Get daily gaming summary for a specific device
   * Returns child accounts and their play time
   */
  async getDailySummary(deviceId, date = new Date()) {
    await this.checkRateLimit(deviceId);

    const dateStr = date.toISOString().split('T')[0];
    console.log(`[NintendoAPI] Fetching daily summary for device ${deviceId} on ${dateStr}`);

    try {
      const data = await this.request(`/devices/${deviceId}/daily_summaries/${dateStr}`);

      const players = (data.players || []).map(player => ({
        playerId: player.playerId,
        nickname: player.nickname || 'Unknown',
        imageUri: player.imageUri || null,
        playingTime: player.playingTime || 0, // minutes
        isPlaying: player.playingState === 'PLAYING',
        lastPlayedAt: player.lastPlayedAt
      }));

      console.log(`[NintendoAPI] Daily summary: ${players.length} player(s)`);

      return {
        device: {
          deviceId,
          name: data.deviceName || 'Nintendo Switch'
        },
        date: dateStr,
        players
      };
    } catch (error) {
      console.error(`[NintendoAPI] Failed to get daily summary for ${deviceId}:`, error.message);
      throw error;
    }
  }

  /**
   * Get current playing state for a device
   * Checks if anyone is actively gaming right now
   */
  async getPlayingState(deviceId) {
    await this.checkRateLimit(deviceId);

    console.log(`[NintendoAPI] Checking playing state for device ${deviceId}`);

    try {
      const data = await this.request(`/devices/${deviceId}/playing_state`);

      const isPlaying = data.state === 'PLAYING';
      const currentPlayer = data.player ? {
        playerId: data.player.playerId,
        nickname: data.player.nickname,
        imageUri: data.player.imageUri
      } : null;

      console.log(`[NintendoAPI] Playing state: ${isPlaying ? 'ACTIVE' : 'IDLE'}`);

      this.emit('gamingStateChanged', {
        deviceId,
        isPlaying,
        currentPlayer
      });

      return {
        deviceId,
        isPlaying,
        currentPlayer
      };
    } catch (error) {
      console.error(`[NintendoAPI] Failed to get playing state for ${deviceId}:`, error.message);
      throw error;
    }
  }

  /**
   * Get monthly summary (historical data)
   */
  async getMonthlySummary(deviceId, year, month) {
    await this.checkRateLimit(deviceId);

    const monthStr = `${year}-${String(month).padStart(2, '0')}`;
    console.log(`[NintendoAPI] Fetching monthly summary for device ${deviceId} on ${monthStr}`);

    try {
      const data = await this.request(`/devices/${deviceId}/monthly_summaries/${monthStr}`);
      return data;
    } catch (error) {
      console.error(`[NintendoAPI] Failed to get monthly summary:`, error.message);
      throw error;
    }
  }
}

export default NintendoMoonAPI;
