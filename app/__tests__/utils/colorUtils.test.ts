import { rgbaToHex, rgbaToRgbString, hexToRgb } from '../../src/utils/colorUtils';

describe('colorUtils', () => {
  describe('rgbaToHex', () => {
    it('converts red color to HEX format', () => {
      expect(rgbaToHex(255, 0, 0)).toBe('#FF0000');
    });

    it('converts green color to HEX format', () => {
      expect(rgbaToHex(0, 255, 0)).toBe('#00FF00');
    });

    it('converts blue color to HEX format', () => {
      expect(rgbaToHex(0, 0, 255)).toBe('#0000FF');
    });

    it('converts orange color to HEX format', () => {
      expect(rgbaToHex(255, 87, 51)).toBe('#FF5733');
    });

    it('converts black to HEX format', () => {
      expect(rgbaToHex(0, 0, 0)).toBe('#000000');
    });

    it('converts white to HEX format', () => {
      expect(rgbaToHex(255, 255, 255)).toBe('#FFFFFF');
    });

    it('handles single-digit hex values with padding', () => {
      expect(rgbaToHex(1, 2, 3)).toBe('#010203');
    });
  });

  describe('rgbaToRgbString', () => {
    it('formats red color as RGB string', () => {
      expect(rgbaToRgbString(255, 0, 0)).toBe('RGB(255, 0, 0)');
    });

    it('formats orange color as RGB string', () => {
      expect(rgbaToRgbString(255, 87, 51)).toBe('RGB(255, 87, 51)');
    });

    it('formats black as RGB string', () => {
      expect(rgbaToRgbString(0, 0, 0)).toBe('RGB(0, 0, 0)');
    });

    it('formats white as RGB string', () => {
      expect(rgbaToRgbString(255, 255, 255)).toBe('RGB(255, 255, 255)');
    });
  });

  describe('hexToRgb', () => {
    it('converts red HEX to RGB object', () => {
      expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('converts green HEX to RGB object', () => {
      expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('converts blue HEX to RGB object', () => {
      expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
    });

    it('converts orange HEX to RGB object', () => {
      expect(hexToRgb('#FF5733')).toEqual({ r: 255, g: 87, b: 51 });
    });

    it('converts black HEX to RGB object', () => {
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('converts white HEX to RGB object', () => {
      expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('handles HEX without # prefix', () => {
      expect(hexToRgb('FF5733')).toEqual({ r: 255, g: 87, b: 51 });
    });

    it('handles lowercase HEX', () => {
      expect(hexToRgb('#ff5733')).toEqual({ r: 255, g: 87, b: 51 });
    });
  });
});
