# Build Debug APK Script (Simpler - no ProGuard)
# This script builds a debug APK that you can install on your device

Write-Host "Setting up environment..." -ForegroundColor Cyan

# Setup environment variables
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
$env:ANDROID_HOME = "C:\Users\abdur\AppData\Local\Android\Sdk"
$env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\tools;$env:ANDROID_HOME\tools\bin;$env:PATH"

Write-Host "Building Debug APK (simpler than release)..." -ForegroundColor Green
Write-Host "This may take 5-10 minutes on first build..." -ForegroundColor Yellow
Write-Host ""

cd android

# Build the debug APK (simpler, no ProGuard)
.\gradlew assembleDebug

if ($LASTEXITCODE -eq 0) {
    $apkPath = "app\build\outputs\apk\debug\app-debug.apk"
    if (Test-Path $apkPath) {
        Write-Host ""
        Write-Host "✅ Debug APK built successfully!" -ForegroundColor Green
        $fullPath = (Resolve-Path $apkPath).Path
        Write-Host "APK Location: $fullPath" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "To install on your device:" -ForegroundColor Yellow
        Write-Host "Option 1 - Via ADB:" -ForegroundColor White
        Write-Host "  adb install $fullPath" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Option 2 - Manual:" -ForegroundColor White
        Write-Host "  1. Transfer the APK to your device" -ForegroundColor White
        Write-Host "  2. Enable 'Install from Unknown Sources' in Settings" -ForegroundColor White
        Write-Host "  3. Open the APK file on your device to install" -ForegroundColor White
    } else {
        Write-Host "Build completed but APK not found at expected location." -ForegroundColor Red
    }
} else {
    Write-Host ""
    Write-Host "❌ Build failed. Check the error messages above." -ForegroundColor Red
    Write-Host "Please share the error message so I can help fix it." -ForegroundColor Yellow
}

cd ..
