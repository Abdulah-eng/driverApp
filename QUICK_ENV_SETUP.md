# Quick Environment Variables Setup

## 🚀 Quick Setup Guide

### Step 1: Create `.env` File

Create a file named `.env` in the root directory (same level as `package.json`) with this content:

```env
# Supabase (REQUIRED)
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Google Maps (REQUIRED for Android)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Twilio (Optional - only if using directly)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

---

## 📋 Where to Get Each Key

### 1. Supabase Keys

**Get from**: https://app.supabase.com/project/_/settings/api

- `SUPABASE_URL`: Copy "Project URL"
- `SUPABASE_ANON_KEY`: Copy "anon public" key

### 2. Google Maps API Key

**Get from**: https://console.cloud.google.com/google/maps-apis

1. Create/select project
2. Enable "Maps SDK for Android"
3. Create API Key
4. Copy the key

**IMPORTANT**: Also add this key to `android/app/src/main/AndroidManifest.xml`:

```xml
<application>
  <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_GOOGLE_MAPS_API_KEY_HERE"/>
</application>
```

### 3. SMS Provider (Twilio)

**For Supabase Phone Auth**: Configure in Supabase Dashboard (not in `.env`)
- Go to: Supabase Dashboard → Authentication → Providers → Phone
- Enter Twilio credentials there

**For direct Twilio usage**: Add to `.env`:
- Get from: https://console.twilio.com/
- Account SID, Auth Token, Phone Number

---

## ✅ After Adding Keys

1. **Save `.env` file**
2. **Restart Metro**: `npm start -- --reset-cache`
3. **Rebuild app**: `npm run android` or `npm run ios`

---

## 📝 Example `.env` File

```env
# Supabase
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Google Maps
GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Twilio (Optional)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

---

## ⚠️ Important Notes

- ✅ Never commit `.env` to git (already in `.gitignore`)
- ✅ Google Maps key must be in both `.env` AND `AndroidManifest.xml`
- ✅ SMS provider configured in Supabase Dashboard (not `.env`)
- ✅ Restart Metro after changing `.env`

---

For detailed instructions, see `ENV_SETUP.md`
