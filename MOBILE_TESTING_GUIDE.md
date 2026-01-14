# Mobile Device Testing Guide

This guide will help you connect your mobile device to your laptop and test the React Native app.

## For Android Devices

### Step 1: Enable Developer Options on Your Android Device

1. Open **Settings** on your Android device
2. Scroll down and tap **About phone** (or **About device**)
3. Find **Build number** and tap it **7 times** until you see "You are now a developer!"
4. Go back to Settings and you'll now see **Developer options**

### Step 2: Enable USB Debugging

1. Open **Settings** → **Developer options**
2. Toggle **Developer options** ON (if not already on)
3. Enable **USB debugging**
4. (Optional but recommended) Enable **Stay awake** (keeps screen on while charging)

### Step 3: Connect Your Device to Laptop

1. Connect your Android device to your laptop using a USB cable
2. **IMPORTANT:** On your phone, you'll see a notification or popup with USB connection options:
   - Select **"Transfer files"** or **"File Transfer"** (MTP mode)
   - **DO NOT** select "Charge only" or "Transfer photos" - these won't allow USB debugging
3. After selecting "Transfer files", you should see a popup asking **"Allow USB debugging?"** - tap **Allow** or **OK**
4. Check the box **"Always allow from this computer"** if you want to avoid this prompt in the future

**Note:** If you don't see the USB debugging prompt:
- Make sure you selected "Transfer files" mode
- Verify USB debugging is enabled in Developer Options (Step 2)
- Try disconnecting and reconnecting the USB cable
- Some devices require you to manually trigger the prompt by running `adb devices` on your computer

### Step 4: Verify Device Connection

Open PowerShell in your project directory and run:

```powershell
adb devices
```

You should see your device listed with status "device". Example output:
```
List of devices attached
ABC123XYZ    device
```

If you see "unauthorized", check your phone for the USB debugging permission popup.

### Step 5: Run the App on Your Device

You have two options:

**Option A: Use the existing PowerShell script**
```powershell
.\run-android.ps1
```

**Option B: Use npm directly**
```powershell
npm run android
```

The app will build and install on your connected device automatically.

---

## For iOS Devices (Mac Required)

If you have a Mac and want to test on iOS:

### Step 1: Connect iPhone/iPad

1. Connect your iOS device to your Mac using a USB cable
2. Unlock your device and trust the computer if prompted

### Step 2: Configure in Xcode

1. Open Xcode
2. Go to **Window** → **Devices and Simulators**
3. Select your device and ensure it's recognized
4. You may need to sign in with your Apple ID and trust the device

### Step 3: Update Bundle Identifier

Make sure your bundle identifier in `ios/TempDriverApp/Info.plist` matches your Apple Developer account.

### Step 4: Run the App

```bash
npm run ios --device
```

Or specify the device:
```bash
npm run ios --device="Your Device Name"
```

---

## Troubleshooting

### Android Issues

**Device not detected:**
- **First, select "Transfer files" mode** when connecting USB (not "Charge only" or "Transfer photos")
- Make sure USB debugging is enabled in Developer Options
- Try a different USB cable (some cables are charge-only)
- Try a different USB port
- Restart ADB: `adb kill-server` then `adb start-server`
- Install/update USB drivers for your device manufacturer

**USB debugging prompt not appearing:**
- Make sure you selected "Transfer files" (MTP) mode, not "Charge only"
- Verify Developer Options is ON and USB debugging is enabled
- Try running `adb devices` in PowerShell - this sometimes triggers the prompt
- Disconnect and reconnect the USB cable
- On some devices, go to Settings → Developer options → Revoke USB debugging authorizations, then reconnect

**"adb: command not found":**
- Make sure Android SDK platform-tools are in your PATH
- Check your `ANDROID_HOME` environment variable is set correctly

**App installs but crashes:**
- Check Metro bundler is running: `npm start` (in a separate terminal)
- Check device logs: `adb logcat` to see error messages
- Make sure your device meets minimum Android version requirements

**Build errors:**
- Clean build: `cd android && ./gradlew clean && cd ..`
- Clear Metro cache: `npm start -- --reset-cache`

### iOS Issues

**Device not showing in Xcode:**
- Make sure device is unlocked
- Trust the computer on your device
- Check cable connection

**Code signing errors:**
- You need a valid Apple Developer account
- Update bundle identifier to match your account
- Select your development team in Xcode project settings

---

## Testing Over Wi-Fi (Android - Advanced)

Once connected via USB, you can switch to Wi-Fi for wireless testing:

1. Connect device via USB first
2. Find your device's IP address (Settings → About phone → Status → IP address)
3. Run: `adb tcpip 5555`
4. Disconnect USB cable
5. Run: `adb connect <device-ip-address>:5555`
6. Verify: `adb devices` should show your device via IP

To switch back to USB: `adb usb`

---

## Quick Reference Commands

```powershell
# Check connected devices
adb devices

# View device logs
adb logcat

# Restart ADB server
adb kill-server
adb start-server

# Install APK directly (if you have one)
adb install path/to/app.apk

# Uninstall app
adb uninstall com.driverapp

# Clear app data
adb shell pm clear com.driverapp
```

---

## Next Steps

Once your device is connected and the app is running:
- The app will automatically reload when you save changes (if Metro bundler is running)
- You can use React Native Debugger or Chrome DevTools for debugging
- Shake your device to open the developer menu
- Enable "Hot Reloading" in the developer menu for faster development
