import * as Haptics from 'expo-haptics';

export function useHaptics() {
  const triggerLight = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.error('Haptic feedback error:', error);
    }
  };

  const triggerMedium = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.error('Haptic feedback error:', error);
    }
  };

  const triggerSuccess = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('Haptic feedback error:', error);
    }
  };

  const triggerError = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      console.error('Haptic feedback error:', error);
    }
  };

  return {
    triggerLight,
    triggerMedium,
    triggerSuccess,
    triggerError,
  };
}
