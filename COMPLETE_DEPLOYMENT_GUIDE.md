# HueGrab - Complete Deployment Guide

## 📋 Prerequisites Checklist

- [x] App tested and working in Expo Go
- [x] All tests passing (71 tests)
- [x] TypeScript compilation clean
- [x] EAS CLI installed globally
- [x] `eas.json` configuration created
- [x] `app.json` updated with bundle identifiers
- [ ] Expo account logged in
- [ ] Apple Developer Account ($99/year) - for iOS
- [ ] Google Play Developer Account ($25 one-time) - for Android

---

## Step 1: Set Up Your Accounts

### A. Expo Account
You're already logged in as **sam-red-26**. If you need to log in again:
```powershell
eas login
```

### B. Apple Developer Account (iOS)
1. Go to https://developer.apple.com
2. Enroll in Apple Developer Program ($99/year)
3. Wait for approval (usually 24-48 hours)

### C. Google Play Developer Account (Android)
1. Go to https://play.google.com/console
2. Create developer account ($25 one-time fee)
3. Complete registration and payment

---

## Step 2: Build for Android

### Build APK for Testing
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas build --platform android --profile preview
```

This will:
- Build an APK you can install directly on Android devices
- Take ~10-15 minutes on Expo's servers
- Provide a download link when complete

### Build AAB for Google Play Store
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas build --platform android --profile production
```

**Note:** For production, change `buildType` in `eas.json` to `"aab"`:
```json
"production": {
  "android": {
    "buildType": "aab"
  }
}
```

---

## Step 3: Build for iOS

### Prerequisites
- Apple Developer Account required
- EAS will handle certificates and provisioning profiles automatically

### Build for TestFlight/App Store
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas build --platform ios --profile production
```

This will:
- Build an IPA file
- Take ~15-20 minutes
- Prompt for Apple ID credentials
- Automatically manage certificates

---

## Step 4: Submit to Google Play Store

### A. Create App in Google Play Console
1. Go to https://play.google.com/console
2. Click "Create app"
3. Fill in details:
   - **App name:** HueGrab
   - **Default language:** English (United States)
   - **App or game:** App
   - **Free or paid:** Free
   - **Category:** Tools
   - **Content rating:** Everyone

### B. Fill Required Information

#### Store Listing
- **Short description:** "Capture real-world colors instantly with your camera"
- **Full description:**
```
HueGrab is the simplest color picker app for your phone. Point your camera at any object, tap to capture, and instantly get HEX and RGB color codes.

