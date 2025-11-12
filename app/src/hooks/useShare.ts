import { useState } from 'react';
import { Share } from 'react-native';

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

      const message = `Color captured with HueGrab:\n\nHEX: ${hex}\nRGB: ${rgb}`;

      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
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
