# Setup environment variables
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
$env:ANDROID_HOME = "C:\Users\abdur\AppData\Local\Android\Sdk"
$env:PATH = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\tools;$env:ANDROID_HOME\tools\bin;$env:PATH"

# Verify device is connected
Write-Host "Checking for connected devices..." -ForegroundColor Cyan
$devices = adb devices
if ($devices -match "device$") {
    Write-Host "Device detected! Building and installing app..." -ForegroundColor Green
    npm run android
} else {
    Write-Host "No device detected. Please connect your device and enable USB debugging." -ForegroundColor Red
    Write-Host "Run 'adb devices' to check device connection." -ForegroundColor Yellow
}
