## Plan: HueGrab Mobile Color Picker App

A minimalist React Native + Expo mobile app that captures real-world colors through the phone camera with a single tap, displaying HEX/RGB codes with copy and share functionality. Built as a zero-setup, single-screen utility focused on dead-simple UX.

**Phases: 6**

1. **Phase 1: Project Setup & Color Utilities (TDD Foundation)**
    - **Objective:** Initialize Expo project with TypeScript, install dependencies, and create color conversion utilities with comprehensive test coverage
    - **Files/Functions to Modify/Create:** 
        - `package.json`, `app.json`, `tsconfig.json`
        - `src/utils/colorUtils.ts` (rgbaToHex, rgbaToRgbString, hexToRgb)
        - `src/types/color.ts` (ColorResult interface)
        - `__tests__/utils/colorUtils.test.ts`
    - **Tests to Write:** 
        - Test rgbaToHex converts RGBA values to HEX format correctly
        - Test rgbaToRgbString formats RGB string properly
        - Test hexToRgb converts HEX to RGB object
        - Test edge cases (black, white, transparency values)
    - **Steps:**
        1. Run `npx create-expo-app HueGrab --template blank-typescript` to initialize project
        2. Install dependencies: expo-camera, expo-clipboard, expo-sharing, react-native-safe-area-context
        3. Configure app.json with camera permissions and app metadata
        4. Write failing tests for color conversion functions
        5. Implement colorUtils functions to pass tests
        6. Create TypeScript interfaces for color data
        7. Run tests to confirm all pass

2. **Phase 2: Camera Permissions & Permission Screen**
    - **Objective:** Implement camera permission handling with a dedicated permission request screen that guides users through granting access
    - **Files/Functions to Modify/Create:**
        - `src/components/PermissionScreen.tsx` (PermissionScreen component)
        - `src/hooks/useCameraPermission.ts` (permission hook)
        - `__tests__/components/PermissionScreen.test.tsx`
        - `__tests__/hooks/useCameraPermission.test.tsx`
    - **Tests to Write:**
        - Test PermissionScreen renders permission request UI
        - Test permission button triggers Camera.requestCameraPermissionsAsync
        - Test useCameraPermission hook returns correct permission states
        - Test navigation to settings when permission denied
        - Test permission granted state transitions correctly
    - **Steps:**
        1. Write tests for PermissionScreen component rendering
        2. Create PermissionScreen with permission request UI
        3. Write tests for useCameraPermission hook
        4. Implement useCameraPermission hook using Camera.useCameraPermissions()
        5. Add permission state handling (null, granted, denied)
        6. Implement "Open Settings" functionality for denied state
        7. Run all tests to confirm they pass

3. **Phase 3: Camera Preview Screen & Basic UI**
    - **Objective:** Create full-screen camera preview with safe area handling and basic tap gesture recognition
    - **Files/Functions to Modify/Create:**
        - `src/screens/CameraScreen.tsx` (main camera screen)
        - `App.tsx` (entry point with permission routing)
        - `__tests__/screens/CameraScreen.test.tsx`
    - **Tests to Write:**
        - Test CameraScreen renders Camera.Camera component
        - Test camera preview fills screen correctly
        - Test safe area insets are respected
        - Test tap gesture is recognized on screen
        - Test camera ref is created properly
    - **Steps:**
        1. Write tests for CameraScreen component structure
        2. Create CameraScreen with full-screen Camera component
        3. Add SafeAreaView for notch/status bar handling
        4. Write tests for tap gesture handling
        5. Implement Pressable overlay for tap detection
        6. Add camera ref for future capture functionality
        7. Update App.tsx to route between Permission and Camera screens
        8. Run tests to confirm all pass

