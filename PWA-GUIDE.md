# Progressive Web App (PWA) Guide

Your Health Weather Metrics site is now a Progressive Web App! Users can install it on their devices for a native app-like experience.

## How to Install on Mobile

### iOS (iPhone/iPad)

1. Open the site in Safari
2. Tap the **Share** button (square with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Edit the name if desired (default: "Health Weather")
5. Tap **"Add"**

The app will appear on your home screen with the dashboard icon!

### Android (Chrome/Edge)

1. Open the site in Chrome or Edge
2. Tap the menu (three dots) in the top-right
3. Tap **"Add to Home screen"** or **"Install app"**
4. Confirm the installation

Or look for the install prompt that appears automatically at the bottom of the screen.

### Desktop (Chrome/Edge)

1. Open the site in Chrome or Edge
2. Look for the install icon in the address bar (⊕ or computer icon)
3. Click it and select **"Install"**

Or use the menu: Settings → Install Health Weather Metrics

## Features When Installed

✅ **Standalone Mode** - Runs in its own window (no browser UI)
✅ **Home Screen Icon** - Quick access from your device
✅ **Offline Support** - Basic functionality works without internet
✅ **Native Feel** - Looks and behaves like a native app
✅ **Fast Loading** - Cached assets load instantly

## What Works Offline

When installed and cached:
- ✅ App shell and UI loads
- ✅ Moon phase calculations (client-side)
- ✅ Astrological events (client-side)
- ❌ Weather data (requires internet)
- ❌ Solar flares (requires internet)
- ❌ Location detection (requires internet)

## Technical Details

### Files Added

1. **`manifest.json`** - PWA metadata and configuration
2. **`service-worker.js`** - Offline caching and asset management
3. **Meta tags in `index.html`** - iOS and Android support

### Cached Assets

The service worker automatically caches:
- Main HTML, CSS, and JavaScript
- All favicon/icon files
- CDN dependencies (Chart.js, date-fns, astronomy-engine)

### Cache Strategy

- **App Shell**: Cache-first (instant loading)
- **API Calls**: Network-only (always fresh data)
- **CDN Resources**: Cache-first with network fallback

## Updating the App

When you deploy updates:

1. Service worker detects changes
2. Downloads new assets in background
3. Updates automatically on next app launch
4. Users may need to close and reopen the app

To force an immediate update, users can:
- Close all tabs/windows of the app
- Reopen the app

## Customization

### Change App Name

Edit `manifest.json`:
```json
{
  "name": "Your Custom Name",
  "short_name": "Short Name"
}
```

### Change Theme Color

Edit `manifest.json` and HTML meta tag:
```json
{
  "theme_color": "#your-color",
  "background_color": "#your-color"
}
```

### Add Better Icons (Recommended)

For optimal display, consider adding larger icons:

**Recommended sizes:**
- 192x192px - Standard Android icon
- 512x512px - High-res Android icon
- 180x180px - iOS icon (Apple Touch Icon)

Update `manifest.json` to include these:
```json
"icons": [
  {
    "src": "icon-192.png",
    "sizes": "192x192",
    "type": "image/png"
  },
  {
    "src": "icon-512.png",
    "sizes": "512x512",
    "type": "image/png"
  }
]
```

## Testing

### Test PWA Features

1. **Lighthouse Audit** (Chrome DevTools)
   - Open DevTools → Lighthouse tab
   - Run "Progressive Web App" audit
   - Should score 80+ for basic PWA

2. **Manifest Validator**
   - Open DevTools → Application tab
   - Check "Manifest" section
   - Verify all fields are correct

3. **Service Worker**
   - DevTools → Application → Service Workers
   - Should show "activated and running"

### Test Offline Mode

1. Open DevTools → Network tab
2. Check "Offline" checkbox
3. Reload the page
4. App shell should still load

## Deployment on Netlify

The PWA features work automatically on Netlify! Just ensure:

✅ `manifest.json` is in the root directory
✅ `service-worker.js` is in the root directory
✅ All icon files are accessible
✅ HTTPS is enabled (Netlify does this automatically)

## Browser Support

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| Install Prompt | ✅ | ✅ | ✅ | ✅ |
| Standalone Mode | ✅ | ✅ | ✅ | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |
| Web Manifest | ✅ | ⚠️ Limited | ✅ | ✅ |

**Note:** Safari has limited manifest support but works via Apple meta tags (already implemented).

## Troubleshooting

### "Add to Home Screen" not showing on iOS
- Must use Safari browser (not Chrome on iOS)
- Must be on HTTPS (Netlify provides this)
- Must have a valid manifest

### Install prompt not appearing on Android
- Service worker must be registered
- Must be on HTTPS
- User may have dismissed it before
- Try using menu option instead

### App not updating after deployment
- Users need to close and reopen the app
- Service worker updates in background
- May take 1-2 app launches to see changes

### Offline mode not working
- Check service worker is activated (DevTools)
- Verify assets are cached (Application → Cache Storage)
- API calls won't work offline (expected behavior)

## Best Practices

1. **Keep manifest.json up to date** with app changes
2. **Update CACHE_NAME** in service-worker.js when making major changes
3. **Test on real devices** for best user experience
4. **Monitor service worker** for caching issues
5. **Consider adding update notifications** when new version is available

## Future Enhancements

Potential PWA improvements:
- 📱 Push notifications for significant weather changes
- 🔔 Solar flare alerts
- 📊 Offline data viewing from last session
- 🎨 Custom themes/personalization
- 📈 Historical data tracking
- 🌙 Moon phase reminders

---

**Your app is now installable! 🎉** Share your Netlify URL with users and they can add it to their home screen.
