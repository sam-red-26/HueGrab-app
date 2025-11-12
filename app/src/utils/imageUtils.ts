/**
 * Utility functions for image processing and color extraction
 */

import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { rgbaToHex, rgbaToRgbString } from './colorUtils';
import { ColorResult, RGBAColor } from '../types/color';

/**
 * Extracts the color at specific coordinates from a camera picture
 * @param imageUri - URI of the captured image
 * @param x - X coordinate (0-1 normalized or pixel value)
 * @param y - Y coordinate (0-1 normalized or pixel value)
 * @param imageWidth - Width of the image
 * @param imageHeight - Height of the image
 * @returns ColorResult with HEX, RGB formats
 */
export async function extractColorFromImage(
  imageUri: string,
  x: number,
  y: number,
  imageWidth: number,
  imageHeight: number
): Promise<ColorResult> {
  try {
    // Clamp coordinates to image bounds
    const clampedX = Math.max(0, Math.min(imageWidth - 1, Math.round(x)));
    const clampedY = Math.max(0, Math.min(imageHeight - 1, Math.round(y)));

    // Crop a 1x1 pixel at the target coordinate
    const result = await manipulateAsync(
      imageUri,
      [
        {
          crop: {
            originX: clampedX,
            originY: clampedY,
            width: 1,
            height: 1,
          },
        },
      ],
      { format: SaveFormat.PNG }
    );

    // For now, we'll use a simplified approach
    // In a real implementation, we'd read the pixel data from the cropped image
    // This is a placeholder that will work with the camera integration
    const pixelColor = await getPixelColorFromUri(result.uri);

    return convertRGBAToColorResult(pixelColor);
  } catch (error) {
    console.error('Error extracting color:', error);
    throw new Error('Failed to extract color from image');
  }
}

/**
 * Gets pixel color from a 1x1 image URI
 * Note: This is a simplified implementation for the MVP
 * A production version would use canvas or native modules for actual pixel reading
 */
async function getPixelColorFromUri(uri: string): Promise<RGBAColor> {
  // This is a placeholder implementation
  // In a real app, you'd use expo-gl or react-native-image-colors
  // For MVP, we'll return a mock color that can be replaced with actual implementation
  
  // TODO: Implement actual pixel reading using expo-gl or native module
  console.warn('Using mock pixel color - implement actual pixel reading for production');
  
  return {
    r: 128,
    g: 128,
    b: 128,
    a: 255,
  };
}

/**
 * Gets pixel color from raw RGBA pixel data
 * @param pixelData - Uint8ClampedArray with RGBA values
 * @returns RGBA color object
 */
export function getPixelColor(pixelData: Uint8ClampedArray): RGBAColor {
  return {
    r: pixelData[0],
    g: pixelData[1],
    b: pixelData[2],
    a: pixelData[3],
  };
}

/**
 * Converts RGBA color to ColorResult format
 */
export function convertRGBAToColorResult(rgba: RGBAColor): ColorResult {
  return {
    hex: rgbaToHex(rgba.r, rgba.g, rgba.b),
    rgb: rgbaToRgbString(rgba.r, rgba.g, rgba.b),
    rgbValues: {
      r: rgba.r,
      g: rgba.g,
      b: rgba.b,
    },
  };
}

/**
 * Translates screen tap coordinates to image space
 * @param screenX - X coordinate in screen space
 * @param screenY - Y coordinate in screen space
 * @param screenWidth - Width of the screen/view
 * @param screenHeight - Height of the screen/view
 * @param imageWidth - Width of the captured image
 * @param imageHeight - Height of the captured image
 * @returns Translated coordinates in image space
 */
export function translateCoordinates(
  screenX: number,
  screenY: number,
  screenWidth: number,
  screenHeight: number,
  imageWidth: number,
  imageHeight: number
): { x: number; y: number } {
  const scaleX = imageWidth / screenWidth;
  const scaleY = imageHeight / screenHeight;

  return {
    x: Math.round(screenX * scaleX),
    y: Math.round(screenY * scaleY),
  };
}
