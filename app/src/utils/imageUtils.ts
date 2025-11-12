/**
 * Utility functions for image processing and color extraction
 */

import * as ImageManipulator from 'expo-image-manipulator';
import ImageColors from 'react-native-image-colors';
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

    // Get the pixel color at the specified coordinates
    const pixelColor = await getPixelColorFromUri(
      imageUri,
      clampedX,
      clampedY,
      imageWidth,
      imageHeight
    );

    return convertRGBAToColorResult(pixelColor);
  } catch (error) {
    console.error('Error extracting color:', error);
    throw new Error('Failed to extract color from image');
  }
}

/**
 * Gets pixel color from an image at specific coordinates
 * Uses expo-image-manipulator to crop a small area and react-native-image-colors to extract the color
 */
async function getPixelColorFromUri(
  uri: string,
  x: number,
  y: number,
  imageWidth: number,
  imageHeight: number
): Promise<RGBAColor> {
  try {
    // Ensure coordinates are within bounds
    const clampedX = Math.max(0, Math.min(Math.floor(x), imageWidth - 1));
    const clampedY = Math.max(0, Math.min(Math.floor(y), imageHeight - 1));

    // Crop a small area around the target pixel (3x3 to be safe)
    const cropSize = 3;
    const cropX = Math.max(0, clampedX - Math.floor(cropSize / 2));
    const cropY = Math.max(0, clampedY - Math.floor(cropSize / 2));
    
    const croppedImage = await ImageManipulator.manipulateAsync(
      uri,
      [
        {
          crop: {
            originX: cropX,
            originY: cropY,
            width: cropSize,
            height: cropSize,
          },
        },
      ],
      { format: ImageManipulator.SaveFormat.PNG }
    );

    // Extract the dominant color from this tiny crop
    const result = await ImageColors.getColors(croppedImage.uri, {
      fallback: '#808080',
      cache: false,
      key: `${uri}-${clampedX}-${clampedY}`,
    });

    let hexColor = '#808080';
    
    if (result.platform === 'android') {
      hexColor = result.dominant;
    } else if (result.platform === 'ios') {
      hexColor = result.primary;
    } else if (result.platform === 'web') {
      hexColor = result.dominant;
    }

    // Convert hex to RGB
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b, a: 255 };
  } catch (error) {
    console.error('Error extracting pixel color:', error);
    return { r: 128, g: 128, b: 128, a: 255 };
  }
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
 * @param tapPosition - Tap coordinates {x, y}
 * @param screenDimensions - Screen dimensions {width, height}
 * @param imageDimensions - Image dimensions {width, height}
 * @returns Translated coordinates in image space
 */
export function translateTapToImageCoords(
  tapPosition: { x: number; y: number },
  screenDimensions: { width: number; height: number },
  imageDimensions: { width: number; height: number }
): { x: number; y: number } {
  const scaleX = imageDimensions.width / screenDimensions.width;
  const scaleY = imageDimensions.height / screenDimensions.height;

  return {
    x: Math.round(tapPosition.x * scaleX),
    y: Math.round(tapPosition.y * scaleY),
  };
}

/**
 * @deprecated Use translateTapToImageCoords instead
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
