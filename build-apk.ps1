# Build Release APK Script
# This script builds a release APK that you can install on your device

Write-Host "Setting up environment..." -ForegroundColor Cyan

# Setup environment variables
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
$env:ANDROID_HOME = "C:\Users\abdur\AppData\Local\Android\Sdk"
$env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\tools;$env:ANDROID_HOME\tools\bin;$env:PATH"

Write-Host "Building Release APK..." -ForegroundColor Green
Write-Host "This may take 5-10 minutes on first build..." -ForegroundColor Yellow
Write-Host ""

cd android

# Build the release APK
.\gradlew assembleRelease

if ($LASTEXITCODE -eq 0) {
    $apkPath = "app\build\outputs\apk\release\app-release.apk"
    if (Test-Path $apkPath) {
        Write-Host ""
        Write-Host "✅ APK built successfully!" -ForegroundColor Green
        Write-Host "APK Location: $((Resolve-Path $apkPath).Path)" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "To install on your device:" -ForegroundColor Yellow
        Write-Host "1. Transfer the APK to your device" -ForegroundColor White
        Write-Host "2. Enable 'Install from Unknown Sources' in Settings" -ForegroundColor White
        Write-Host "3. Open the APK file on your device to install" -ForegroundColor White
        Write-Host ""
        Write-Host "Or use: adb install app\build\outputs\apk\release\app-release.apk" -ForegroundColor Cyan
    } else {
        Write-Host "Build completed but APK not found at expected location." -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "❌ Build failed. Check the error messages above." -ForegroundColor Red
}

cd ..
