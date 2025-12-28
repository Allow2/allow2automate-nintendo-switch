import axios from 'axios';

export class NintendoAuth {
  constructor() {
    this.sessionToken = null;
    this.accessToken = null;
    this.expiresAt = null;
  }

  /**
   * Set session token (long-lived, obtained via nxapi-cli or OAuth flow)
   */
  setSessionToken(token) {
    this.sessionToken = token;
  }

  /**
   * Exchange session token for access token (15-minute expiry)
   */
  async authenticate() {
    if (!this.sessionToken) {
      throw new Error('Session token not set');
    }

    try {
      const response = await axios.post('https://accounts.nintendo.com/connect/1.0.0/api/token', {
        client_id: '54789befb391a838',
        session_token: this.sessionToken,
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer-session-token'
      });

      this.accessToken = response.data.access_token;
      this.expiresAt = Date.now() + (response.data.expires_in * 1000);
      return this.accessToken;
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }

  /**
   * Auto-refresh token if expired
   */
  async ensureValidToken() {
    if (!this.accessToken || Date.now() >= this.expiresAt) {
      await this.authenticate();
    }
    return this.accessToken;
  }

  /**
   * Get authorization headers
   */
  async getHeaders() {
    await this.ensureValidToken();
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'User-Agent': 'Allow2Automate/1.0.0',
      'X-Moon-App-Id': 'com.nintendo.znma',
      'X-Moon-Os': 'IOS',
      'X-Moon-Os-Version': '15.0.0',
      'X-Moon-Model': 'iPhone',
      'X-Moon-App-Display-Version': '1.22.0',
      'X-Moon-App-Internal-Version': '222',
      'X-Moon-TimeZone': 'America/New_York',
      'X-Moon-Os-Language': 'en-US',
      'X-Moon-App-Language': 'en-US',
      'Content-Type': 'application/json'
    };
  }
}
