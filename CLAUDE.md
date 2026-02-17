# Health Weather Metrics - Development Guide

## Project Overview

Health Weather Metrics is a single-page web application that displays environmental and astronomical metrics that may impact human health and well-being. The dashboard tracks:

1. **Barometric Pressure** - 3-day trend with interactive chart
2. **Moon Phase & Astrological Sign** - Current moon position in the zodiac
3. **Solar Flare Activity** - Recent solar events from NASA data

## Architecture

- **Technology Stack**: Vanilla JavaScript (ES5), HTML5, CSS3
- **Structure**: Single `index.html` file with embedded styles and scripts
- **Build System**: None - this is a static site that runs directly in the browser
- **Deployment**: Can be served by any static file server or opened directly

## Dependencies (CDN)

All dependencies are loaded via CDN:
- **Chart.js** - Interactive pressure chart visualization
- **date-fns** - Date formatting and manipulation
- **chartjs-adapter-date-fns** - Time scale adapter for Chart.js
- **astronomy-engine** - Moon phase and zodiac calculations

## External APIs

1. **Open-Meteo** (`https://api.open-meteo.com`)
   - Weather API for barometric pressure data
   - Geocoding API for location search
   - No API key required

2. **NASA DONKI** (`https://api.nasa.gov/DONKI/FLR`)
   - Solar flare data from last 7 days
   - Uses `DEMO_KEY` (consider getting a real key for production)

3. **IP Geolocation** (`https://ipapi.co/json/`)
   - Auto-detect user location
   - Fallback to browser geolocation API

## Key Features

- **Location Management**
  - Auto-detect location via IP or browser geolocation
  - Manual city search or lat/lon coordinates
  - Persistent preferences in localStorage
  - Inline editor with toggle for auto-detect

- **Responsive Design**
  - Dark theme with CSS variables
  - Mobile-friendly grid layout
  - Cards with loading states and error handling

- **Data Visualization**
  - Interactive pressure chart with gradient fill
  - Trend calculation (rising/falling/steady)
  - Color-coded solar flare classifications (B/C/M/X)

## Development Guidelines

### Making Changes

1. **Styling**
   - CSS variables defined in `:root` (lines 11-28)
   - Follow existing naming conventions (`--bg-*`, `--accent-*`, `--text-*`)
   - Mobile breakpoints: 768px and 480px

2. **JavaScript**
   - ES5 syntax for maximum compatibility
   - IIFE pattern to avoid global scope pollution
   - Configuration in `CONFIG` object (lines 544-554)
   - State management via closure and localStorage

3. **Adding New Cards/Metrics**
   - Follow existing card structure (`.card`, `.card-top`, `.card-header`, `.card-body`, `.card-footer`)
   - Implement loading state handling
   - Add error handling with retry button
   - Update dashboard grid if needed

4. **API Integration**
   - Use `fetchJSON()` helper with timeout
   - Implement proper error handling
   - Consider rate limits and caching strategies
   - Test with both success and failure scenarios

### Testing

Since this is a static site with no build process:

1. **Local Testing**
   - Open `index.html` directly in browser, or
   - Use a local server: `python -m http.server 8000`
   - Test with browser dev tools console open

2. **Key Test Scenarios**
   - Location auto-detection and manual entry
   - Invalid location handling
   - API failures and retry functionality
   - localStorage persistence across sessions
   - Responsive behavior at different screen sizes
   - Different time zones for time-based data

3. **Browser Compatibility**
   - Target: Modern browsers (last 2 versions)
   - ES5 syntax ensures broad compatibility
   - Test localStorage availability (graceful degradation)

### Code Organization

The single-file structure is organized in sections:
- **Lines 1-448**: HTML structure and CSS styles
- **Lines 450-530**: HTML content and dashboard structure
- **Lines 537-1178**: JavaScript application logic
  - Configuration (544-554)
  - Utilities (590-636)
  - Location handling (638-743)
  - Barometric pressure (745-849)
  - Moon calculations (851-912)
  - Solar flares (914-989)
  - Event handlers and initialization (991-1177)

### Best Practices

- **Maintain ES5 compatibility** - No arrow functions, `let`/`const`, template literals
- **Preserve existing patterns** - IIFE, explicit `var` declarations, function expressions
- **Error handling** - Always catch promise rejections and show user-friendly messages
- **Loading states** - Use existing skeleton loader pattern for async operations
- **Accessibility** - Maintain semantic HTML and ARIA attributes where needed
- **Performance** - API calls are made on page load and manual refresh only

### Common Tasks

**Change API keys:**
- Edit `CONFIG.NASA_API_KEY` (line 549)

**Adjust data lookback periods:**
- `CONFIG.PAST_DAYS` - Pressure history (line 550)
- `CONFIG.SOLAR_LOOKBACK_DAYS` - Solar flares (line 551)

**Modify default location:**
- Edit `CONFIG.DEFAULT_LOCATION` (line 552)

**Update color scheme:**
- Modify CSS variables in `:root` (lines 11-28)

**Add new zodiac data:**
- Extend `ZODIAC` array (lines 556-569)

## Deployment

1. **Simple deployment**: Upload `index.html` to any static host
2. **No build step required**
3. **No server-side logic needed**
4. **Works offline** after initial page load (astronomy calculations are client-side)

## Future Enhancements

Potential improvements to consider:
- Service worker for offline functionality
- Data export/history tracking
- More health-related metrics (air quality, UV index, pollen)
- User preferences for units (hPa/inHg, etc.)
- Progressive Web App (PWA) capabilities
- Notification system for significant changes
- Historical data comparison
