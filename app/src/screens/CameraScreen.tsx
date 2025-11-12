import React, { useRef, useState } from 'react';
import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TapCoordinates {
  x: number;
  y: number;
}

export function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleTap = async (event: any) => {
    if (isCapturing || !cameraRef.current) return;

    const { locationX, locationY } = event.nativeEvent;
    const coordinates: TapCoordinates = {
      x: locationX,
      y: locationY,
    };

    console.log('Tapped at coordinates:', coordinates);
    
    // Capture will be implemented in Phase 4
    setIsCapturing(true);
    
    // Simulate capture delay
    setTimeout(() => {
      setIsCapturing(false);
    }, 500);
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
});
