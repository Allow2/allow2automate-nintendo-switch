import axios from 'axios';

export class NintendoParentalAPI {
  constructor(auth) {
    this.auth = auth;
    this.baseURL = 'https://app.lp1.znma.srv.nintendo.net';
  }

  /**
   * Fetch all owned devices (Switch consoles)
   */
  async getDevices() {
    const headers = await this.auth.getHeaders();
    const response = await axios.post(
      `${this.baseURL}/v2/actions/user/fetchOwnedDevices`,
      {},
      { headers }
    );
    return response.data.items || [];
  }

  /**
   * Get device details
   */
  async getDevice(deviceId) {
    const headers = await this.auth.getHeaders();
    const response = await axios.post(
      `${this.baseURL}/v2/actions/user/fetchOwnedDevice?deviceId=${deviceId}`,
      {},
      { headers }
    );
    return response.data;
  }

  /**
   * Get daily play summaries (includes child players)
   */
  async getDailySummaries(deviceId) {
    const headers = await this.auth.getHeaders();
    const response = await axios.post(
      `${this.baseURL}/v2/actions/playSummary/fetchDailySummaries?deviceId=${deviceId}`,
      {},
      { headers }
    );
    return response.data.items || [];
  }

  /**
   * Get parental control settings
   */
  async getParentalControlSettings(deviceId) {
    const headers = await this.auth.getHeaders();
    const response = await axios.post(
      `${this.baseURL}/v2/actions/parentalControlSetting/fetchParentalControlSetting?deviceId=${deviceId}`,
      {},
      { headers }
    );
    return response.data;
  }

  /**
   * ENFORCEMENT: Update play timer (set daily limits, bedtime, restrictions)
   */
  async updatePlayTimer(deviceId, playTimerRegulations) {
    const headers = await this.auth.getHeaders();
    const response = await axios.post(
      `${this.baseURL}/v3/actions/parentalControlSetting/updatePlayTimer`,
      {
        deviceId,
        playTimerRegulations
      },
      { headers }
    );
    return response.data;
  }

  /**
   * ENFORCEMENT: Add extra playing time
   */
  async updateExtraPlayingTime(deviceId, minutes) {
    const headers = await this.auth.getHeaders();
    const response = await axios.post(
      `${this.baseURL}/v2/actions/device/updateExtraPlayingTime`,
      {
        deviceId,
        additionalMinutes: minutes
      },
      { headers }
    );
    return response.data;
  }

  /**
   * ENFORCEMENT: Update restriction level
   */
  async updateRestrictionLevel(deviceId, functionalRestrictionLevel, whitelistedApps) {
    const headers = await this.auth.getHeaders();
    const response = await axios.post(
      `${this.baseURL}/v2/actions/parentalControlSetting/updateRestrictionLevel`,
      {
        deviceId,
        functionalRestrictionLevel,
        whitelistedApplicationList: whitelistedApps || []
      },
      { headers }
    );
    return response.data;
  }
}
