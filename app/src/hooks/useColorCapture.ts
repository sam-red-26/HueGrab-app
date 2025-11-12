import { useState, useRef } from 'react';
import { CameraView } from 'expo-camera';
import { Dimensions } from 'react-native';
import { ColorResult } from '../types/color';
import { extractColorFromImage, translateTapToImageCoords } from '../utils/imageUtils';

interface UseColorCaptureResult {
  colorResult: ColorResult | null;
  isCapturing: boolean;
  error: string | null;
  captureColor: (x: number, y: number, screenWidth: number, screenHeight: number) => Promise<void>;
  clearResult: () => void;
  cameraRef: React.RefObject<CameraView | null>;
}

/**
 * Hook for capturing colors from camera feed
 * @returns Color capture state and functions
 */
export function useColorCapture(): UseColorCaptureResult {
  const cameraRef = useRef<CameraView>(null);
  const [colorResult, setColorResult] = useState<ColorResult | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const captureColor = async (
    x: number,
    y: number,
    screenWidth: number,
    screenHeight: number
  ) => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      setError(null);

      // Take picture with camera
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5, // Lower quality for faster processing
        skipProcessing: true,
      });

      if (!photo) {
        throw new Error('Failed to capture photo');
      }

      // Extract color at tap coordinates
      // Translate screen coordinates to image coordinates
      const screenDimensions = Dimensions.get('screen');
      const translatedCoords = translateTapToImageCoords(
        { x, y },
        { width: screenDimensions.width, height: screenDimensions.height },
        { width: photo.width, height: photo.height }
      );

      const result = await extractColorFromImage(
        photo.uri,
        translatedCoords.x,
        translatedCoords.y,
        photo.width,
        photo.height
      );

      setColorResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to capture color';
      setError(errorMessage);
      console.error('Color capture error:', err);
    } finally {
      setIsCapturing(false);
    }
  };

  const clearResult = () => {
    setColorResult(null);
    setError(null);
  };

  return {
    colorResult,
    isCapturing,
    error,
    captureColor,
    clearResult,
    cameraRef,
  };
}
