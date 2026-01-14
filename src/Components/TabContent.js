import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class TabContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionToken: '',
      snackbar: null,
      accountSelectionDialog: false,
      accounts: [],
      oauthState: null,
      oauthVerifier: null
    };

    this.setupIPCListeners();
  }

  setupIPCListeners() {
    if (!this.props.ipc) return;

    this.props.ipc.on('gamingActive', (event, data) => {
      console.log('Gaming active:', data);
    });

    this.props.ipc.on('quotaExhausted', (event, data) => {
      this.showSnackbar('warning', `${data.nickname}'s gaming has been automatically disabled (quota exhausted)`);
    });
  }

  showSnackbar(severity, message) {
    this.setState({ snackbar: { severity, message } });
  }

  handleStartOAuth = async () => {
    this.showSnackbar('info', 'Opening Nintendo login window...');

    // Clear any previous account selection state
    this.setState({
      accountSelectionDialog: false,
      accounts: [],
      oauthState: null,
      oauthVerifier: null
    });

    const [err, result] = await this.props.ipc.invoke('startOAuth');

    if (err) {
      this.showSnackbar('error', `Login failed: ${err.message}`);
      return;
    }

    if (result.needsSelection && result.accounts && result.accounts.length > 1) {
      // Multiple accounts - show selection dialog
      console.log('[TabContent] Multiple accounts detected:', result.accounts.length);
      this.setState({
        accountSelectionDialog: true,
        accounts: result.accounts,
        oauthState: result.state,
        oauthVerifier: result.verifier
      });
    } else {
      // Success - single account or auto-selected
      this.showSnackbar('success', 'Authenticated! Discovering devices...');
      this.handleDiscover();
    }
  };

  handleSelectAccount = async (account) => {
    this.setState({ accountSelectionDialog: false });
    this.showSnackbar('info', `Selecting ${account.name}...`);

    const [err] = await this.props.ipc.invoke('selectAccount', {
      accountHref: account.href,
      state: this.state.oauthState,
      verifier: this.state.oauthVerifier
    });

    if (err) {
      this.showSnackbar('error', `Selection failed: ${err.message}`);
    } else {
      this.showSnackbar('success', 'Authenticated! Discovering devices...');
      this.handleDiscover();
    }
  };

  handleAuthenticate = async () => {
    const [err] = await this.props.ipc.invoke('authenticateNintendo', this.state.sessionToken);
    if (err) {
      this.showSnackbar('error', `Authentication failed: ${err.message}`);
    } else {
      this.showSnackbar('success', 'Authenticated! Now discovering devices...');
      this.handleDiscover();
    }
  };

  handleDiscover = async () => {
    const [err, result] = await this.props.ipc.invoke('discoverDevices');
    if (err) {
      this.showSnackbar('error', `Discovery failed: ${err.message}`);
    } else {
      this.showSnackbar('success', `Found ${Object.keys(result.childPlayers).length} child players`);
    }
  };

  handlePairChild = async (playerId, allow2ChildId) => {
    const [err] = await this.props.ipc.invoke('pairChild', {
      playerId,
      allow2ChildId,
      activityType: 1 // Gaming
    });

    if (err) {
      this.showSnackbar('error', `Pairing failed: ${err.message}`);
    } else {
      this.showSnackbar('success', 'Paired and monitoring started!');
    }
  };

  handleToggleMonitoring = async (playerId, enabled) => {
    const [err] = await this.props.ipc.invoke('toggleMonitoring', { playerId, enabled });
    if (err) {
      this.showSnackbar('error', `Toggle failed: ${err.message}`);
    } else {
      this.showSnackbar('success', enabled ? 'Monitoring enabled' : 'Monitoring paused');
    }
  };

  handleSyncNow = async (playerId) => {
    const [err] = await this.props.ipc.invoke('syncNow', playerId);
    if (err) {
      this.showSnackbar('error', `Sync failed: ${err.message}`);
    } else {
      this.showSnackbar('success', 'Synced successfully!');
    }
  };

  handleUnpair = async (playerId) => {
    if (!window.confirm('Unpair this child?')) return;
    const [err] = await this.props.ipc.invoke('unpairChild', playerId);
    if (err) {
      this.showSnackbar('error', `Unpair failed: ${err.message}`);
    } else {
      this.showSnackbar('success', 'Unpaired');
    }
  };

  formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }

  render() {
    if (!this.props || !this.props.data) {
      return <div style={{padding: 20}}>Loading...</div>;
    }

    const { data, children } = this.props;
    const { auth, childPlayers, pairings } = data;
    const isAuthenticated = !!auth?.sessionToken;

    return (
      <div style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          <VideogameAssetIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
          Nintendo Switch Parental Controls
        </Typography>

        {/* Auth Section - OAuth Flow */}
        {!isAuthenticated && (
          <Box mb={3}>
            <Typography variant="h6">Login to Nintendo Account</Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Click below to securely login with your Nintendo Account.
              Your credentials are never stored - only the session token.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={this.handleStartOAuth}
              startIcon={<VideogameAssetIcon />}
              style={{ marginRight: 10 }}
            >
              Login with Nintendo
            </Button>

            <Typography variant="caption" color="textSecondary" display="block" style={{ marginTop: 10 }}>
              Advanced: Have a session token already? <Button size="small" onClick={() => this.setState({ showManualAuth: !this.state.showManualAuth })}>Manual Login</Button>
            </Typography>

            {this.state.showManualAuth && (
              <Box mt={2}>
                <TextField
                  label="Nintendo Session Token"
                  value={this.state.sessionToken}
                  onChange={(e) => this.setState({ sessionToken: e.target.value })}
                  fullWidth
                  margin="normal"
                  type="password"
                  helperText="Get from npx nxapi nso token --json"
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleAuthenticate}
                  disabled={!this.state.sessionToken}
                >
                  Authenticate Manually
                </Button>
              </Box>
            )}
          </Box>
        )}

        {/* Discovery */}
        {isAuthenticated && Object.keys(childPlayers || {}).length === 0 && (
          <Box mb={3}>
            <Button variant="contained" color="primary" onClick={this.handleDiscover}>
              Discover Nintendo Children
            </Button>
          </Box>
        )}

        {/* Child Players Table (Wemo-style) */}
        {isAuthenticated && Object.keys(childPlayers || {}).length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nintendo Child</TableCell>
                <TableCell>Monitor & Enforce</TableCell>
                <TableCell>Paired Allow2 Child</TableCell>
                <TableCell>Today's Play Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(childPlayers || {}).map(([playerId, player]) => {
                const pairing = pairings[playerId];
                const allow2Child = pairing && children && children[pairing.allow2ChildId];

                return (
                  <TableRow key={playerId}>
                    {/* Nintendo Child */}
                    <TableCell>
                      <strong>{player.nickname}</strong>
                    </TableCell>

                    {/* Toggle (Wemo-style) */}
                    <TableCell>
                      {pairing ? (
                        <Switch
                          checked={pairing.enabled}
                          onChange={(e) => this.handleToggleMonitoring(playerId, e.target.checked)}
                          color="primary"
                        />
                      ) : (
                        <Typography variant="caption" color="textSecondary">
                          Not paired
                        </Typography>
                      )}
                    </TableCell>

                    {/* Allow2 Child Selector */}
                    <TableCell>
                      {pairing ? (
                        <strong>{allow2Child?.name || 'Unknown'}</strong>
                      ) : (
                        <Select
                          value=""
                          onChange={(e) => this.handlePairChild(playerId, e.target.value)}
                          displayEmpty
                        >
                          <MenuItem value="" disabled>Select child...</MenuItem>
                          {children && Object.values(children).map(child => (
                            <MenuItem key={child.id} value={child.id}>
                              {child.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </TableCell>

                    {/* Play Time */}
                    <TableCell>
                      {player.playingTime > 0 ? (
                        <span>{this.formatTime(player.playingTime)}</span>
                      ) : (
                        <Typography variant="caption" color="textSecondary">None</Typography>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      {player.isPlaying && (
                        <Chip
                          icon={<VideogameAssetIcon />}
                          label="Playing Now"
                          color="primary"
                          size="small"
                        />
                      )}
                      {!player.isPlaying && pairing?.enabled && (
                        <Chip label="Monitoring" size="small" />
                      )}
                      {!pairing && (
                        <Chip label="Not configured" size="small" />
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      {pairing && (
                        <>
                          <Button size="small" onClick={() => this.handleSyncNow(playerId)}>
                            Sync
                          </Button>
                          <Button
                            size="small"
                            color="secondary"
                            onClick={() => this.handleUnpair(playerId)}
                          >
                            Unpair
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        {/* Account Selection Dialog */}
        <Dialog
          open={this.state.accountSelectionDialog}
          onClose={() => this.setState({ accountSelectionDialog: false })}
        >
          <DialogTitle>Select Nintendo Account</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="textSecondary" paragraph>
              {this.state.accounts && this.state.accounts.length > 1
                ? 'Multiple accounts found. Select the one with parental controls:'
                : 'Select the account to link:'}
            </Typography>
            <List>
              {this.state.accounts.map((account, idx) => (
                <ListItem
                  button
                  key={idx}
                  onClick={() => this.handleSelectAccount(account)}
                >
                  <ListItemText
                    primary={account.name}
                    secondary="Click to select this account"
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ accountSelectionDialog: false })}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        {this.state.snackbar && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => this.setState({ snackbar: null })}
          >
            <Alert
              severity={this.state.snackbar.severity}
              onClose={() => this.setState({ snackbar: null })}
            >
              {this.state.snackbar.message}
            </Alert>
          </Snackbar>
        )}
      </div>
    );
  }
}

export default TabContent;
