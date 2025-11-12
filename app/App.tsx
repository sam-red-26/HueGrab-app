import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PermissionScreen } from './src/components/PermissionScreen';
import { CameraScreen } from './src/screens/CameraScreen';
import { useCameraPermission } from './src/hooks/useCameraPermission';

export default function App() {
  const { isGranted } = useCameraPermission();
  const [hasGrantedPermission, setHasGrantedPermission] = useState(false);

  const handlePermissionGranted = () => {
    setHasGrantedPermission(true);
  };

  // Show permission screen if not granted
  if (!isGranted && !hasGrantedPermission) {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <PermissionScreen onPermissionGranted={handlePermissionGranted} />
          <StatusBar style="light" />
        </View>
      </SafeAreaProvider>
    );
  }

  // Show camera screen once permission granted
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <CameraScreen />
        <StatusBar style="light" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
