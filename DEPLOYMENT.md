# Deployment Guide

## Prerequisites

1. **NASA API Key** (Required)
   - Get a free key at: https://api.nasa.gov/
   - Takes 30 seconds to sign up
   - No credit card required

2. **Netlify Account** (Free)
   - Sign up at: https://www.netlify.com/
   - Connect your GitHub/GitLab account

## Step-by-Step Deployment

### 1. Get Your NASA API Key

1. Visit https://api.nasa.gov/
2. Enter your name and email
3. Click "Signup"
4. Check your email for the API key
5. Save the key somewhere safe (you'll need it in step 3)

### 2. Deploy to Netlify

#### Option A: Deploy via GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Netlify Functions for secure API management"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com/
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Build settings should be auto-detected:
     - **Build command**: (leave empty)
     - **Publish directory**: `.`
     - **Functions directory**: `netlify/functions`
   - Click "Deploy site"

#### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

### 3. Configure Environment Variables

After deployment:

1. Go to your site dashboard on Netlify
2. Navigate to: **Site settings → Environment variables**
3. Click "Add a variable"
4. Add the following:
   - **Key**: `NASA_API_KEY`
   - **Value**: Your NASA API key from step 1
5. Click "Create variable"

### 4. Trigger a Redeploy

After adding environment variables:

1. Go to **Deploys** tab
2. Click "Trigger deploy" → "Deploy site"
3. Wait for deployment to complete (~1 minute)

### 5. Test Your Site

1. Visit your Netlify URL (e.g., `your-site-name.netlify.app`)
2. Check that all cards load successfully
3. Verify solar flare data is working (no 429 errors)
4. Test location changes

## Local Development

To test functions locally:

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Create .env file**
   ```bash
   cp .env.example .env
   ```

3. **Add your API key to .env**
   ```
   NASA_API_KEY=your_actual_api_key_here
   ```

4. **Run locally**
   ```bash
   netlify dev
   ```
   This will start a local server at `http://localhost:8888`

## Custom Domain (Optional)

To use your own domain:

1. In Netlify Dashboard: **Domain settings → Add custom domain**
2. Follow the instructions to update your DNS records
3. Netlify provides free HTTPS certificates automatically

## Environment Variables Reference

| Variable | Required | Description | Where to Get |
|----------|----------|-------------|--------------|
| `NASA_API_KEY` | Yes | NASA API key for solar flare data | https://api.nasa.gov/ |

## Troubleshooting

### Solar flares still showing 429 errors
- Check that `NASA_API_KEY` is set in Netlify environment variables
- Make sure you triggered a redeploy after adding the variable
- Verify your NASA API key is valid by testing it directly:
  ```
  https://api.nasa.gov/DONKI/FLR?startDate=2024-01-01&endDate=2024-01-02&api_key=YOUR_KEY
  ```

### Functions not working
- Check the Functions tab in Netlify dashboard for error logs
- Verify `netlify.toml` is in the root directory
- Ensure `netlify/functions/` directory exists with the function files

### Local development not working
- Make sure you're using `netlify dev` not `python -m http.server`
- Check that `.env` file exists in the root directory
- Verify Netlify CLI is installed: `netlify --version`

## File Structure

```
health-weather-metrics/
├── index.html              # Main application
├── netlify.toml           # Netlify configuration
├── .env.example           # Environment variable template
├── .env                   # Your local environment variables (git-ignored)
├── .gitignore            # Git ignore file
├── readme.md             # Documentation
├── DEPLOYMENT.md         # This file
└── netlify/
    └── functions/
        ├── solar-flares.js   # NASA API proxy
        ├── weather.js        # Weather data proxy
        └── geocode.js        # Geocoding proxy
```

## Security Notes

- ✅ API keys are stored securely in Netlify environment variables
- ✅ Never commit `.env` file to git (it's in `.gitignore`)
- ✅ Functions run server-side, keeping keys hidden from frontend
- ✅ CORS is properly configured for browser access
- ✅ All API calls are proxied through secure Netlify Functions

## Cost

- **Netlify Free Tier**:
  - 100GB bandwidth/month
  - 300 build minutes/month
  - 125,000 function invocations/month

This is **more than enough** for personal use. The dashboard uses approximately:
- ~10 function calls per page load
- Typical usage: 100-1,000 calls/month
- Well within free tier limits

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review Netlify function logs in the dashboard
3. Check browser console for frontend errors
4. Verify all files are committed to git and pushed

## Next Steps

After deployment:
- ✨ Customize the dashboard styling in `index.html`
- 📱 Add the site to your phone's home screen (PWA-like experience)
- 🔔 Consider adding notification features for significant events
- 📊 Track your health metrics alongside the dashboard data
