# HueGrab - Research Findings for Mobile Color Picker App

## Executive Summary
This document contains comprehensive research findings for building HueGrab, a minimalist single-tap color picker mobile app that captures colors from real-world objects using the phone camera.

---

## 1. Platform/Framework Recommendation

### **RECOMMENDED: React Native with Expo**

**Rationale:**
- **Cross-platform**: Single codebase for iOS and Android (maximizes reach with minimal effort)
- **Fast development**: Hot reload, extensive libraries, large community
- **Camera access**: Excellent camera libraries with simple APIs
- **Modern tooling**: Expo provides zero-config setup, easy builds, and instant testing
- **Performance**: Sufficient for camera preview and color sampling (not computationally intensive)
- **Developer experience**: JavaScript/TypeScript familiarity, extensive documentation

**Alternatives Considered:**

1. **Flutter**
   - Pros: Excellent performance, beautiful UI, growing ecosystem
   - Cons: Dart learning curve, slightly smaller community for camera-specific libraries
   - Verdict: Great choice if already familiar with Dart, but React Native has better camera ecosystem

2. **Native iOS (Swift) + Native Android (Kotlin)**
   - Pros: Maximum performance, full platform control, best camera access
   - Cons: Two codebases to maintain, slower development, requires expertise in both platforms
   - Verdict: Overkill for a simple utility app, double the development time

3. **PWA (Progressive Web App)**
   - Pros: No app store needed, web-based
   - Cons: Limited camera access via browser APIs, poor UX for camera apps, no native feel
   - Verdict: Not suitable for camera-intensive apps requiring low-level pixel access

**Winner: React Native + Expo** - Best balance of speed, simplicity, and capability

---

## 2. Camera Access & Color Sampling

### Camera Library: **Expo Camera** or **React Native Vision Camera**

#### **Option A: Expo Camera** (RECOMMENDED for MVP)
```javascript
import { Camera } from 'expo-camera';
```

**Pros:**
- Zero native configuration
- Managed by Expo ecosystem
- Simple API for permissions and preview
- Works out-of-the-box with Expo Go for testing

**Cons:**
- Less performant than Vision Camera
- Fewer advanced features (but none needed for HueGrab)

**Key APIs:**
- `Camera.useCameraPermissions()` - Request/check camera permissions
- `<Camera>` component - Full-screen camera preview
- `takePictureAsync()` - Capture frame for color sampling
- `onCameraReady` - Know when camera is initialized

#### **Option B: React Native Vision Camera**
```javascript
import { Camera, useCameraDevice } from 'react-native-vision-camera';
```

**Pros:**
- Higher performance
- Frame processor support (real-time processing)
- More control over camera parameters

**Cons:**
- Requires native module linking (more complex setup)
- Overkill for a simple tap-to-capture app

**Recommendation:** Use **Expo Camera** for simplicity. Vision Camera is better for advanced features like real-time filters.

---

### Color Extraction Strategy

**Approach: Sample pixel at tap coordinates from captured image**

#### Libraries for Color Extraction:

1. **react-native-image-colors** (RECOMMENDED)
```javascript
import ImageColors from 'react-native-image-colors';

const result = await ImageColors.getColors(imageUri, {
  fallback: '#000000',
  pixelSpacing: 5,
  quality: 'low'
});
```
- Extracts dominant colors from images
- Works on both iOS and Android
- Can get average/dominant color from a region

2. **Manual Canvas Approach** (More control)
```javascript
import { Canvas, Image } from 'react-native-skia';
// or use expo-gl for WebGL-based pixel reading

// Read pixel at specific coordinate
const getPixelColor = async (imageUri, x, y) => {
  // Load image into canvas
  // Read RGBA values at (x, y)
  // Return as HEX/RGB
};
```

**Recommended Flow:**
1. User taps screen at coordinates (x, y)
2. Capture single frame using `camera.takePictureAsync()`
3. Load image and sample pixel color at tap coordinates
4. Convert RGBA to HEX and RGB formats
5. Display in bottom panel

**Alternative - Real-time sampling** (more advanced):
- Use Vision Camera's frame processor
- Sample color continuously at screen center
- More complex but better UX (no shutter delay)

---

## 3. Key Libraries & Dependencies

### Core Dependencies:

