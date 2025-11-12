# HueGrab Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- Expo account (free): https://expo.dev
- For iOS: Xcode (Mac only) or TestFlight access
- For Android: Android Studio or physical device

## Part 1: Commit Changes to Git

```powershell
cd <your-project-directory>
git add .
git commit -m "feat: Add haptic feedback and capture animation with final polish

- Install expo-haptics for tactile feedback on interactions
- Implement useHaptics hook with light, medium, success, and error haptics
- Create CaptureAnimation component with white flash effect (300ms duration)
- Integrate haptics and animation into CameraScreen capture flow
- Add haptic feedback to ColorResultPanel copy and share buttons
- Update app.json with description and final metadata
- All 69 tests passing with TypeScript compilation clean
- Graceful error handling ensures functionality on all devices"

git push origin master
```

## Part 2: Device Testing

### Option A: Test on Physical Device (Recommended)

#### For iOS (iPhone/iPad):
1. Install Expo Go app from App Store
2. Run development server:
   ```powershell
   cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
   npm start
   ```
3. In Expo Go app, tap "Scan QR Code" and scan the QR code displayed in terminal
4. App will load on device - test all functionality:
   - Camera permissions request
   - Camera preview full-screen
   - Tap anywhere to capture color
   - Color result panel displays correctly
   - Copy HEX button works
   - Copy RGB button works
   - Share button works
   - Haptic feedback feels appropriate
   - Flash animation visible
   - Done button dismisses panel

#### For Android (Phone/Tablet):
1. Install Expo Go app from Google Play Store
2. Run development server:
   ```powershell
   cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
   npm start
   ```
3. In Expo Go app, tap "Scan QR Code" and scan the QR code displayed in terminal
4. App will load on device - test all functionality (same as iOS)

### Option B: Test on Emulator/Simulator

