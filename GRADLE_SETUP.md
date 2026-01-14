# Gradle Setup Guide

## Current Issue
Gradle is unable to download due to network timeouts. You have Java 22 installed, but Gradle 8.0.1 doesn't support it.

## Solutions

### Option 1: Use Java 17 (Recommended)
Java 17 is the recommended version for React Native 0.72.6 and works with Gradle 8.0.1.

1. Download and install Java 17:
   - Download from: https://adoptium.net/temurin/releases/?version=17
   - Install Java 17

2. Set JAVA_HOME to Java 17:
   ```powershell
   # Check current Java version
   java -version
   
   # Set JAVA_HOME (replace path with your Java 17 installation)
   $env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
   $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
   ```

3. Verify Java version:
   ```powershell
   java -version  # Should show version 17
   ```

4. Run the app:
   ```bash
   npm run android
   ```

### Option 2: Manually Download Gradle 8.3+
If you want to keep Java 22, manually download Gradle:

1. Download Gradle 8.3 or 8.5 from: https://gradle.org/releases/
2. Extract to: `C:\Users\abdur\.gradle\wrapper\dists\gradle-8.3-all\[hash]\gradle-8.3-all`
3. The hash folder will be created automatically on first run

### Option 3: Configure Network/Proxy
If you're behind a proxy:

1. Configure Gradle proxy in `~/.gradle/gradle.properties`:
   ```
   systemProp.http.proxyHost=your.proxy.host
   systemProp.http.proxyPort=8080
   systemProp.https.proxyHost=your.proxy.host
   systemProp.https.proxyPort=8080
   ```

2. Or increase timeout (already done in gradle-wrapper.properties)

## Quick Fix
The easiest solution is to install Java 17 and use it for this project.
