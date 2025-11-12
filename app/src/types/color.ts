/**
 * Represents a captured color result with multiple format representations
 */
export interface ColorResult {
  /** Hexadecimal color code (e.g., "#FF5733") */
  hex: string;
  /** RGB color string (e.g., "RGB(255, 87, 51)") */
  rgb: string;
  /** Individual RGB color components */
  rgbValues: {
    r: number;
    g: number;
    b: number;
  };
}

/**
 * RGBA color components
 */
export interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}
