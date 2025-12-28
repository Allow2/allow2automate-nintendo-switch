/**
 * Gaming Monitor
 *
 * Polls Nintendo API at regular intervals and reports usage to Allow2.
 * Tracks gaming time per child and emits events when quotas are exceeded.
 */
class GamingMonitor {
  constructor({ nintendoAPI, allow2, onGamingDetected, onQuotaExceeded }) {
    this.nintendoAPI = nintendoAPI;
    this.allow2 = allow2;
    this.onGamingDetected = onGamingDetected;
    this.onQuotaExceeded = onQuotaExceeded;

    // Map of pairingId -> { interval, lastPlayTime, lastPollTime }
    this.monitors = new Map();
  }

  /**
   * Start monitoring a pairing
   * @param {Object} pairing - { id, deviceId, nintendoPlayerId, allow2ChildId, activityType, intervalMs }
   */
  startMonitoring(pairing) {
    if (!pairing || !pairing.id) {
      console.error('[GamingMonitor] Invalid pairing:', pairing);
      return;
    }

    // Stop existing monitor if running
    this.stopMonitoring(pairing.id);

    console.log(`[GamingMonitor] Starting monitor for pairing ${pairing.id}`);
    console.log(`[GamingMonitor] Device: ${pairing.deviceId}, Nintendo: ${pairing.nintendoPlayerId}, Allow2: ${pairing.allow2ChildId}`);
    console.log(`[GamingMonitor] Poll interval: ${pairing.intervalMs}ms`);

    const monitorData = {
      pairing,
      lastPlayTime: 0,
      lastPollTime: Date.now(),
      interval: null
    };

    // Poll immediately, then on interval
    this.pollGamingState(pairing).catch(error => {
      console.error(`[GamingMonitor] Initial poll failed for ${pairing.id}:`, error.message);
    });

    monitorData.interval = setInterval(() => {
      this.pollGamingState(pairing).catch(error => {
        console.error(`[GamingMonitor] Poll failed for ${pairing.id}:`, error.message);
      });
    }, pairing.intervalMs || 300000); // Default 5 minutes

    this.monitors.set(pairing.id, monitorData);
  }

  /**
   * Stop monitoring a pairing
   */
  stopMonitoring(pairingId) {
    const monitor = this.monitors.get(pairingId);
    if (monitor) {
      console.log(`[GamingMonitor] Stopping monitor for pairing ${pairingId}`);
      clearInterval(monitor.interval);
      this.monitors.delete(pairingId);
    }
  }

