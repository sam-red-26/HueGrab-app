import React from 'react';
import { View, StyleSheet, Pressable, ActivityIndicator, useWindowDimensions, Text } from 'react-native';
import { CameraView } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorCapture } from '../hooks/useColorCapture';
import { ColorResultPanel } from '../components/ColorResultPanel';

export function CameraScreen() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { cameraRef, isCapturing, colorResult, error, captureColor, clearResult } = useColorCapture();

  const handleTap = async (event: any) => {
    if (isCapturing) return;

    const { locationX, locationY } = event.nativeEvent;

    console.log('Tapped at coordinates:', locationX, locationY);
    
    await captureColor(locationX, locationY, screenWidth, screenHeight);
  };

  const handleDismiss = () => {
    clearResult();
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

        {/* Error display */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>

      {/* Color Result Panel */}
      {colorResult && (
        <ColorResultPanel 
          colorResult={colorResult} 
          onDismiss={handleDismiss} 
        />
      )}
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
