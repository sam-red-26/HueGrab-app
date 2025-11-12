import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface CaptureAnimationProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

export function CaptureAnimation({ isVisible, onAnimationComplete }: CaptureAnimationProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Flash animation: fade in quickly, then fade out
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      });
    }
  }, [isVisible, opacity, onAnimationComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={[styles.flash, { opacity }]} pointerEvents="none" />
  );
}

const styles = StyleSheet.create({
  flash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
  },
});