  /**
   * Poll Nintendo API and sync with Allow2
   */
  async pollGamingState(pairing) {
    if (!this.nintendoAPI) {
      console.error('[GamingMonitor] Nintendo API not initialized');
      return;
    }

    const monitor = this.monitors.get(pairing.id);
    if (!monitor) {
      console.error(`[GamingMonitor] Monitor not found for ${pairing.id}`);
      return;
    }

    try {
      console.log(`[GamingMonitor] Polling gaming state for ${pairing.id}...`);

      // 1. Get daily summary from Nintendo API
      const summary = await this.nintendoAPI.getDailySummary(pairing.deviceId, new Date());

      // 2. Find player data by nintendoPlayerId
      const player = summary.players.find(p => p.playerId === pairing.nintendoPlayerId);

      if (!player) {
        console.log(`[GamingMonitor] Player ${pairing.nintendoPlayerId} not found in summary`);
        return;
      }

      const currentPlayTime = player.playingTime; // minutes
      const lastPlayTime = monitor.lastPlayTime;

      console.log(`[GamingMonitor] ${player.nickname}: Current=${currentPlayTime}min, Last=${lastPlayTime}min`);

      // 3. Calculate time delta since last poll
      const delta = Math.max(0, currentPlayTime - lastPlayTime);

      // 4. If delta > 0: Report usage to Allow2
      if (delta > 0) {
        console.log(`[GamingMonitor] Reporting ${delta} minutes to Allow2 for child ${pairing.allow2ChildId}`);

        try {
          await this.reportUsageToAllow2(
            pairing.allow2ChildId,
            pairing.activityType || 1, // Default: gaming
            delta
          );

          console.log(`[GamingMonitor] Successfully reported ${delta} minutes`);
        } catch (error) {
          console.error('[GamingMonitor] Failed to report to Allow2:', error.message);
          // Continue execution - don't block on Allow2 errors
        }
      }

      // Update last play time
      monitor.lastPlayTime = currentPlayTime;
      monitor.lastPollTime = Date.now();

      // 5. Check Allow2 quota remaining
      let quotaRemaining = null;
      try {
        quotaRemaining = await this.checkQuota(pairing.allow2ChildId, pairing.activityType || 1);
        console.log(`[GamingMonitor] Quota remaining: ${quotaRemaining} minutes`);
      } catch (error) {
        console.error('[GamingMonitor] Failed to check quota:', error.message);
      }

      // 6. If quota <= 0: Emit onQuotaExceeded
      if (quotaRemaining !== null && quotaRemaining <= 0) {
        console.warn(`[GamingMonitor] ⚠️ Quota exceeded for ${player.nickname}!`);

        if (this.onQuotaExceeded) {
          this.onQuotaExceeded({
            pairingId: pairing.id,
            nintendoPlayerId: pairing.nintendoPlayerId,
            allow2ChildId: pairing.allow2ChildId,
            nickname: player.nickname,
            playingTime: currentPlayTime,
            quotaRemaining
          });
        }
      }

      // 7. If player.isPlaying: Emit onGamingDetected
      if (player.isPlaying) {
        console.log(`[GamingMonitor] ${player.nickname} is currently gaming`);

        if (this.onGamingDetected) {
          this.onGamingDetected({
            pairingId: pairing.id,
            nintendoPlayerId: pairing.nintendoPlayerId,
            allow2ChildId: pairing.allow2ChildId,
            nickname: player.nickname,
            playingTime: currentPlayTime,
            quotaRemaining
          });
        }
      }

    } catch (error) {
      console.error(`[GamingMonitor] Error polling ${pairing.id}:`, error.message);
      throw error;
    }
  }

  /**
   * Report usage to Allow2 API
   */
  async reportUsageToAllow2(childId, activityType, minutes) {
    if (!this.allow2) {
      throw new Error('Allow2 API not available');
    }

    // Convert minutes to seconds for Allow2 API
    const seconds = minutes * 60;

    console.log(`[GamingMonitor] Allow2.reportUsage(child=${childId}, activity=${activityType}, time=${seconds}s)`);

    try {
      // Use Allow2 SDK to report usage
      const result = await this.allow2.reportUsage({
        childId,
        activityType,
        amount: seconds,
        meta: {
          source: 'nintendo-switch',
          timestamp: new Date().toISOString()
        }
      });

      return result;
    } catch (error) {
      console.error('[GamingMonitor] Allow2 API error:', error);
      throw error;
    }
  }

  /**
   * Check remaining quota for a child
   */
  async checkQuota(childId, activityType) {
    if (!this.allow2) {
      throw new Error('Allow2 API not available');
    }

    try {
      const child = await this.allow2.getChild(childId);

      if (!child || !child.activities) {
        console.warn(`[GamingMonitor] No activity data for child ${childId}`);
        return null;
      }

      const activity = child.activities[activityType];
      if (!activity) {
        console.warn(`[GamingMonitor] No activity type ${activityType} for child ${childId}`);
        return null;
      }

      // Return remaining time in minutes
      const remainingSeconds = activity.timeRemaining || 0;
      return Math.floor(remainingSeconds / 60);
    } catch (error) {
      console.error('[GamingMonitor] Error checking quota:', error);
      throw error;
    }
  }

  /**
   * Clean up all monitors
   */
  cleanup() {
    console.log('[GamingMonitor] Cleaning up all monitors...');

    for (const [pairingId, monitor] of this.monitors.entries()) {
      clearInterval(monitor.interval);
    }

    this.monitors.clear();
    console.log('[GamingMonitor] Cleanup complete');
  }

  /**
   * Get monitor status
   */
  getStatus() {
    const statuses = [];

    for (const [pairingId, monitor] of this.monitors.entries()) {
      statuses.push({
        pairingId,
        lastPlayTime: monitor.lastPlayTime,
        lastPollTime: monitor.lastPollTime,
        timeSinceLastPoll: Date.now() - monitor.lastPollTime,
        isActive: !!monitor.interval
      });
    }

    return statuses;
  }
}

export default GamingMonitor;
