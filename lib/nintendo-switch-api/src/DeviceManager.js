export class DeviceManager {
  constructor(api) {
    this.api = api;
    this.devices = new Map();
  }

  /**
   * Discover and cache all devices
   */
  async discover() {
    const devices = await this.api.getDevices();
    devices.forEach(device => {
      this.devices.set(device.deviceId, device);
    });
    return Array.from(this.devices.values());
  }

  /**
   * Get child players from daily summaries
   */
  async getChildPlayers(deviceId) {
    const summaries = await this.api.getDailySummaries(deviceId);
    const today = summaries[0]; // Most recent day

    if (!today || !today.players) return [];

    return today.players.map(player => ({
      playerId: player.playerId,
      nickname: player.nickname || 'Unknown',
      imageUri: player.imageUri,
      playingTime: player.playingTime || 0, // Minutes today
      isPlaying: player.isPlaying || false,
      deviceId
    }));
  }

  /**
   * ENFORCEMENT: Set daily play time limit for device
   * @param minutes -1 for unlimited, 0-360 for limit
   */
  async setDailyLimit(deviceId, minutes) {
    if (minutes < -1 || minutes > 360) {
      throw new Error('Daily limit must be between -1 (unlimited) and 360 minutes');
    }

    const settings = await this.api.getParentalControlSettings(deviceId);
    const regulations = settings.playTimerRegulations || {};

    regulations.timerMode = 'DAILY'; // or 'PER_DAY_OF_WEEK'
    regulations.limitTime = minutes;
    regulations.limitTimeEnabled = minutes >= 0;

    return await this.api.updatePlayTimer(deviceId, regulations);
  }

  /**
   * ENFORCEMENT: Disable gaming immediately (set limit to 0)
   */
  async disableGaming(deviceId) {
    return await this.setDailyLimit(deviceId, 0);
  }

  /**
   * ENFORCEMENT: Enable gaming (set to unlimited or specific limit)
   */
  async enableGaming(deviceId, minutes = -1) {
    return await this.setDailyLimit(deviceId, minutes);
  }

  /**
   * ENFORCEMENT: Add extra time (bonus minutes)
   */
  async addExtraTime(deviceId, minutes) {
    return await this.api.updateExtraPlayingTime(deviceId, minutes);
  }

  /**
   * ENFORCEMENT: Set bedtime restrictions
   */
  async setBedtime(deviceId, startTime, endTime, enabled = true) {
    const settings = await this.api.getParentalControlSettings(deviceId);
    const regulations = settings.playTimerRegulations || {};

    regulations.bedtimeAlarm = {
      enabled,
      startTime, // e.g., "21:00"
      endTime    // e.g., "07:00"
    };

    return await this.api.updatePlayTimer(deviceId, regulations);
  }
}
