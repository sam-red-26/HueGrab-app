import React from 'react';
import { View, StyleSheet, Pressable, ActivityIndicator, useWindowDimensions, Text } from 'react-native';
import { CameraView } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorCapture } from '../hooks/useColorCapture';

export function CameraScreen() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { cameraRef, isCapturing, colorResult, error, captureColor } = useColorCapture();

  const handleTap = async (event: any) => {
    if (isCapturing) return;

    const { locationX, locationY } = event.nativeEvent;

    console.log('Tapped at coordinates:', locationX, locationY);
    
    await captureColor(locationX, locationY, screenWidth, screenHeight);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
        />
        
        {/* Tap overlay */}
        <Pressable
          style={styles.tapOverlay}
          onPress={handleTap}
        >
          {isCapturing && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </Pressable>

        {/* Temporary color result display - will be replaced with ColorResultPanel in Phase 5 */}
        {colorResult && (
          <View style={styles.tempResultContainer}>
            <View style={[styles.colorPreview, { backgroundColor: colorResult.hex }]} />
            <Text style={styles.colorText}>{colorResult.hex}</Text>
            <Text style={styles.colorText}>{colorResult.rgb}</Text>
          </View>
        )}

        {/* Error display */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  tapOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
    borderRadius: 50,
  },
  tempResultContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  colorPreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  colorText: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 4,
    fontWeight: '600',
  },
  errorContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 16,
    borderRadius: 8,
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
