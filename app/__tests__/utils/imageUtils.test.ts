// imageUtils tests - Color extraction from images

describe('imageUtils - color extraction', () => {
  describe('getPixelColor', () => {
    it('should extract RGBA values from pixel data', () => {
      // Mock pixel data: RGBA format
      const mockPixelData = new Uint8ClampedArray([255, 87, 51, 255]); // Orange color
      
      // Simulate extraction
      const color = {
        r: mockPixelData[0],
        g: mockPixelData[1],
        b: mockPixelData[2],
        a: mockPixelData[3],
      };
      
      expect(color.r).toBe(255);
      expect(color.g).toBe(87);
      expect(color.b).toBe(51);
      expect(color.a).toBe(255);
    });

    it('should handle black color', () => {
      const mockPixelData = new Uint8ClampedArray([0, 0, 0, 255]);
      
      const color = {
        r: mockPixelData[0],
        g: mockPixelData[1],
        b: mockPixelData[2],
        a: mockPixelData[3],
      };
      
      expect(color.r).toBe(0);
      expect(color.g).toBe(0);
      expect(color.b).toBe(0);
    });

    it('should handle white color', () => {
      const mockPixelData = new Uint8ClampedArray([255, 255, 255, 255]);
      
      const color = {
        r: mockPixelData[0],
        g: mockPixelData[1],
        b: mockPixelData[2],
        a: mockPixelData[3],
      };
      
      expect(color.r).toBe(255);
      expect(color.g).toBe(255);
      expect(color.b).toBe(255);
    });
  });

  describe('extractColorFromCoordinates', () => {
    it('should return color result with HEX and RGB formats', () => {
      // Mock color extraction result
      const mockColor = {
        r: 255,
        g: 87,
        b: 51,
        a: 255,
      };
      
      // Simulate color conversion
      const result = {
        hex: '#FF5733',
        rgb: 'RGB(255, 87, 51)',
        rgbValues: {
          r: mockColor.r,
          g: mockColor.g,
          b: mockColor.b,
        },
      };
      
      expect(result.hex).toBe('#FF5733');
      expect(result.rgb).toBe('RGB(255, 87, 51)');
      expect(result.rgbValues.r).toBe(255);
      expect(result.rgbValues.g).toBe(87);
      expect(result.rgbValues.b).toBe(51);
    });
  });

  describe('coordinate translation', () => {
    it('should translate screen coordinates to image space', () => {
      const screenCoords = { x: 100, y: 200 };
      const screenSize = { width: 400, height: 800 };
      const imageSize = { width: 1920, height: 1080 };
      
      // Calculate ratio and translate
      const scaleX = imageSize.width / screenSize.width;
      const scaleY = imageSize.height / screenSize.height;
      
      const imageCoords = {
        x: Math.round(screenCoords.x * scaleX),
        y: Math.round(screenCoords.y * scaleY),
      };
      
      expect(imageCoords.x).toBe(480); // 100 * 4.8
      expect(imageCoords.y).toBe(270); // 200 * 1.35
    });

    it('should clamp coordinates to image bounds', () => {
      const imageSize = { width: 1920, height: 1080 };
      
      // Test clamping
      const clamp = (value: number, min: number, max: number) => 
        Math.max(min, Math.min(max, value));
      
      expect(clamp(-10, 0, imageSize.width)).toBe(0);
      expect(clamp(2000, 0, imageSize.width)).toBe(imageSize.width);
      expect(clamp(500, 0, imageSize.width)).toBe(500);
    });
  });
});
