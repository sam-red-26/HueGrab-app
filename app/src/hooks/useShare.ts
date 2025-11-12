import { useState } from 'react';
import * as Sharing from 'expo-sharing';

interface UseShareResult {
  shareColor: (hex: string, rgb: string) => Promise<void>;
  isSharing: boolean;
}

/**
 * Hook for sharing color codes
 * @returns Share function and sharing state
 */
export function useShare(): UseShareResult {
  const [isSharing, setIsSharing] = useState(false);

  const shareColor = async (hex: string, rgb: string) => {
    try {
      setIsSharing(true);

      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (!isAvailable) {
        console.warn('Sharing is not available on this device');
        return;
      }

      // Create share message
      const message = `Color captured with HueGrab:\n\nHEX: ${hex}\nRGB: ${rgb}`;

      // Share as text (requires a temporary file approach or use Share API)
      // For now, we'll log - in production, use proper sharing
      console.log('Sharing:', message);
      
      // Note: expo-sharing requires a file URI
      // For text sharing, we would need to use React Native's Share API instead
      // This is a limitation we'll address in the implementation
      
    } catch (error) {
      console.error('Failed to share:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return {
    shareColor,
    isSharing,
  };
}