#### iOS Simulator (Mac only):
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
npm start
# Press 'i' in terminal to open iOS Simulator
```

#### Android Emulator (Windows):
```powershell
# First, ensure Android Emulator is running from Android Studio
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
npm start
# Press 'a' in terminal to open Android Emulator
```

### Test Checklist

- [ ] Camera permission request appears on first launch
- [ ] "Allow Access" button successfully requests camera permission
- [ ] Camera preview fills entire screen
- [ ] Full-screen camera works without crashes
- [ ] Tapping screen shows haptic feedback
- [ ] Flash animation appears on tap
- [ ] Loading indicator shows during capture
- [ ] Color result panel appears at bottom
- [ ] Color preview circle displays correct color
- [ ] HEX code displays correctly (e.g., #FFFFFF)
- [ ] RGB code displays correctly (e.g., rgb(255, 255, 255))
- [ ] "Copy HEX" button copies to clipboard + haptic feedback
- [ ] "Copy RGB" button copies to clipboard + haptic feedback
- [ ] "✓ Copied" feedback shows for 2 seconds after copy
- [ ] "Share" button opens system share menu
- [ ] "Done" button dismisses panel
- [ ] Tapping outside panel (backdrop) dismisses it
- [ ] Can capture multiple colors in sequence
- [ ] Error handling works (e.g., if color extraction fails)

## Part 3: Prepare for App Store Deployment

### Create App Store Connect Account (iOS)
1. Go to https://appstoreconnect.apple.com
2. Sign in with Apple ID
3. Create new app:
   - Platform: iOS
   - Name: HueGrab
   - Bundle ID: com.yourcompany.huegrab (or similar)
   - SKU: huegrab-001
   - Category: Utilities

### Create Google Play Console Account (Android)
1. Go to https://play.google.com/console
2. Sign in with Google Account
3. Create new app:
   - Name: HueGrab
   - Default language: English
   - Category: Tools
   - Content rating: PEGI 3 (or equivalent)

### Create Required Assets

Create these images and add to `app/assets/`:

#### Icon (1024x1024 PNG)
- Design a simple, colorful circle representing color picking
- Use solid background color
- File: `app/assets/icon.png`

#### Splash Screen (1284x2778 PNG)
- Display app name "HueGrab" with a color palette background
- File: `app/assets/splash-icon.png`

#### Adaptive Icon - Android (1024x1024 PNG)
- Foreground: Icon design (centered)
- Background: Solid color
- File: `app/assets/adaptive-icon.png`

#### Screenshots for Store (multiple resolutions)
- Main screen with camera
- Color result panel
- Copy functionality
- Share functionality

### Update App Configuration

Update `app/app.json`:

```json
{
  "expo": {
    "name": "HueGrab",
    "slug": "huegrab",
    "version": "1.0.0",
    "description": "A minimalist color picker app that captures real-world colors with a single tap.",
    "privacy": "public",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "newArchEnabled": true,
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow HueGrab to access your camera to capture colors from real-world objects."
        }
      ]
    ],
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.huegrab",
      "buildNumber": "1",
      "infoPlist": {
        "NSCameraUsageDescription": "Allow HueGrab to access your camera to capture colors from real-world objects.",
        "UIStatusBarStyle": "dark-content"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#000000"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.yourcompany.huegrab",
      "versionCode": 1,
      "permissions": ["android.permission.CAMERA"]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "scheme": "huegrab",
    "owner": "sam-red-26"
  }
}
```

## Part 4: Build and Publish with EAS

### Create EAS Configuration

```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas build:configure
```

This creates `eas.json` - accept default options.

### Build for iOS

```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas build --platform ios --auto-submit
```

This will:
- Build iOS app on Expo's servers
- Generate `.ipa` file
- Upload to App Store Connect (if --auto-submit used)

### Build for Android

```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas build --platform android
```

This will:
- Build Android app on Expo's servers
- Generate `.apk` or `.aab` file
- Download to your machine

### Test the Built Apps

#### iOS TestFlight
1. Open App Store Connect
2. Go to "TestFlight" tab
3. Invite testers with email addresses
4. Testers download TestFlight app and test your build

#### Android Internal Testing
1. Open Google Play Console
2. Go to "Internal testing" track
3. Add testers' email addresses
4. Testers access via link to test APK

## Part 5: Submit to App Stores

### iOS App Store Submission

1. Open App Store Connect
2. Fill in app information:
   - App name: HueGrab
   - Subtitle: "Instant Color Picker"
   - Description: "Capture colors from anywhere with a single tap. Get instant HEX and RGB codes. Simple, fast, no accounts needed."
   - Keywords: color,picker,hex,rgb,camera
   - Category: Utilities
   - Age rating: 4+
   - Screenshots (for each device size)
   - App preview video (optional)
3. Set pricing (free or paid)
4. Submit for review
5. Wait 24-48 hours for Apple review

### Google Play Store Submission

1. Open Google Play Console
2. Fill in app information:
   - App name: HueGrab
   - Short description: "Capture real-world colors instantly"
   - Full description: "HueGrab is the simplest color picker app. Point your camera at any object, tap to capture, and instantly get HEX and RGB color codes. Copy to clipboard or share with others. No accounts, no history, just pure utility."
   - Screenshots (for each supported device)
   - Feature graphic (1024x500)
   - App icon (512x512)
   - Category: Tools
   - Content rating: Everyone
   - Target audience: Everyone
3. Set pricing (free or paid)
4. Enable countries for distribution
5. Submit for review
6. Wait 2-4 hours for Google review (typically faster than Apple)

## Part 6: Post-Launch Monitoring

### Monitor Performance
- Use Expo dashboard: https://expo.dev
- Set up Firebase Crashlytics for crash reports
- Monitor app ratings and reviews
- Track installation numbers

### Handle Updates
For critical bug fixes:
```powershell
# Increment version
npm version patch  # 1.0.0 -> 1.0.1

# Rebuild and submit
eas build --platform ios
eas build --platform android

# Submit updates to app stores (same process as above)
```

## Troubleshooting

### "Camera permission denied"
- iOS: Settings > HueGrab > Camera > Allow
- Android: Settings > Apps > HueGrab > Permissions > Camera > Allow

### "App crashes on launch"
- Check console for errors: `npm start` and review logs
- Verify all dependencies installed: `npm install`
- Run tests: `npm test`

### "Haptics not working"
- This is expected on simulators/emulators - test on physical device
- Some Android devices may not support haptics - graceful fallback works

### "Color extraction inaccurate"
- Lighting conditions affect color capture
- Recommend users to tap on well-lit objects
- Document in app store description

## Quick Reference Commands

```powershell
# Development
cd app
npm start              # Start dev server
npm test               # Run tests
npx tsc --noEmit       # Check TypeScript

# Building
eas build --platform ios
eas build --platform android

# Publishing (requires Expo account)
eas submit --platform ios
eas submit --platform android
```

## Support

For issues with:
- **Expo**: https://docs.expo.dev
- **React Native**: https://reactnative.dev
- **EAS Build**: https://docs.expo.dev/eas-build/introduction/
- **App Store**: https://developer.apple.com
- **Google Play**: https://developer.android.com

---

**Next Steps:**
1. ✅ All code complete and tested (69 tests passing)
2. ✅ TypeScript compilation clean
3. ⬜ Create app store accounts
4. ⬜ Design and create app icon and splash screens
5. ⬜ Test on physical devices
6. ⬜ Submit to app stores
7. ⬜ Monitor reviews and ratings