```json
{
  "dependencies": {
    // Framework
    "react": "18.2.0",
    "react-native": "0.74.5",
    "expo": "~51.0.0",
    
    // Camera
    "expo-camera": "~15.0.0",
    
    // Color extraction
    "react-native-image-colors": "^2.4.0",
    
    // Clipboard
    "expo-clipboard": "~6.0.0",
    
    // Sharing
    "expo-sharing": "~12.0.0",
    
    // Permissions
    "expo-permissions": "~14.4.0",
    
    // UI utilities
    "react-native-safe-area-context": "4.10.1"
  }
}
```

### Library Details:

#### **expo-clipboard** - Copy to Clipboard
```javascript
import * as Clipboard from 'expo-clipboard';

const copyToClipboard = async (text) => {
  await Clipboard.setStringAsync(text);
};
```
- Simple, zero-config clipboard access
- Works on iOS and Android
- No native linking required

#### **expo-sharing** - Share Functionality
```javascript
import * as Sharing from 'expo-sharing';

const shareColor = async (colorCode) => {
  await Sharing.shareAsync('text/plain', {
    message: `Check out this color: ${colorCode}`
  });
};
```
- Native share sheet on both platforms
- Shares to any app (Messages, Mail, Twitter, etc.)

#### **react-native-safe-area-context** - Handle notches/safe areas
```javascript
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView edges={['bottom']}>
  {/* Bottom panel with color info */}
</SafeAreaView>
```
- Ensures UI doesn't overlap with notches, home indicators
- Essential for modern devices

---

## 4. Permission Handling

### Camera Permission Flow:

```javascript
import { Camera } from 'expo-camera';
import { useState, useEffect } from 'react';

const [permission, requestPermission] = Camera.useCameraPermissions();

useEffect(() => {
  if (!permission?.granted) {
    requestPermission();
  }
}, []);

// States to handle:
// 1. null - Not yet requested
// 2. granted - Can use camera
// 3. denied - Show explanation and link to settings
```

**Best Practices:**
- Request permission on app launch
- Show clear explanation of why camera is needed
- Handle denied state gracefully with "Open Settings" button
- Use `expo-permissions` for status checks
- Test on both iOS and Android (different permission systems)

**Platform Differences:**
- iOS: Requires `NSCameraUsageDescription` in Info.plist
- Android: Requires `android.permission.CAMERA` in AndroidManifest.xml
- Expo handles this automatically via `app.json` configuration

---

## 5. Single-Screen Camera UX Best Practices

### Layout Strategy:

```
┌─────────────────────────┐
│                         │
│   Camera Preview        │
│   (Full Screen)         │
│                         │
│   [Tap anywhere to      │
│    capture color]       │
│                         │
│                         │
├─────────────────────────┤
│  ┌───┐                  │
│  │███│  #FF5733         │
│  └───┘  RGB(255,87,51)  │
│         [Copy] [Share]  │
└─────────────────────────┘
```

**Key UX Principles:**

1. **Full-screen camera preview**
   - Camera fills entire screen
   - No chrome/UI elements obscuring view
   - Tap anywhere on screen to capture

2. **Bottom panel overlay**
   - Semi-transparent or solid background
   - Color preview square (large enough to see)
   - HEX code in large, readable font
   - RGB code below in smaller font
   - Clear copy/share buttons

3. **Visual feedback**
   - Brief flash/animation on tap
   - Haptic feedback (if available)
   - Smooth animation when panel appears

4. **Accessibility**
   - High contrast for text on color preview
   - Large touch targets (minimum 44x44 points)
   - Clear labels for actions

### Recommended Component Structure:

```javascript
<View style={styles.container}>
  <Camera style={styles.camera} type={CameraType.back}>
    <TouchableOpacity 
      style={styles.captureTouchArea}
      onPress={handleTapToCapture}
      activeOpacity={1}
    >
      {/* Optional: crosshair at center */}
    </TouchableOpacity>
  </Camera>
  
  {colorCaptured && (
    <ColorResultPanel
      color={capturedColor}
      onCopy={handleCopy}
      onShare={handleShare}
    />
  )}
</View>
```

### State Management (Simple):

```javascript
const [capturedColor, setCapturedColor] = useState(null);
const [cameraReady, setCameraReady] = useState(false);

// States needed:
// - capturedColor: { hex: '#FF5733', rgb: 'RGB(255,87,51)', r, g, b }
// - cameraReady: boolean
// - permission: granted/denied/null
```

No complex state management needed (Redux/MobX overkill). Simple useState is sufficient.

---

## 6. Color Code Display & Formatting

