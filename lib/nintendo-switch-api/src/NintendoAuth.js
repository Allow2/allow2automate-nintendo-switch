import axios from 'axios';
import crypto from 'crypto';

export class NintendoAuth {
  constructor() {
    this.sessionToken = null;
    this.accessToken = null;
    this.expiresAt = null;
  }

  /**
   * Generate Nintendo OAuth authorization URL
   * Returns { authUrl, state, verifier }
   */
  generateAuthUrl() {
    // Generate PKCE parameters
    const state = this.base64UrlEncode(crypto.randomBytes(36));
    const verifier = this.base64UrlEncode(crypto.randomBytes(32));
    const challenge = this.base64UrlEncode(crypto.createHash('sha256').update(verifier).digest());

    const params = new URLSearchParams({
      state,
      redirect_uri: 'npf54789befb391a838://auth',
      client_id: '54789befb391a838',
      scope: 'openid user moonUser:administration moonDevice:create moonOwnedDevice:administration moonParentalControlSetting moonParentalControlSetting:update moonParentalControlSettingState moonPairingState moonSmartDevice:administration moonDailySummary moonMonthlySummary',
      response_type: 'session_token_code',
      session_token_code_challenge: challenge,
      session_token_code_challenge_method: 'S256',
      theme: 'login_form'
    });

    return {
      authUrl: `https://accounts.nintendo.com/connect/1.0.0/authorize?${params}`,
      state,
      verifier
    };
  }

  /**
   * Exchange session_token_code for session_token
   */
  async exchangeCodeForSessionToken(sessionTokenCode, verifier) {
    const params = new URLSearchParams({
      client_id: '54789befb391a838',
      session_token_code: sessionTokenCode,
      session_token_code_verifier: verifier
    });

    const response = await axios.post(
      'https://accounts.nintendo.com/connect/1.0.0/api/session_token',
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Allow2Automate/1.0.0'
        }
      }
    );

    this.sessionToken = response.data.session_token;
    return this.sessionToken;
  }

  base64UrlEncode(buffer) {
    return buffer
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
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
      const params = new URLSearchParams({
        client_id: '54789befb391a838',
        session_token: this.sessionToken,
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer-session-token'
      });

      const response = await axios.post(
        'https://accounts.nintendo.com/connect/1.0.0/api/token',
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Allow2Automate/1.0.0'
          }
        }
      );

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
