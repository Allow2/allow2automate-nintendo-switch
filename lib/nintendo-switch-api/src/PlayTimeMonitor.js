import { EventEmitter } from 'events';

export class PlayTimeMonitor extends EventEmitter {
  constructor(api) {
    super();
    this.api = api;
    this.monitors = new Map(); // deviceId → interval
    this.lastPlayTimes = new Map(); // playerId → minutes
  }

  /**
   * Start monitoring a device
   */
  startMonitoring(deviceId, intervalMs = 300000) { // 5 minutes
    if (this.monitors.has(deviceId)) {
      this.stopMonitoring(deviceId);
    }

    const interval = setInterval(async () => {
      await this.poll(deviceId);
    }, intervalMs);

    this.monitors.set(deviceId, interval);

    // Immediate poll
    this.poll(deviceId);
  }

  /**
   * Stop monitoring a device
   */
  stopMonitoring(deviceId) {
    const interval = this.monitors.get(deviceId);
    if (interval) {
      clearInterval(interval);
      this.monitors.delete(deviceId);
    }
  }

  /**
   * Poll device for current play state
   */
  async poll(deviceId) {
    try {
      const summaries = await this.api.getDailySummaries(deviceId);
      const today = summaries[0];

      if (!today || !today.players) return;

      today.players.forEach(player => {
        const lastTime = this.lastPlayTimes.get(player.playerId) || 0;
        const currentTime = player.playingTime || 0;
        const delta = currentTime - lastTime;

        if (delta > 0) {
          // Gaming time increased
          this.emit('playTimeIncreased', {
            deviceId,
            playerId: player.playerId,
            nickname: player.nickname,
            delta,
            totalToday: currentTime
          });
        }

        if (player.isPlaying) {
          this.emit('gamingActive', {
            deviceId,
            playerId: player.playerId,
            nickname: player.nickname
          });
        }

        this.lastPlayTimes.set(player.playerId, currentTime);
      });
    } catch (error) {
      this.emit('error', { deviceId, error });
    }
  }

  /**
   * Cleanup all monitors
   */
  cleanup() {
    this.monitors.forEach((_, deviceId) => this.stopMonitoring(deviceId));
    this.lastPlayTimes.clear();
  }
}
