# NDK Installation Instructions

## Option 1: Install via Android Studio (Recommended)

1. Open Android Studio
2. Go to **Tools** → **SDK Manager** (or click the SDK Manager icon in the toolbar)
3. Click on the **SDK Tools** tab
4. Check **NDK (Side by side)** and make sure version **23.1.7779620** is selected
5. Click **Apply** and let it download and install
6. Once installed, try building the APK again

## Option 2: Let Gradle Download It

After removing the corrupted NDK, Gradle will try to download it again when you build.
This may work if your network connection is stable.

## Option 3: Use a Different NDK Version

If NDK 23.1.7779620 continues to have issues, we can try using a different version.
Common stable versions: 21.4.7075529, 22.1.7171670, or 24.0.8215888
