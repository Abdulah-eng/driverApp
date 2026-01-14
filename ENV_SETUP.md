# Environment Variables Setup Guide

## Complete `.env` File Configuration

Create a `.env` file in the root directory of your project (same level as `package.json`) with all the following variables:

### Complete Example `.env` file:

```env
# ============================================
# SUPABASE CONFIGURATION (REQUIRED)
# ============================================
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here

# ============================================
# GOOGLE MAPS API KEY (REQUIRED for Android Production)
# ============================================
GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ============================================
# SMS PROVIDER (Optional - for direct Twilio usage)
# ============================================
# Note: For Supabase Phone Auth, configure in Supabase Dashboard instead
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

---

## 1. Supabase Configuration (REQUIRED)

### How to get your Supabase credentials:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select an existing one
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** → Use as `SUPABASE_URL`
   - **anon/public key** → Use as `SUPABASE_ANON_KEY`

### Example:
```env
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 2. Google Maps API Key (REQUIRED for Android Production)

### Step-by-Step Setup:

#### A. Get Google Maps API Key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps SDK for Android** (required)
   - **Maps SDK for iOS** (optional, for iOS)
   - **Geocoding API** (optional, for address to coordinates)
   - **Directions API** (optional, for route planning)
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

#### B. Add to `.env` file:

```env
GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### C. Add to AndroidManifest.xml:

**IMPORTANT**: The Google Maps API key also needs to be added directly to `android/app/src/main/AndroidManifest.xml` because Android doesn't read from `.env` files directly.

1. Open `android/app/src/main/AndroidManifest.xml`
2. Add the API key inside the `<application>` tag:

```xml
<application
  android:name=".MainApplication"
  android:label="@string/app_name"
  ...>
  
  <!-- Add this meta-data tag -->
  <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_GOOGLE_MAPS_API_KEY_HERE"/>
  
  <activity ...>
    ...
  </activity>
</application>
```

**Note**: Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your actual API key from the `.env` file.

#### D. Restrict API Key (Recommended for Production):

1. In Google Cloud Console, go to **Credentials**
2. Click on your API key
3. Under **API restrictions**, select **Restrict key**
4. Choose:
   - **Maps SDK for Android** (for Android)
   - **Maps SDK for iOS** (for iOS)
5. Under **Application restrictions**, add your app's package name: `com.driverapp`
6. Save

---

## 3. SMS Provider Configuration (For Phone Authentication)

### Option A: Configure in Supabase Dashboard (Recommended)

Supabase handles SMS through their dashboard. You don't need to add credentials to `.env`:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Authentication** → **Providers** → **Phone**
4. Enable **Phone** provider
5. Configure your SMS provider:
   - **Twilio** (recommended)
   - **MessageBird**
   - **Vonage** (formerly Nexmo)
   - **Custom SMS provider**

#### For Twilio (Most Common):

1. Sign up at [Twilio](https://www.twilio.com/)
2. Get your credentials from Twilio Console:
   - Account SID
   - Auth Token
   - Phone Number
3. In Supabase Dashboard → Phone provider settings:
   - Enter Twilio Account SID
   - Enter Twilio Auth Token
   - Enter Twilio Phone Number
4. Save

**Note**: You can store Twilio credentials in `.env` if you need them for other purposes, but for Supabase Phone Auth, configure them in the Supabase Dashboard.

### Option B: Store in `.env` (If needed for other services)

If you need Twilio credentials for other parts of your app:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

---

## Complete `.env` File Template

Copy this template and fill in your actual values:

```env
# ============================================
# SUPABASE CONFIGURATION (REQUIRED)
# ============================================
# Get from: https://app.supabase.com/project/_/settings/api
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# ============================================
# GOOGLE MAPS API KEY (REQUIRED for Android)
# ============================================
# Get from: https://console.cloud.google.com/google/maps-apis
# Also add to android/app/src/main/AndroidManifest.xml
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# ============================================
# SMS PROVIDER (Optional - for direct usage)
# ============================================
# For Supabase Phone Auth, configure in Supabase Dashboard instead
# Only add these if you need Twilio for other services
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

---

## Setup Checklist

### ✅ Required Steps:

- [ ] Create `.env` file in project root
- [ ] Add `SUPABASE_URL` from Supabase Dashboard
- [ ] Add `SUPABASE_ANON_KEY` from Supabase Dashboard
- [ ] Get Google Maps API key from Google Cloud Console
- [ ] Add `GOOGLE_MAPS_API_KEY` to `.env` file
- [ ] Add Google Maps API key to `android/app/src/main/AndroidManifest.xml`
- [ ] Configure SMS provider in Supabase Dashboard (for phone auth)

### ✅ After Setup:

1. **Save the `.env` file**
2. **Restart Metro bundler**: `npm start -- --reset-cache`
3. **Rebuild the app**: 
   - Android: `npm run android`
   - iOS: `cd ios && pod install && cd .. && npm run ios`

---

## Important Notes

- ✅ **Never commit your `.env` file to version control** (already in `.gitignore`)
- ✅ **Keep your API keys secure**
- ✅ **Restrict Google Maps API key** to your app's package name in production
- ✅ **For iOS**: Maps work with Apple Maps by default (no API key needed)
- ✅ **For Android**: Google Maps API key is required for production
- ✅ **SMS Provider**: Configure in Supabase Dashboard, not in `.env` (unless needed elsewhere)

---

## Troubleshooting

### Maps not showing on Android:

1. ✅ Check `AndroidManifest.xml` has the API key in `<meta-data>` tag
2. ✅ Verify API key is correct (no extra spaces)
3. ✅ Check Google Cloud Console - API is enabled
4. ✅ Check API key restrictions allow your app
5. ✅ Rebuild app: `cd android && ./gradlew clean && cd .. && npm run android`

### Phone authentication not working:

1. ✅ Check Supabase Dashboard → Authentication → Providers → Phone is enabled
2. ✅ Verify SMS provider credentials in Supabase Dashboard
3. ✅ Check Twilio account has credits/balance
4. ✅ Verify phone number format (include country code: +1234567890)

### Environment variables not loading:

1. ✅ Check `.env` file is in root directory (same level as `package.json`)
2. ✅ Restart Metro bundler: `npm start -- --reset-cache`
3. ✅ Rebuild app completely
4. ✅ Check variable names match exactly (case-sensitive)
5. ✅ For iOS: Run `cd ios && pod install && cd ..`

---

## Quick Reference

| Variable | Required | Where to Get | Where to Add |
|----------|----------|--------------|--------------|
| `SUPABASE_URL` | ✅ Yes | Supabase Dashboard → Settings → API | `.env` file |
| `SUPABASE_ANON_KEY` | ✅ Yes | Supabase Dashboard → Settings → API | `.env` file |
| `GOOGLE_MAPS_API_KEY` | ✅ Yes (Android) | Google Cloud Console | `.env` + `AndroidManifest.xml` |
| `TWILIO_*` | ⚠️ Optional | Twilio Console | `.env` (or Supabase Dashboard) |

---

## Need Help?

- **Supabase**: https://supabase.com/docs
- **Google Maps**: https://developers.google.com/maps/documentation
- **Twilio**: https://www.twilio.com/docs
- **React Native Config**: https://github.com/lugg/react-native-config