### Color Conversion Utilities:

```javascript
// RGBA to HEX
const rgbaToHex = (r, g, b, a = 255) => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
};

// RGBA to RGB string
const rgbaToRgbString = (r, g, b) => {
  return `RGB(${r}, ${g}, ${b})`;
};

// HEX to RGB object
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
```

### Display Format:

```javascript
<View style={styles.colorPanel}>
  <View style={[styles.colorSquare, { backgroundColor: color.hex }]} />
  
  <View style={styles.codeContainer}>
    <Text style={styles.hexCode}>{color.hex}</Text>
    <Text style={styles.rgbCode}>{color.rgb}</Text>
  </View>
  
  <View style={styles.actions}>
    <TouchableOpacity onPress={() => copyToClipboard(color.hex)}>
      <Text>Copy HEX</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => copyToClipboard(color.rgb)}>
      <Text>Copy RGB</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => shareColor(color.hex)}>
      <Text>Share</Text>
    </TouchableOpacity>
  </View>
</View>
```

**Copy Behavior Options:**
1. Single "Copy" button → copies HEX by default
2. Two buttons: "Copy HEX" / "Copy RGB"
3. Tap HEX/RGB text directly to copy

**Recommendation:** Option 2 (two clear buttons) - most explicit UX

---

## 7. Project Structure

### Recommended Expo/React Native Structure:

```
HueGrab/
├── app.json                 # Expo configuration
├── package.json             # Dependencies
├── babel.config.js          # Babel config
├── tsconfig.json            # TypeScript config (optional)
│
├── App.js                   # Main app entry point
│
├── src/
│   ├── screens/
│   │   └── CameraScreen.js  # Main camera screen
│   │
│   ├── components/
│   │   ├── ColorResultPanel.js   # Bottom panel with results
│   │   ├── PermissionScreen.js   # Camera permission request
│   │   └── CaptureButton.js      # Optional: explicit button
│   │
│   ├── utils/
│   │   ├── colorUtils.js    # Color conversion functions
│   │   ├── imageUtils.js    # Image/pixel sampling
│   │   └── permissions.js   # Permission helpers
│   │
│   ├── hooks/
│   │   └── useColorCapture.js  # Custom hook for capture logic
│   │
│   └── constants/
│       └── styles.js        # Global styles/theme
│
├── assets/
│   ├── icon.png            # App icon
│   └── splash.png          # Splash screen
│
└── __tests__/
    └── colorUtils.test.js  # Unit tests
```

### Key Files:

1. **app.json** - Expo configuration
```json
{
  "expo": {
    "name": "HueGrab",
    "slug": "huegrab",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "backgroundColor": "#000000"
    },
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow HueGrab to access your camera to capture colors from real-world objects."
        }
      ]
    ],
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.yourname.huegrab"
    },
    "android": {
      "package": "com.yourname.huegrab",
      "permissions": ["CAMERA"]
    }
  }
}
```

2. **App.js** - Main entry
```javascript
import React from 'react';
import { StatusBar } from 'react-native';
import CameraScreen from './src/screens/CameraScreen';

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <CameraScreen />
    </>
  );
}
```

3. **CameraScreen.js** - Main screen component
```javascript
import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import ColorResultPanel from '../components/ColorResultPanel';
import PermissionScreen from '../components/PermissionScreen';
import { extractColorFromImage } from '../utils/imageUtils';

export default function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedColor, setCapturedColor] = useState(null);
  const cameraRef = useRef(null);
  
  // Handle camera tap
  // Capture frame
  // Extract color
  // Display result
  
  return (/* UI */);
}
```

---

## 8. Implementation Phases (Suggested)