✨ Features:
• Instant color capture with a single tap
• Get HEX codes (#FFFFFF format)
• Get RGB codes (rgb(255, 255, 255) format)
• Copy to clipboard with one tap
• Share colors with others
• Haptic feedback for better interaction
• Clean, minimalist interface
• No ads, no tracking, no accounts needed

Perfect for:
• Designers matching colors from real objects
• Artists capturing color inspiration
• Developers needing exact color codes
• Anyone curious about colors around them

Just tap, capture, and copy. That's it!
```

- **App icon:** Upload `assets/icon.png` (512x512)
- **Feature graphic:** Create a 1024x500 banner image
- **Screenshots:** Upload at least 2 screenshots (from your testing)

#### Privacy Policy
Since the app uses camera:
```
HueGrab Privacy Policy

HueGrab does not collect, store, or share any personal data.

Camera Access:
The app requires camera access to capture images for color extraction. Images are processed locally on your device and are never stored, uploaded, or transmitted.

No Data Collection:
We do not collect any usage data, analytics, or personal information.

Contact:
For questions, email: [your-email@example.com]
```

Host this on GitHub Pages or your website, then add the URL to the Play Console.

#### Content Rating
1. Fill out the content rating questionnaire
2. Should receive "Everyone" rating

### C. Upload Build
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas submit --platform android
```

Or upload manually in Google Play Console:
1. Go to "Release" → "Production"
2. Click "Create new release"
3. Upload the AAB file from EAS build
4. Add release notes
5. Review and rollout

---

## Step 5: Submit to Apple App Store

### A. Create App in App Store Connect
1. Go to https://appstoreconnect.apple.com
2. Click "My Apps" → "+"
3. Fill in details:
   - **Name:** HueGrab
   - **Primary Language:** English (U.S.)
   - **Bundle ID:** com.samred26.huegrab (select from dropdown)
   - **SKU:** huegrab-001

### B. Fill App Information

#### App Information
- **Subtitle:** "Instant Color Picker"
- **Category:** Utilities
- **Age Rating:** 4+

#### Description
```
Capture colors from the real world with a single tap.

HueGrab turns your iPhone into an instant color picker. Point your camera at any object, tap the screen, and get the exact color code in HEX and RGB formats.

Features:
• Tap anywhere on your camera view to capture colors
• Instant HEX codes (#FFFFFF)
• Instant RGB codes (rgb(255, 255, 255))
• One-tap copy to clipboard
• Native share functionality
• Haptic feedback
• Clean, distraction-free interface
• Works completely offline
• No account required

Perfect for designers, artists, developers, and anyone who needs to capture real-world colors quickly.

Simple. Fast. No nonsense.
```

- **Keywords:** color,picker,hex,rgb,camera,eyedropper,color code,design,palette
- **Support URL:** Your GitHub repo or website
- **Marketing URL:** (optional)

#### Screenshots
Upload screenshots for:
- 6.7" Display (iPhone 14 Pro Max)
- 6.5" Display (iPhone 11 Pro Max)
- 5.5" Display (iPhone 8 Plus)

Use iPhone simulators or ask users with different devices to take screenshots.

### C. Upload Build with EAS
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas submit --platform ios
```

This will:
- Upload the IPA to App Store Connect
- Require your Apple ID credentials
- Process the build (~15-30 minutes)

### D. TestFlight (Optional but Recommended)
1. After build processes, enable TestFlight
2. Add internal testers (you and friends)
3. Test the production build
4. Fix any issues and rebuild if needed

### E. Submit for Review
1. In App Store Connect, go to your app
2. Select the version
3. Add all required information
4. Click "Submit for Review"
5. Wait 24-48 hours for Apple review

---

## Step 6: Post-Launch Monitoring

### Check Status
- **Google Play:** Usually approved within 2-4 hours
- **Apple App Store:** Usually 24-48 hours

### Monitor Analytics
- Downloads
- Crashes (use Expo dashboard)
- User reviews

### Update Process
When you need to update:

1. Update version in `app.json`:
```json
"version": "1.0.1",
"ios": {
  "buildNumber": "2"
},
"android": {
  "versionCode": 2
}
```

2. Rebuild:
```powershell
eas build --platform all
```

3. Resubmit:
```powershell
eas submit --platform all
```

---

## 🚀 Quick Start Commands

### Test Build Locally
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
npm start
```

### Build for Both Platforms
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas build --platform all
```

### Submit to Both Stores
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas submit --platform all
```

---

## 📝 Important Notes

1. **First Time Setup:** EAS will ask for credentials and certificates on first build. Just follow the prompts.

2. **Build Times:** Android builds take ~10-15 minutes, iOS builds take ~15-20 minutes.

3. **Costs:**
   - Expo EAS Build: Free tier includes limited builds per month
   - Apple Developer: $99/year
   - Google Play: $25 one-time

4. **Bundle Identifiers:**
   - iOS: `com.samred26.huegrab`
   - Android: `com.samred26.huegrab`
   
   These are already configured in `app.json`.

5. **Support Email:** You'll need a support email for both stores. Consider creating `support@huegrab.com` or using your personal email.

---

## 🆘 Troubleshooting

### "Credentials not found"
```powershell
eas credentials
```
Follow prompts to set up credentials.

### "Build failed"
Check the build logs in the EAS dashboard at https://expo.dev

### "App rejected by Apple"
- Check rejection reason in App Store Connect
- Common issues: missing privacy policy, unclear description, permissions not justified
- Fix and resubmit

### "Need to regenerate builds"
```powershell
eas build --platform [android|ios] --clear-cache
```

---

## ✅ Final Checklist Before Launch

- [ ] Test app thoroughly on physical devices
- [ ] All screenshots captured
- [ ] Privacy policy created and hosted
- [ ] Support email set up
- [ ] App description written
- [ ] Keywords selected
- [ ] Content rating completed
- [ ] Pricing set to Free
- [ ] All builds uploaded
- [ ] TestFlight testing completed (iOS)
- [ ] Internal testing completed (Android)

---

## 🎉 You're Ready!

Your app is production-ready. Start with Android (faster approval) while waiting for Apple Developer account approval.

Good luck with your launch! 🚀
