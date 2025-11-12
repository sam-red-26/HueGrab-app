import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { Camera } from 'expo-camera';

interface PermissionScreenProps {
  onPermissionGranted: () => void;
}

export function PermissionScreen({ onPermissionGranted }: PermissionScreenProps) {
  const [isDenied, setIsDenied] = useState(false);

  const handleRequestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    
    if (status === 'granted') {
      onPermissionGranted();
    } else {
      setIsDenied(true);
    }
  };

  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Camera Access Required</Text>
        <Text style={styles.description}>
          HueGrab needs camera access to capture colors from real-world objects.
        </Text>
        
        {!isDenied ? (
          <Pressable style={styles.button} onPress={handleRequestPermission}>
            <Text style={styles.buttonText}>Allow Access</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.button} onPress={handleOpenSettings}>
            <Text style={styles.buttonText}>Open Settings</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
