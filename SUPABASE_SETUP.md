# Supabase Setup Guide

This guide will help you set up Supabase for the Driver App.

## Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Driver App (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to be ready (2-3 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (e.g., `https://abcdefghijklmnop.supabase.co`)
   - **anon/public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the root directory of your project (same level as `package.json`)
2. Add your Supabase credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Never commit the `.env` file to version control. It's already in `.gitignore`.

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click "Run" to execute the SQL
5. You should see "Success. No rows returned" - this means the tables were created successfully

## Step 5: Configure Authentication

### Enable Phone Authentication

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Find **Phone** provider
3. Enable it (if not already enabled)
4. Configure SMS settings:
   - For development: Use Supabase's built-in test mode
   - For production: Set up Twilio or another SMS provider

### Configure Auth Settings

1. Go to **Authentication** → **URL Configuration**
2. Add your app's redirect URLs:
   - For development: `movodriverapp://`
   - For production: Add your production URLs

## Step 6: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

For iOS, also run:
```bash
cd ios && pod install && cd ..
```

## Step 7: Configure React Native Config

The app uses `react-native-config` to load environment variables. After installing dependencies:

1. **For iOS**: 
   - The pods should install automatically
   - If not, run `cd ios && pod install && cd ..`

2. **For Android**: 
   - Rebuild the app after adding environment variables
   - Run `npm run android`

## Step 8: Test the Connection

1. Start Metro bundler: `npm start`
2. Run the app: `npm run android` or `npm run ios`
3. Try signing up with a phone number
4. Check your Supabase dashboard → **Authentication** → **Users** to see if the user was created

## Database Tables Overview

The schema creates the following tables:

1. **users** - User profiles (extends auth.users)
2. **trips** - Trip records
3. **earnings** - Earnings/transactions
4. **ratings** - Trip ratings
5. **notifications** - User notifications

## Row Level Security (RLS)

All tables have Row Level Security enabled, meaning:
- Users can only see/modify their own data
- All policies are configured in the schema
- No additional configuration needed

## Troubleshooting

### Environment variables not loading

1. Make sure `.env` file is in the root directory
2. Restart Metro bundler: `npm start -- --reset-cache`
3. Rebuild the app completely
4. Check that variable names match exactly (case-sensitive)

### Authentication not working

1. Check that Phone provider is enabled in Supabase
2. Verify your phone number format (include country code)
3. Check Supabase logs: **Logs** → **Auth Logs**
4. For OTP: Make sure SMS provider is configured

### Database errors

1. Check that schema.sql was executed successfully
2. Verify RLS policies are active: **Authentication** → **Policies**
3. Check Supabase logs: **Logs** → **Postgres Logs**

### Build errors

1. Clear cache: `npm start -- --reset-cache`
2. Clean build folders:
   - iOS: `cd ios && rm -rf build && cd ..`
   - Android: `cd android && ./gradlew clean && cd ..`
3. Reinstall dependencies: `rm -rf node_modules && npm install`

## Next Steps

After setup is complete:

1. Test authentication flow (signup, login, OTP)
2. Test data operations (trips, earnings, ratings)
3. Set up production SMS provider (Twilio recommended)
4. Configure production environment variables
5. Set up database backups

## Support

For issues:
- Check [Supabase Documentation](https://supabase.com/docs)
- Check [React Native Config Documentation](https://github.com/lugg/react-native-config)
- Review app logs in Supabase dashboard
