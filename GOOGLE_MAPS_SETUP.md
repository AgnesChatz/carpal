# Google Maps API Setup for carpal.gr

## 1. Get API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > API Key**
5. Copy your API key

## 2. Enable Required APIs

Go to **APIs & Services > Library** and enable:
- ✅ Maps JavaScript API
- ✅ Places API (optional, for autocomplete)
- ✅ Geocoding API (optional, for address lookup)

## 3. Restrict API Key (Recommended)

For security, restrict your key:
- **HTTP Referrers**: Add `http://localhost:3000/*` for development
- For production: Add your domain `https://yourdomain.com/*`

## 4. Update .env

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_ACTUAL_API_KEY_HERE
```

## 5. Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## Free Tier Limits

- $200/month free credit
- ~28,000 map loads/month
- More than enough for development + small production

## Troubleshooting

**InvalidKeyMapError**: Key doesn't exist or isn't activated yet (wait 5-10 min)

**RefererNotAllowedMapError**: Add your domain to HTTP referrers restrictions

**ApiNotActivatedMapError**: Enable Maps JavaScript API in Google Cloud
