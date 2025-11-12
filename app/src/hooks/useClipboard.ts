import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

interface UseClipboardResult {
  copyToClipboard: (text: string) => Promise<void>;
  copied: boolean;
}

/**
 * Hook for copying text to clipboard with feedback
 * @returns Clipboard copy function and copied state
 */
export function useClipboard(): UseClipboardResult {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return {
    copyToClipboard,
    copied,
  };
}