4. **Phase 4: Color Capture & Extraction Logic**
    - **Objective:** Implement tap-to-capture functionality that extracts color from the tapped coordinate and converts to HEX/RGB formats
    - **Files/Functions to Modify/Create:**
        - `src/utils/imageUtils.ts` (extractColorFromImage, getPixelColor)
        - `src/hooks/useColorCapture.ts` (capture orchestration hook)
        - `__tests__/utils/imageUtils.test.ts`
        - `__tests__/hooks/useColorCapture.test.ts`
        - Update `src/screens/CameraScreen.tsx`
    - **Tests to Write:**
        - Test extractColorFromImage returns color at specified coordinates
        - Test getPixelColor extracts RGBA from image data
        - Test useColorCapture hook triggers camera capture
        - Test coordinate translation from tap to image space
        - Test color conversion pipeline (RGBA → HEX/RGB)
        - Test error handling for failed captures
    - **Steps:**
        1. Write tests for extractColorFromImage function
        2. Implement imageUtils with pixel sampling logic
        3. Write tests for useColorCapture hook
        4. Implement useColorCapture with takePictureAsync integration
        5. Add coordinate translation logic (screen to image space)
        6. Connect color extraction to colorUtils conversion
        7. Update CameraScreen to use useColorCapture on tap
        8. Add loading state during capture
        9. Run all tests to confirm they pass

5. **Phase 5: Color Result Panel UI with Copy & Share**
    - **Objective:** Create bottom panel that displays captured color with preview, HEX/RGB codes, and functional copy/share buttons
    - **Files/Functions to Modify/Create:**
        - `src/components/ColorResultPanel.tsx` (result panel component)
        - `src/hooks/useClipboard.ts` (clipboard operations)
        - `src/hooks/useShare.ts` (share operations)
        - `__tests__/components/ColorResultPanel.test.tsx`
        - `__tests__/hooks/useClipboard.test.ts`
        - `__tests__/hooks/useShare.test.ts`
        - Update `src/screens/CameraScreen.tsx`
    - **Tests to Write:**
        - Test ColorResultPanel renders when color result exists
        - Test panel displays color preview square correctly
        - Test HEX and RGB codes are displayed properly
        - Test Copy HEX button calls Clipboard.setStringAsync
        - Test Copy RGB button calls Clipboard.setStringAsync
        - Test Share button calls Sharing.shareAsync
        - Test panel dismisses when user taps outside
    - **Steps:**
        1. Write tests for ColorResultPanel rendering and layout
        2. Create ColorResultPanel with color preview and codes display
        3. Write tests for copy button functionality
        4. Implement useClipboard hook with expo-clipboard
        5. Write tests for share functionality
        6. Implement useShare hook with expo-sharing
        7. Add copy/share buttons to panel with proper handlers
        8. Implement panel dismiss on backdrop tap
        9. Update CameraScreen to show panel when color captured
        10. Run all tests to confirm they pass

6. **Phase 6: Polish, Haptics & Final Testing**
    - **Objective:** Add visual feedback, haptic feedback, polish UI styling, and perform comprehensive end-to-end testing
    - **Files/Functions to Modify/Create:**
        - Install and configure `expo-haptics`
        - `src/components/CaptureAnimation.tsx` (flash animation)
        - Update `src/screens/CameraScreen.tsx` with animations
        - Update `src/components/ColorResultPanel.tsx` with final styling
        - `__tests__/integration/colorCapture.integration.test.ts`
        - Update `app.json` with final app metadata (icon, splash)
    - **Tests to Write:**
        - Test haptic feedback triggers on capture
        - Test flash animation plays on capture
        - Test success toast shows on copy
        - Integration test: full flow from tap to copy
        - Integration test: permission → capture → share flow
        - Test error states display properly
    - **Steps:**
        1. Install expo-haptics dependency
        2. Write tests for haptic feedback integration
        3. Add haptic feedback to capture and button interactions
        4. Write tests for CaptureAnimation component
        5. Create flash animation component
        6. Integrate animation into capture flow
        7. Add success feedback for copy/share actions
        8. Polish ColorResultPanel styling (shadows, spacing, fonts)
        9. Write integration tests for complete user flows
        10. Test on both iOS and Android devices
        11. Run all tests including integration tests
        12. Update app.json with icon and splash screen assets

**Open Questions:**
1. Should we support additional color formats (HSL, CMYK) or stick with HEX/RGB only for MVP simplicity?
2. Do you want separate "Copy HEX" and "Copy RGB" buttons, or a single "Copy" button that copies both?
3. Should the share feature include a color preview image or just text codes?
4. Do you want a crosshair/reticle in the center of the screen to guide tapping, or keep it completely minimal?
5. Should we include any error retry mechanism if color capture fails, or just show an error message?
