/**
 * Utility functions for color format conversions
 */

/**
 * Converts RGBA color values to hexadecimal format
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hexadecimal color string (e.g., "#FF5733")
 */
export function rgbaToHex(r: number, g: number, b: number): string {
  const toHex = (value: number): string => {
    const hex = Math.round(value).toString(16).toUpperCase();
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts RGBA color values to RGB string format
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns RGB color string (e.g., "RGB(255, 87, 51)")
 */
export function rgbaToRgbString(r: number, g: number, b: number): string {
  return `RGB(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

/**
 * Converts hexadecimal color string to RGB object
 * @param hex - Hexadecimal color string (with or without # prefix)
 * @returns RGB color object { r, g, b }
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse hex values
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return { r, g, b };
}