### Phase 1: Project Setup & Camera Preview
- Initialize Expo project with TypeScript
- Install core dependencies
- Configure app.json for permissions
- Implement camera permission handling
- Display full-screen camera preview
- Test on real device (camera doesn't work in simulator)

### Phase 2: Color Capture Logic
- Implement tap-to-capture functionality
- Capture single frame on tap
- Extract pixel color at tap coordinates
- Convert to HEX and RGB formats
- Add visual feedback (flash/animation)

### Phase 3: UI - Color Display Panel
- Design bottom panel component
- Display color preview square
- Show HEX and RGB codes
- Style with clean, minimal design
- Handle safe area insets

### Phase 4: Copy & Share Functionality
- Implement clipboard copy for HEX
- Implement clipboard copy for RGB
- Add share functionality
- Show success feedback (toast/checkmark)
- Test on both iOS and Android

### Phase 5: Polish & Testing
- Add loading states
- Handle edge cases (dark colors, bright colors)
- Optimize performance
- Test on various devices
- Prepare for app store submission

---

## 9. Technical Considerations

### Performance:
- Use `takePictureAsync({ quality: 0.5 })` for faster capture
- Debounce tap events to prevent multiple captures
- Lazy load heavy libraries
- Keep camera component mounted (avoid re-initialization)

### Error Handling:
- Camera not available (no hardware)
- Permission denied
- Image capture fails
- Color extraction fails
- Clipboard/share not available

### Testing Strategy:
- Unit tests for color conversion utilities
- Component tests with React Testing Library
- Manual testing on real devices (iOS and Android)
- Test various lighting conditions
- Test on different screen sizes/notches

### Platform-Specific Quirks:
- iOS camera takes slightly longer to initialize
- Android may require runtime permissions even after manifest
- Safe area handling differs between devices
- Share behavior varies by platform

---

## 10. Development Workflow

### Setup Steps:
1. Install Node.js and npm
2. Install Expo CLI: `npm install -g expo-cli`
3. Create project: `npx create-expo-app HueGrab --template blank`
4. Install dependencies: `npm install [packages]`
5. Start dev server: `npx expo start`
6. Test on device via Expo Go app (scan QR code)

### Testing:
- **Expo Go**: For quick testing during development
- **Development Build**: For testing native modules (if using Vision Camera)
- **EAS Build**: For production builds

### Deployment:
- iOS: EAS Build → App Store Connect → TestFlight → App Store
- Android: EAS Build → Google Play Console → Internal Testing → Production

---

## 11. Open Questions & Decisions

### 1. TypeScript vs JavaScript?
**Recommendation:** TypeScript
- Better type safety for color objects
- Improved IDE support
- Easier to maintain

### 2. Frame capture vs Real-time sampling?
**Recommendation:** Frame capture (takePictureAsync)
- Simpler implementation
- More reliable
- Good enough for MVP
- Can add real-time later if needed

### 3. Single tap anywhere vs Dedicated capture button?
**Recommendation:** Tap anywhere (per requirements)
- More intuitive
- Faster workflow
- Matches "dead-simple UX" goal

### 4. Color history/recents?
**Recommendation:** No (per requirements)
- Spec explicitly says "no history"
- Keeps app simple
- Can add later if users request

### 5. Additional color formats (HSL, CMYK)?
**Recommendation:** Start with HEX and RGB only
- Covers 90% of use cases
- Keeps UI clean
- Can add toggle for advanced formats later

### 6. Light/dark theme support?
**Recommendation:** Dark theme by default
- Camera apps typically use dark UI
- Better for focusing on colors
- Reduces eye strain

---

## 12. Similar Apps (Reference)

### Inspiration & Patterns:
1. **ColorSnap (Sherwin-Williams)** - Full-screen camera, tap to capture
2. **Adobe Color** - Color extraction, sharing
3. **Pantone Studio** - Professional color matching

### Key Takeaways:
- All use full-screen camera preview
- Most use tap-to-capture (not buttons)
- Bottom panels are standard for results
- Copy and share are essential features
- Minimal UI is preferred

---

## Summary & Next Steps

### Recommended Tech Stack:
- **Framework:** React Native with Expo
- **Camera:** Expo Camera
- **Color Extraction:** react-native-image-colors + custom sampling
- **Clipboard:** expo-clipboard
- **Sharing:** expo-sharing
- **Language:** TypeScript

### Development Approach:
1. Start with Expo managed workflow (simplest)
2. Implement core features (camera, capture, display)
3. Add clipboard and share
4. Polish UI and handle edge cases
5. Test on real devices
6. Build and submit to app stores

### Estimated Complexity:
- **MVP (basic color picker):** 3-5 days
- **Polished v1.0:** 1-2 weeks
- **App store ready:** 2-3 weeks (including testing/submission)

### Critical Success Factors:
- Test on real devices early (camera doesn't work in simulator)
- Handle permissions gracefully
- Optimize for speed (capture should feel instant)
- Keep UI minimal and intuitive
- Support both iOS and Android equally

---

**Research Status:** Complete ✅
**Confidence Level:** 95%
**Ready for Planning Phase:** Yes

This research provides a comprehensive foundation for creating a detailed implementation plan.
