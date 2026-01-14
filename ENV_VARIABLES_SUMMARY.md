# Environment Variables - What to Add to `.env`

## 📝 Complete `.env` File Template

Create a `.env` file in your project root with these variables:

```env
# ============================================
# SUPABASE (REQUIRED)
# ============================================
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# ============================================
# GOOGLE MAPS (REQUIRED for Android)
# ============================================
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# ============================================
# TWILIO/SMS (OPTIONAL - only if needed)
# ============================================
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

---

## 🔑 Where to Get Each Key

### 1. **SUPABASE_URL** and **SUPABASE_ANON_KEY**

**Location**: https://app.supabase.com/project/_/settings/api

1. Go to Supabase Dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public key** → `SUPABASE_ANON_KEY`

---

### 2. **GOOGLE_MAPS_API_KEY**

**Location**: https://console.cloud.google.com/google/maps-apis

1. Go to Google Cloud Console
2. Create/select a project
3. Enable **"Maps SDK for Android"**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy the API key → `GOOGLE_MAPS_API_KEY`

**⚠️ IMPORTANT**: Also add this key to `android/app/src/main/AndroidManifest.xml`:

```xml
<application>
  <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_GOOGLE_MAPS_API_KEY_HERE"/>
</application>
```

---

### 3. **TWILIO_* (Optional)**

**For Supabase Phone Auth**: 
- Configure in Supabase Dashboard (not in `.env`)
- Go to: Supabase Dashboard → Authentication → Providers → Phone
- Enter Twilio credentials there

**For direct Twilio usage**:
- Get from: https://console.twilio.com/
- Add to `.env` if you need Twilio for other services

---

## ✅ Quick Checklist

- [ ] Create `.env` file in project root
- [ ] Add `SUPABASE_URL` (from Supabase Dashboard)
- [ ] Add `SUPABASE_ANON_KEY` (from Supabase Dashboard)
- [ ] Get Google Maps API key (from Google Cloud Console)
- [ ] Add `GOOGLE_MAPS_API_KEY` to `.env`
- [ ] Add Google Maps API key to `android/app/src/main/AndroidManifest.xml`
- [ ] Configure SMS provider in Supabase Dashboard (for phone auth)

---

## 🚀 After Adding Keys

1. **Save `.env` file**
2. **Restart Metro**: `npm start -- --reset-cache`
3. **Rebuild app**: `npm run android` or `npm run ios`

---

## 📚 More Details

- **Full guide**: See `ENV_SETUP.md`
- **Quick reference**: See `QUICK_ENV_SETUP.md`
- **Example file**: See `env.example.txt`

---

## ⚠️ Important Notes

- ✅ Never commit `.env` to git (already in `.gitignore`)
- ✅ Google Maps key must be in BOTH `.env` AND `AndroidManifest.xml`
- ✅ SMS provider configured in Supabase Dashboard (not `.env` for phone auth)
- ✅ Restart Metro after changing `.env`
