# Health Weather Metrics 🌡️🌙☀️

A beautiful, real-time dashboard that tracks environmental and astronomical metrics that may impact health and well-being.

## Features

### 📊 Barometric Pressure Tracking
- Interactive 3-day pressure trend chart
- Real-time trend analysis (rising, falling, or steady)
- Location-based weather data
- Automatic pressure change calculations

### 🌙 Moon Phase & Astrology
- Current moon phase with emoji visualization
- Moon's position in the zodiac
- Illumination percentage
- Precise ecliptic longitude calculations

### ☀️ Solar Flare Activity
- Recent solar flare events (last 7 days)
- Classification by intensity (B, C, M, X class)
- Timestamp and source location for each event
- Summary of strongest recent activity

### 🌍 Smart Location Detection
- Automatic IP-based location detection
- Manual city search or coordinate entry
- Persistent location preferences
- Geocoding support for worldwide locations

## Quick Start

### Option 1: Direct Use
Simply open `index.html` in your web browser. No installation required!

### Option 2: Local Server
For better performance and testing:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Usage

1. **First Visit**: The dashboard will attempt to auto-detect your location
2. **Change Location**: Click on the location label in the header to manually enter a city name or coordinates (e.g., "45.5, -122.6")
3. **Refresh Data**: Click the "Refresh" button at the bottom to update all metrics
4. **Auto-detect Toggle**: Enable/disable automatic location detection on page load

## Technologies

- **Vanilla JavaScript (ES5)** - No frameworks, maximum compatibility
- **Chart.js** - Interactive pressure visualization
- **Astronomy Engine** - Precise astronomical calculations
- **CSS Grid & Flexbox** - Responsive layout
- **LocalStorage API** - Persistent user preferences

## Data Sources

| Service | Purpose | API Key Required |
|---------|---------|------------------|
| [Open-Meteo](https://open-meteo.com/) | Barometric pressure & geocoding | No |
| [NASA DONKI](https://api.nasa.gov/) | Solar flare data | Optional (uses DEMO_KEY) |
| [ipapi.co](https://ipapi.co/) | IP-based geolocation | No |

### Getting Your Own NASA API Key

While the app uses NASA's `DEMO_KEY`, you can get your own free API key for higher rate limits:

1. Visit [NASA API Portal](https://api.nasa.gov/)
2. Sign up for a free API key
3. Open `index.html` and replace `DEMO_KEY` on line 549:
   ```javascript
   NASA_API_KEY: 'your-api-key-here',
   ```

## Configuration

Edit the `CONFIG` object in `index.html` (around line 544) to customize:

```javascript
var CONFIG = {
  PAST_DAYS: 3,              // Days of pressure history
  SOLAR_LOOKBACK_DAYS: 7,    // Days of solar flare history
  DEFAULT_LOCATION: {         // Fallback location
    lat: 40.7128,
    lon: -74.006,
    city: 'New York',
    region: 'NY'
  }
};
```

## Browser Support

Works on all modern browsers:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

Requires JavaScript and LocalStorage enabled.

## Why These Metrics?

### Barometric Pressure
Changes in atmospheric pressure have been linked to:
- Headaches and migraines
- Joint pain and arthritis symptoms
- Mood changes and energy levels
- Sleep quality

### Moon Phases & Astrology
Many people track lunar cycles in relation to:
- Sleep patterns
- Emotional states
- Energy levels
- Personal rhythms

### Solar Activity
Solar flares and geomagnetic storms may influence:
- Sleep quality
- Mood and anxiety
- Circadian rhythms
- General sense of well-being

> **Note**: This dashboard is for informational and tracking purposes. Always consult healthcare professionals for medical advice.

## Features

- 🎨 Dark theme optimized for comfortable viewing
- 📱 Fully responsive mobile design
- ⚡ Fast loading with CDN-based dependencies
- 💾 Remembers your location preferences
- 🔄 Easy one-click refresh
- ❌ Graceful error handling with retry options
- 🎯 No installation, no build process, no complexity

## Privacy

- All data processing happens in your browser
- Location preferences stored locally (LocalStorage only)
- No user data is collected or transmitted to any server
- External API calls are made directly from your browser

## Development

For development guidelines and architectural details, see [CLAUDE.md](CLAUDE.md).

## License

This project is open source and available for personal and educational use.

## Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Solar data from [NASA DONKI](https://ccmc.gsfc.nasa.gov/tools/DONKI/)
- Astronomical calculations by [Astronomy Engine](https://github.com/cosinekitty/astronomy)
- Location detection via [ipapi.co](https://ipapi.co/)

---

**Enjoying this dashboard?** Consider getting a free NASA API key to support continued access to solar flare data.
