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
        width: 500,
        height: 700,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          javascript: true
        },
        title: 'Login to Nintendo Account',
        autoHideMenuBar: true
      });

      let redirectUrl = null;
      let accounts = [];
      let oauthState = state;
      let oauthVerifier = verifier;

      this.authWindow.webContents.on('did-finish-load', async () => {
        try {
          const result = await this.authWindow.webContents.executeJavaScript(`
            (function() {
              const buttons = Array.from(document.querySelectorAll('button, a'))
                .filter(el => {
                  const text = el.textContent || '';
                  const href = el.href || el.getAttribute('href') || '';
                  return text.includes('Select') ||
                         text.includes('person') ||
                         href.includes('npf54789bef');
                });

              if (buttons.length > 0) {
                const accountData = buttons.map((btn, idx) => {
                  const parent = btn.closest('div, li, section');
                  const nameEl = parent ? parent.querySelector('[class*="name"], [class*="user"], h2, h3, strong') : null;
                  const name = nameEl ? nameEl.textContent.trim() : 'Account ' + (idx + 1);
                  const href = btn.href || btn.getAttribute('href') || '';

                  return { name, href, element: idx };
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

          if (result && result.found) {
            accounts = result.accounts;

            if (result.count === 1) {
              await this.authWindow.webContents.executeJavaScript(`
                const buttons = Array.from(document.querySelectorAll('button, a'))
                  .filter(el => {
                    const text = el.textContent || '';
                    const href = el.href || el.getAttribute('href') || '';
                    return text.includes('Select') ||
                           text.includes('person') ||
                           href.includes('npf54789bef');
                  });
                if (buttons[0]) buttons[0].click();
              `);
            } else {
              this.authWindow.close();
              resolve({ accounts, needsSelection: true, state: oauthState, verifier: oauthVerifier });
            }
          }
        } catch (error) {
          console.error('Error injecting script:', error);
        }
      });

      this.authWindow.webContents.on('will-redirect', (event, url) => {
        if (url.startsWith('npf54789befb391a838://auth')) {
          event.preventDefault();
          redirectUrl = url;
          this.authWindow.close();
        }
      });

      this.authWindow.webContents.on('did-navigate', (event, url) => {
        if (url.startsWith('npf54789befb391a838://auth')) {
          redirectUrl = url;
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
        width: 500,
        height: 700,
        show: false,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true
        }
      });

      let redirectUrl = null;

      this.authWindow.webContents.on('will-redirect', (event, url) => {
        if (url.startsWith('npf54789befb391a838://auth')) {
          event.preventDefault();
          redirectUrl = url;
          this.authWindow.close();
        }
      });

      this.authWindow.webContents.on('did-navigate', (event, url) => {
        if (url.startsWith('npf54789befb391a838://auth')) {
          redirectUrl = url;
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
