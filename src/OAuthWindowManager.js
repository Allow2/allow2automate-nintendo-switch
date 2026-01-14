// Copyright [2021] [Allow2 Pty Ltd]
// Licensed under the Apache License, Version 2.0

'use strict';

export class OAuthWindowManager {
  constructor(BrowserWindow) {
    this.BrowserWindow = BrowserWindow;
    this.authWindow = null;
  }

  async startOAuthFlow(authUrl, state, verifier, nintendoAuth) {
    return new Promise((resolve, reject) => {
      this.authWindow = new this.BrowserWindow({
        width: 1250,
        height: 700,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          javascript: true,
          webSecurity: false // Allow all origins for debugging OAuth
        },
        title: 'Login to Nintendo Account',
        autoHideMenuBar: true
      });

      // Set User-Agent to match Nintendo Switch Parental Controls app
      this.authWindow.webContents.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');

      // Log any console errors from the page
      this.authWindow.webContents.on('console-message', (event, level, message) => {
        console.log('[OAuth Browser Console]', message);
      });

      let redirectUrl = null;
      let accounts = [];
      let oauthState = state;
      let oauthVerifier = verifier;

      this.authWindow.webContents.on('did-finish-load', async () => {
        const currentUrl = this.authWindow.webContents.getURL();
        console.log('[OAuth] Page loaded:', currentUrl);

        try {
          const result = await this.authWindow.webContents.executeJavaScript(`
            (function() {
              console.log('[OAuth Script] Checking for account selection buttons...');
              console.log('[OAuth Script] Current URL:', window.location.href);

              // Only look for buttons with the custom URI scheme and actual session_token_code
              // This filters out logout buttons that have session_token_code in redirect URLs
              const buttons = Array.from(document.querySelectorAll('button, a'))
                .filter(el => {
                  const href = el.href || el.getAttribute('href') || '';
                  // Must start with our redirect URI and have session_token_code in hash (not in query params)
                  return href.startsWith('npf54789befb391a838://auth#') && href.includes('session_token_code=');
                });

              console.log('[OAuth Script] Found', buttons.length, 'valid account buttons (with session_token_code)');

              if (buttons.length > 0) {
                const accountData = buttons.map((btn, idx) => {
                  const href = btn.href || btn.getAttribute('href') || '';

                  // Find account nickname - Nintendo uses c-header-v2_accountInfo_nickname class
                  let name = null;
                  const nicknameElement = document.querySelector('.c-header-v2_accountInfo_nickname, p.c-header-v2_accountInfo_nickname');
                  if (nicknameElement) {
                    name = nicknameElement.textContent.trim();
                  }

                  console.log('[OAuth Script] Button', idx, '- name:', name, 'href:', href.substring(0, 50));

                  return {
                    name: name || \`Account \${idx + 1}\`,
                    href,
                    element: idx
                  };
                });

                return {
                  found: true,
                  accounts: accountData,
                  count: buttons.length
                };
              }

              return { found: false };
            })();
          `);

          console.log('[OAuth] Account check result:', result);

          if (result && result.found) {
            accounts = result.accounts;
            console.log('[OAuth] Found', result.count, 'accounts:', accounts);

            // Auto-click if single account, otherwise show selection dialog
            if (result.count === 1) {
              console.log('[OAuth] Single account detected - auto-selecting');
              console.log('[OAuth] Navigating to:', accounts[0].href.substring(0, 80));

              // Navigate directly to the redirect URL instead of clicking
              // This is more reliable than clicking a button
              this.authWindow.loadURL(accounts[0].href);
            } else if (result.count > 1) {
              console.log('[OAuth] Multiple accounts detected:', result.count, '- showing selection dialog');
              this.authWindow.close();
              resolve({ accounts, needsSelection: true, state: oauthState, verifier: oauthVerifier });
            }
          }
        } catch (error) {
          console.error('[OAuth] Error checking for accounts:', error);
        }
      });

      this.authWindow.webContents.on('will-redirect', (event, url) => {
        console.log('[OAuth] will-redirect:', url.substring(0, 80));
        if (url.startsWith('npf54789befb391a838://auth')) {
          event.preventDefault();
          redirectUrl = url;
          this.authWindow.close();
        }
      });

      this.authWindow.webContents.on('did-navigate', (event, url) => {
        console.log('[OAuth] did-navigate:', url.substring(0, 80));
        if (url.startsWith('npf54789befb391a838://auth')) {
          redirectUrl = url;
          this.authWindow.close();
        }
      });

      // Handle custom URI scheme navigation failures
      this.authWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
        console.log('[OAuth] did-fail-load:', validatedURL.substring(0, 80), 'Error:', errorDescription);
        if (validatedURL.startsWith('npf54789befb391a838://auth')) {
          console.log('[OAuth] Custom URI detected in failed load - capturing redirect');
          redirectUrl = validatedURL;
          this.authWindow.close();
        }
      });

