# HueGrab Website & App Deployment Guide

## 🌐 Part 1: Deploy Website to Vercel

### Step 1: Install Vercel CLI
```powershell
npm install -g vercel
```

### Step 2: Deploy to Vercel
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\website"
vercel
```

Follow the prompts:
1. **Set up and deploy:** Yes
2. **Which scope:** Your Vercel account
3. **Link to existing project:** No
4. **Project name:** huegrab (or your preferred name)
5. **Directory:** ./ (current directory)
6. **Override settings:** No

The website will be deployed and you'll get a URL like: `https://huegrab.vercel.app`

### Step 3: Add Custom Domain (Optional)
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain (e.g., `huegrab.com`)
5. Follow DNS configuration instructions

---

## 📱 Part 2: Build Android APK

### Step 1: Log in to EAS
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas login
```
Use your Expo account credentials (sam-red-26).

### Step 2: Build Android APK
```powershell
eas build --platform android --profile production
```

This will:
- Start a build on Expo's servers
- Take ~10-15 minutes
- Generate an APK file
- Provide a download link when complete

### Step 3: Download the APK
Once the build completes, you'll get a download URL. Download the APK file:
```powershell
# The URL will look like:
# https://expo.dev/artifacts/eas/[build-id].apk
```

Save it as `huegrab-v1.0.0.apk`

---

## 🍎 Part 3: Build iOS IPA

### Important Notes:
- iOS builds require an Apple Developer account ($99/year)
- For distribution outside the App Store, users need tools like AltStore or TestFlight

### Step 1: Build iOS IPA
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas build --platform ios --profile production
```

**First time setup:**
- EAS will ask for Apple ID credentials
- Choose to let EAS manage certificates automatically
- Build will take ~15-20 minutes

### Step 2: Download the IPA
Download the IPA file when build completes.

---

## 📤 Part 4: Upload Builds to Hosting

You have several options to host the APK and IPA files:

### Option A: GitHub Releases (Recommended)
1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `HueGrab v1.0.0`
5. Upload both APK and IPA files
6. Publish release

Download URLs will be:
- `https://github.com/sam-red-26/HueGrab-app/releases/download/v1.0.0/huegrab-v1.0.0.apk`
- `https://github.com/sam-red-26/HueGrab-app/releases/download/v1.0.0/huegrab-v1.0.0.ipa`

### Option B: Vercel Blob Storage
```powershell
# Install Vercel CLI if not already installed
npm install -g vercel

# Upload files
vercel blob upload huegrab-v1.0.0.apk
vercel blob upload huegrab-v1.0.0.ipa
```

### Option C: Firebase Storage or Google Drive
Upload the files and get public download links.

---

## 🔗 Part 5: Update Website with Download Links

### Step 1: Edit script.js
Open `website/script.js` and update the download URLs:

```javascript
// Replace these with your actual download URLs
const ANDROID_APK_URL = 'https://github.com/sam-red-26/HueGrab-app/releases/download/v1.0.0/huegrab-v1.0.0.apk';
const IOS_IPA_URL = 'https://github.com/sam-red-26/HueGrab-app/releases/download/v1.0.0/huegrab-v1.0.0.ipa';
```

### Step 2: Redeploy Website
```powershell
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\website"
vercel --prod
```

---

## ✅ Complete Deployment Commands

### All-in-One Deployment Script

```powershell
# 1. Build both platforms
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\app"
eas build --platform all --profile production

# 2. Wait for builds to complete (check status)
eas build:list

# 3. Download builds (URLs provided after build completes)
# Download APK and IPA files to a safe location

# 4. Create GitHub release and upload files
# (Do this manually through GitHub web interface)

# 5. Update website with download links
# Edit website/script.js with the GitHub release URLs

# 6. Deploy website
cd "..\website"
vercel --prod
```

---

## 📋 Checklist

### Before Building
- [x] All code tested and working
- [x] Tests passing (71 tests)
- [x] TypeScript clean
- [x] App icon and assets ready
- [x] Camera permissions configured
- [ ] Expo account logged in

### After Building
- [ ] Android APK downloaded
- [ ] iOS IPA downloaded
- [ ] Files uploaded to hosting (GitHub Releases)
- [ ] Download URLs obtained
- [ ] Website updated with download links
- [ ] Website deployed to Vercel
- [ ] Test downloads from website
- [ ] Test APK installation on Android device
- [ ] Test IPA installation with AltStore

---

## 🔧 Troubleshooting

### Build Failed
```powershell
# Check build logs
eas build:list
eas build:view [BUILD_ID]

# Retry with cache cleared
eas build --platform android --profile production --clear-cache
```

### Website Not Updating
```powershell
# Force production deployment
cd "c:\Users\Sreelekha Korlepara\Products\HueGrab\website"
vercel --prod --force
```

### Download Links Not Working
- Ensure files are publicly accessible
- Check GitHub release is published (not draft)
- Test URLs in incognito/private browser

---

## 📱 Installation Instructions for Users

### Android
1. Download APK from website
2. Enable "Install from Unknown Sources" in Settings → Security
3. Open APK file and tap Install
4. Launch HueGrab and grant camera permission

### iOS (Without App Store)
1. Install AltStore from https://altstore.io
2. Download IPA from website
3. Open in AltStore and tap Install
4. Go to Settings → General → VPN & Device Management
5. Trust the developer certificate
6. Launch HueGrab

---

## 🚀 Quick Reference

### Build Commands
```powershell
# Build Android only
eas build -p android --profile production

# Build iOS only
eas build -p ios --profile production

# Build both
eas build --platform all --profile production

# Check build status
eas build:list

# View specific build
eas build:view [BUILD_ID]
```

### Deploy Commands
```powershell
# Deploy website (preview)
vercel

# Deploy website (production)
vercel --prod

# Check deployment status
vercel list
```

---

## 📊 Expected Timelines

- **Android Build:** 10-15 minutes
- **iOS Build:** 15-20 minutes
- **Website Deployment:** 1-2 minutes
- **Total Time:** ~30-40 minutes (for first deployment)

---

## 💰 Costs

- **Vercel Hosting:** Free (Hobby plan)
- **EAS Build:** Free tier (limited builds/month)
- **GitHub Hosting:** Free
- **Apple Developer:** $99/year (only if publishing to App Store)
- **Google Play:** $25 one-time (only if publishing to Play Store)

**For standalone APK/IPA distribution: FREE** ✨

---

## 🎉 You're All Set!

Your website will be live at your Vercel URL, and users can download and install the app directly from there.

Good luck with your launch! 🚀
