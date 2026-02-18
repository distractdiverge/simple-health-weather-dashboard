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

### Deployment on Netlify (Recommended)

This app uses Netlify Functions to securely manage API keys. To deploy:

1. **Get a NASA API Key**
   - Visit [NASA API Portal](https://api.nasa.gov/)
   - Sign up for a free API key

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Go to Site settings → Environment variables
   - Add: `NASA_API_KEY` = your NASA API key
   - Deploy!

3. **Local Development**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Create .env file (copy from .env.example)
   cp .env.example .env
   # Edit .env and add your NASA_API_KEY

   # Run locally with Netlify Dev
   netlify dev
   ```

### Option 2: Static File Server (Limited)
For testing without API functionality:

```bash
# Python 3
python -m http.server 8000
```

**Note**: Without Netlify Functions, the solar flare data will not work due to API key requirements.

## Usage

1. **First Visit**: The dashboard will attempt to auto-detect your location
2. **Change Location**: Click on the location label in the header to manually enter a city name or coordinates (e.g., "45.5, -122.6")
3. **Refresh Data**: Click the "Refresh" button at the bottom to update all metrics
4. **Auto-detect Toggle**: Enable/disable automatic location detection on page load

## Technologies

- **Vanilla JavaScript (ES5)** - No frameworks, maximum compatibility
- **Netlify Functions** - Serverless API proxies for secure key management
- **Chart.js** - Interactive pressure visualization
- **Astronomy Engine** - Precise astronomical calculations
- **CSS Grid & Flexbox** - Responsive layout
- **LocalStorage API** - Persistent user preferences

## Data Sources

| Service | Purpose | API Key Required |
|---------|---------|------------------|
| [Open-Meteo](https://open-meteo.com/) | Barometric pressure, temperature & geocoding | No |
| [NASA DONKI](https://api.nasa.gov/) | Solar flare data | **Yes - Required** |
| [ipapi.co](https://ipapi.co/) | IP-based geolocation | No |

### API Key Setup

**NASA API Key is required** for solar flare data. The `DEMO_KEY` has very low rate limits (429 errors).

#### For Netlify Deployment:
1. Get your free API key at [NASA API Portal](https://api.nasa.gov/)
2. In Netlify Dashboard: **Site settings → Environment variables**
3. Add variable: `NASA_API_KEY` = `your-key-here`
4. Redeploy your site

#### For Local Development:
1. Copy `.env.example` to `.env`
2. Add your NASA API key to `.env`
3. Run with `netlify dev` (requires Netlify CLI)

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
- No user data is collected or stored on servers
- API calls are proxied through Netlify Functions for secure key management
- No tracking, analytics, or data retention

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

## Troubleshooting

**Solar flares showing errors or "429" status?**
- You need to set up your NASA API key in Netlify environment variables
- See "API Key Setup" section above

**Functions not working locally?**
- Make sure you're using `netlify dev` instead of a regular HTTP server
- Check that `.env` file exists with your NASA_API_KEY

**Still having issues?**
- Check the browser console for detailed error messages
- Verify your NASA API key is valid at [NASA API Portal](https://api.nasa.gov/)
