// Jest setup for HueGrab
// Mock Expo modules that cause issues in tests
jest.mock('expo', () => ({
  ...jest.requireActual('expo'),
}));
