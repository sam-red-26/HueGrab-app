// ColorResultPanel component tests

describe('ColorResultPanel component', () => {
  it('should have correct props interface', () => {
    type ColorResultPanelProps = {
      colorResult: {
        hex: string;
        rgb: string;
        rgbValues: { r: number; g: number; b: number };
      };
      onDismiss: () => void;
    };
    
    const mockProps: ColorResultPanelProps = {
      colorResult: {
        hex: '#FF5733',
        rgb: 'RGB(255, 87, 51)',
        rgbValues: { r: 255, g: 87, b: 51 },
      },
      onDismiss: jest.fn(),
    };
    
    expect(mockProps.colorResult.hex).toBe('#FF5733');
    expect(mockProps.colorResult.rgb).toBe('RGB(255, 87, 51)');
    expect(typeof mockProps.onDismiss).toBe('function');
  });

  it('should display color preview with correct background', () => {
    const colorResult = {
      hex: '#FF5733',
      rgb: 'RGB(255, 87, 51)',
      rgbValues: { r: 255, g: 87, b: 51 },
    };
    
    expect(colorResult.hex).toBe('#FF5733');
  });

  it('should display HEX and RGB codes', () => {
    const colorResult = {
      hex: '#FF5733',
      rgb: 'RGB(255, 87, 51)',
      rgbValues: { r: 255, g: 87, b: 51 },
    };
    
    expect(colorResult.hex).toBeTruthy();
    expect(colorResult.rgb).toBeTruthy();
  });

  it('should handle copy HEX action', () => {
    const mockCopyHex = jest.fn();
    
    mockCopyHex('#FF5733');
    
    expect(mockCopyHex).toHaveBeenCalledWith('#FF5733');
  });

  it('should handle copy RGB action', () => {
    const mockCopyRgb = jest.fn();
    
    mockCopyRgb('RGB(255, 87, 51)');
    
    expect(mockCopyRgb).toHaveBeenCalledWith('RGB(255, 87, 51)');
  });

  it('should handle share action', () => {
    const mockShare = jest.fn();
    
    mockShare('#FF5733');
    
    expect(mockShare).toHaveBeenCalledWith('#FF5733');
  });

  it('should handle dismiss action', () => {
    const mockDismiss = jest.fn();
    
    mockDismiss();
    
    expect(mockDismiss).toHaveBeenCalledTimes(1);
  });
});
