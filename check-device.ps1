# Check Android device connection
# This script will help you verify if your device is connected

Write-Host "Checking for Android SDK..." -ForegroundColor Cyan

# Common Android SDK locations
$possiblePaths = @(
    "$env:LOCALAPPDATA\Android\Sdk",
    "$env:USERPROFILE\AppData\Local\Android\Sdk",
    "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk",
    "$env:ANDROID_HOME"
)

$androidSdkPath = $null
foreach ($path in $possiblePaths) {
    if (Test-Path "$path\platform-tools\adb.exe") {
        $androidSdkPath = $path
        Write-Host "Found Android SDK at: $path" -ForegroundColor Green
        break
    }
}

if (-not $androidSdkPath) {
    Write-Host "Android SDK not found in common locations." -ForegroundColor Red
    Write-Host "Please set ANDROID_HOME environment variable or update this script." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Common locations to check:" -ForegroundColor Yellow
    Write-Host "  - $env:LOCALAPPDATA\Android\Sdk" -ForegroundColor Gray
    Write-Host "  - $env:USERPROFILE\AppData\Local\Android\Sdk" -ForegroundColor Gray
    exit 1
}

$adbPath = "$androidSdkPath\platform-tools\adb.exe"

Write-Host ""
Write-Host "Checking for connected devices..." -ForegroundColor Cyan
Write-Host ""

& $adbPath devices

Write-Host ""
Write-Host "If you see 'unauthorized', check your phone for the USB debugging permission popup." -ForegroundColor Yellow
Write-Host "If you see 'device', you're all set!" -ForegroundColor Green
Write-Host ""
Write-Host "If no devices are listed:" -ForegroundColor Yellow
Write-Host "  1. Make sure USB debugging is enabled in Developer Options" -ForegroundColor Gray
Write-Host "  2. Select 'Transfer files' mode when connecting USB (not 'Charge only')" -ForegroundColor Gray
Write-Host "  3. Try disconnecting and reconnecting the USB cable" -ForegroundColor Gray
