# 🎨 HueGrab

<div align="center">
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.76-61dafb?logo=react)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-~54.0.0-000020?logo=expo)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
  [![Tests](https://img.shields.io/badge/tests-71%20passing-success)](https://jestjs.io/)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

  **A minimalist color picker app that captures real-world colors with a single tap.**
  
  [🌐 Website](https://huegrabapp.vercel.app/) • [📱 Download](https://github.com/sam-red-26/HueGrab-app/releases) • [📖 Documentation](#documentation)

  <img src="app/assets/icon.png" alt="HueGrab Icon" width="120"/>

</div>

---

## ✨ Features

- **🎯 Instant Color Capture** - Tap anywhere on your camera view to extract colors
- **🎨 Multiple Formats** - Get HEX (#FFFFFF) and RGB (rgb(255, 255, 255)) codes
- **📋 Copy & Share** - One-tap copy to clipboard or share with others
- **📱 Haptic Feedback** - Tactile response for better user experience
- **⚡ Fast & Lightweight** - Minimal app size, maximum performance
- **🔒 Privacy First** - No data collection, no tracking, fully offline
- **🌙 Beautiful UI** - Clean, minimalist dark mode interface

## 📸 Screenshots

| Camera View | Color Capture | Result Panel |
|------------|---------------|--------------|
| Point your camera at any object | Tap to capture the color | Get instant HEX and RGB codes |

## 🚀 Quick Start

### For Users

**Android:**
1. Download APK from [Releases](https://github.com/sam-red-26/HueGrab-app/releases)
2. Enable "Install from Unknown Sources" in Settings
3. Install and grant camera permission

**iOS:**
- Coming soon (requires Apple Developer account)
- Alternative: Use AltStore for sideloading

### For Developers

```bash
# Clone the repository
git clone https://github.com/sam-red-26/HueGrab-app.git
cd HueGrab-app/app

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Type check
npx tsc --noEmit
```

## 🛠️ Tech Stack

- **Framework:** React Native 0.76
- **Platform:** Expo ~54.0.0
- **Language:** TypeScript 5.3
- **Testing:** Jest (71 tests passing)
- **Camera:** expo-camera
- **Image Processing:** expo-image-manipulator
- **UI Components:** react-native-safe-area-context
- **Haptics:** expo-haptics

## 📂 Project Structure

```
HueGrab-app/
├── app/                          # React Native app
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── screens/             # App screens
│   │   ├── types/               # TypeScript types
│   │   └── utils/               # Utility functions
│   ├── __tests__/               # Test files
│   ├── assets/                  # Icons and images
│   └── package.json
├── website/                      # Landing page (Vercel)
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── plans/                        # Development phase documentation
└── README.md
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

**Test Coverage:**
- ✅ 71 tests passing
- ✅ Components fully tested
- ✅ Hooks covered
- ✅ Utilities validated
- ✅ TypeScript strict mode

## 🏗️ Building

### Android APK

```bash
cd app
eas build --platform android --profile production
```

### iOS IPA

```bash
cd app
eas build --platform ios --profile production
```

See [WEBSITE_AND_BUILD_GUIDE.md](WEBSITE_AND_BUILD_GUIDE.md) for detailed build instructions.

## 📖 Documentation

- [Deployment Guide](DEPLOYMENT_GUIDE.md) - App Store and Play Store deployment
- [Website & Build Guide](WEBSITE_AND_BUILD_GUIDE.md) - Website deployment and APK/IPA builds
- [Complete Deployment Guide](COMPLETE_DEPLOYMENT_GUIDE.md) - Comprehensive deployment documentation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔒 Privacy

HueGrab respects your privacy:
- ✅ No data collection
- ✅ No analytics or tracking
- ✅ No user accounts
- ✅ Images processed locally only
- ✅ Nothing stored or transmitted
- ✅ Fully offline after installation

See [Privacy Policy](https://huegrabapp.vercel.app/privacy.html) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**sam-red-26**

- GitHub: [@sam-red-26](https://github.com/sam-red-26)
- Website: [huegrabapp.vercel.app](https://huegrabapp.vercel.app/)

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Icons from Expo Asset Library
- UI inspired by modern minimalist design principles
- Developed with [Copilot Orchestra](copilot-orchestra/) workflow

## 📊 Stats

- **Version:** 1.0.0
- **Bundle Size:** ~50 MB
- **Min SDK:** Android 13+ / iOS 15+
- **Tests:** 71 passing
- **TypeScript:** Strict mode
- **Code Quality:** ESLint + Prettier

## 🎯 Roadmap

- [x] Android APK build
- [x] Website deployment
- [x] Core color capture functionality
- [x] Haptic feedback
- [x] Share functionality
- [ ] iOS IPA build
- [ ] Color history (optional)
- [ ] Multiple color formats (HSL, CMYK)
- [ ] Color palette generation

## 📱 Download

**Latest Release:** [v1.0.0](https://github.com/sam-red-26/HueGrab-app/releases/tag/HueGrab_v1.0.0)

- [📥 Download Android APK](https://github.com/sam-red-26/HueGrab-app/releases/download/HueGrab_v1.0.0/HueGrab_android_1.0.apk)

---

<div align="center">
  Made with ❤️ and React Native
  
  ⭐ Star this repo if you find it helpful!
</div>
