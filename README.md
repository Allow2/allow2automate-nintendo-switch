# Allow2 Nintendo Switch Plugin

Nintendo Switch Parental Controls integration for Allow2Automate - monitor gaming time and automatically enforce quotas.

## Features

- ✅ **OAuth Authentication** - Secure Nintendo Account login
- ✅ **Device Discovery** - Auto-detect Nintendo Switch consoles
- ✅ **Child Account Pairing** - Link Nintendo children to Allow2 children
- ✅ **Real-time Monitoring** - Track gaming sessions (5-minute polling)
- ✅ **Automatic Enforcement** - Disable gaming when quota exhausted
- ✅ **Usage Reporting** - Sync play time with Allow2 quotas
- ✅ **Wemo-style UI** - Toggle monitoring per child

## Architecture

### Modular Design

This plugin uses a **standalone Nintendo Switch API library** that can be reused in other projects:

```
allow2automate-nintendo-switch/
├── lib/nintendo-switch-api/          # Standalone reusable library
│   ├── src/
│   │   ├── NintendoAuth.js           # OAuth authentication
│   │   ├── NintendoParentalAPI.js    # Low-level API client
│   │   ├── DeviceManager.js          # High-level device control
│   │   ├── PlayTimeMonitor.js        # Real-time monitoring
│   │   ├── types.js                  # Constants and enums
│   │   └── index.js                  # Module exports
│   └── package.json                  # Library dependencies
└── src/
    ├── index.js                       # Plugin main process
    └── Components/
        └── TabContent.js              # React UI
```

## Installation

```bash
cd /mnt/ai/automate/plugins/allow2automate-nintendo-switch

# Build standalone library
cd lib/nintendo-switch-api
npm install
npm run build

# Build plugin
cd ../..
npm install
npm run build
```

## Setup

### 1. Get Nintendo Session Token

Use [nxapi-cli](https://github.com/samuelthomas2774/nxapi) to obtain a session token:

```bash
npx nxapi nso token --json
```

Copy the `session_token` value.

### 2. Authenticate in Allow2Automate

1. Open Allow2Automate
2. Go to Plugins → Nintendo Switch
3. Paste your session token
4. Click "Authenticate & Discover"

### 3. Pair Children

1. Plugin will discover your Nintendo Switch consoles
2. Child accounts will appear in the table
3. For each child, select the corresponding Allow2 child from the dropdown
4. Monitoring will start automatically

## How It Works

### Monitoring Flow

1. **Poll Nintendo API** every 5 minutes (configurable)
2. **Detect play time increase** for each paired child
3. **Report usage to Allow2** (e.g., +15 minutes gaming)
4. **Check remaining quota** from Allow2
5. **Enforce automatically** if quota exhausted

### Enforcement

When an Allow2 child's gaming quota runs out:

- Plugin calls `DeviceManager.disableGaming(deviceId)`
- Nintendo Switch daily limit is set to **0 minutes**
- Gaming is immediately disabled on the console
- UI shows "Quota Exhausted" notification

When monitoring is re-enabled with available quota:

- Plugin calls `DeviceManager.enableGaming(deviceId, quotaMinutes)`
- Nintendo Switch limit is updated to match remaining quota
- Gaming is re-enabled

### Toggle Behavior (Wemo-style)

| Toggle State | Behavior |
|-------------|----------|
| **ON** | Monitor play time, report to Allow2, enforce quota |
| **OFF** | Stop monitoring, no enforcement |

## API Endpoints Used

**Base URL:** `https://app.lp1.znma.srv.nintendo.net`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/v2/actions/user/fetchOwnedDevices` | POST | List Switch consoles |
| `/v2/actions/playSummary/fetchDailySummaries` | POST | Get play time data |
| `/v2/actions/parentalControlSetting/fetchParentalControlSetting` | POST | Get current settings |
| `/v3/actions/parentalControlSetting/updatePlayTimer` | POST | **Enforce** daily limits |
| `/v2/actions/device/updateExtraPlayingTime` | POST | **Enforce** bonus time |

## Configuration

### Poll Interval

Default: 5 minutes (300000 ms)

To change, modify `state.settings.pollInterval` in the plugin configuration.

### Activity Type

Default: Gaming (activityType = 1)

Mapped to Allow2 activity types for quota tracking.

## Troubleshooting

### Authentication Failed

- Ensure session token is valid (expires after ~2 years)
- Re-generate token using `npx nxapi nso token`
- Check Nintendo Account is linked to Switch console

### No Devices Found

- Ensure at least one Switch is paired via Nintendo Switch Parental Controls app
- Check Nintendo Account has parental controls enabled
- Verify console is online

### Enforcement Not Working

- Check toggle is **ON** for the child
- Verify pairing exists (Allow2 child selected)
- Check Allow2 quota is actually exhausted
- Look for errors in console logs

## Standalone Library Usage

The `@allow2/nintendo-switch-api` library can be used independently:

```javascript
import {
  NintendoAuth,
  NintendoParentalAPI,
  DeviceManager,
  PlayTimeMonitor
} from '@allow2/nintendo-switch-api';

// Authenticate
const auth = new NintendoAuth();
auth.setSessionToken('your_session_token');
await auth.authenticate();

// Manage devices
const api = new NintendoParentalAPI(auth);
const deviceManager = new DeviceManager(api);

// Disable gaming immediately
await deviceManager.disableGaming('device-id-123');

// Set daily limit (360 minutes max)
await deviceManager.setDailyLimit('device-id-123', 120); // 2 hours

// Monitor play time
const monitor = new PlayTimeMonitor(api);
monitor.on('playTimeIncreased', (data) => {
  console.log(`${data.nickname} played ${data.delta} more minutes`);
});
monitor.startMonitoring('device-id-123', 300000); // 5 minutes
```

## References

- [pynintendoparental](https://github.com/pantherale0/pynintendoparental) - Python implementation
- [nxapi](https://github.com/samuelthomas2774/nxapi) - Nintendo API authentication
- [Home Assistant Integration](https://github.com/pantherale0/ha-nintendoparentalcontrols)

## License

MIT License - Copyright (c) 2024 Allow2

## Support

For issues and questions:
- GitHub: https://github.com/Allow2/allow2automate-nintendo-switch
- Support: support@allow2.com