      this.authWindow.on('closed', async () => {
        this.authWindow = null;

        if (redirectUrl) {
          try {
            const params = this.parseRedirectUrl(redirectUrl);

            if (params.state !== state) {
              reject(new Error('Invalid state parameter'));
              return;
            }

            const sessionToken = await nintendoAuth.exchangeCodeForSessionToken(
              params.session_token_code,
              verifier
            );

            resolve({ sessionToken });
          } catch (error) {
            reject(error);
          }
        } else if (accounts.length === 0) {
          reject(new Error('OAuth flow cancelled or failed'));
        }
      });

      this.authWindow.loadURL(authUrl);
    });
  }

  async selectAccount(accountHref, state, verifier, nintendoAuth) {
    return new Promise((resolve, reject) => {
      this.authWindow = new this.BrowserWindow({
        width: 1250,
        height: 700,
        show: false,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true
        }
      });

      // Set User-Agent to match Nintendo Switch Parental Controls app
      this.authWindow.webContents.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148');

      let redirectUrl = null;

      this.authWindow.webContents.on('will-redirect', (event, url) => {
        console.log('[OAuth] will-redirect:', url.substring(0, 80));
        if (url.startsWith('npf54789befb391a838://auth')) {
          event.preventDefault();
          redirectUrl = url;
          this.authWindow.close();
        }
      });

      this.authWindow.webContents.on('did-navigate', (event, url) => {
        console.log('[OAuth] did-navigate:', url.substring(0, 80));
        if (url.startsWith('npf54789befb391a838://auth')) {
          redirectUrl = url;
          this.authWindow.close();
        }
      });

      // Handle custom URI scheme navigation failures
      this.authWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
        console.log('[OAuth] did-fail-load:', validatedURL.substring(0, 80), 'Error:', errorDescription);
        if (validatedURL.startsWith('npf54789befb391a838://auth')) {
          console.log('[OAuth] Custom URI detected in failed load - capturing redirect');
          redirectUrl = validatedURL;
          this.authWindow.close();
        }
      });

      this.authWindow.on('closed', async () => {
        this.authWindow = null;

        if (redirectUrl) {
          try {
            const params = this.parseRedirectUrl(redirectUrl);
            const sessionToken = await nintendoAuth.exchangeCodeForSessionToken(
              params.session_token_code,
              verifier
            );
            resolve({ sessionToken });
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error('Account selection failed'));
        }
      });

      this.authWindow.loadURL(accountHref);
    });
  }

  parseRedirectUrl(url) {
    const hash = url.split('#')[1];
    if (!hash) throw new Error('No hash in redirect URL');

    const params = {};
    hash.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      params[key] = decodeURIComponent(value);
    });

    return params;
  }

  close() {
    if (this.authWindow) {
      this.authWindow.close();
      this.authWindow = null;
    }
  }
}
