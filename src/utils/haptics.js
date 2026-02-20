// Haptic feedback utilities

export const HAPTIC_TYPES = {
  LIGHT: 'light',
  MEDIUM: 'medium',
  HEAVY: 'heavy',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};

export function triggerHaptic(type = HAPTIC_TYPES.LIGHT) {
  // Check if device supports vibration
  if (!navigator.vibrate) return;

  const patterns = {
    [HAPTIC_TYPES.LIGHT]: 10,
    [HAPTIC_TYPES.MEDIUM]: 20,
    [HAPTIC_TYPES.HEAVY]: 30,
    [HAPTIC_TYPES.SUCCESS]: [10, 50, 10],
    [HAPTIC_TYPES.ERROR]: [30, 100, 30],
    [HAPTIC_TYPES.WARNING]: [20, 100, 20, 100, 20]
  };

  try {
    navigator.vibrate(patterns[type]);
  } catch (e) {
    // Ignore errors
  }
}

export function useHaptic() {
  const haptic = (type) => triggerHaptic(type);
  
  return {
    light: () => haptic(HAPTIC_TYPES.LIGHT),
    medium: () => haptic(HAPTIC_TYPES.MEDIUM),
    heavy: () => haptic(HAPTIC_TYPES.HEAVY),
    success: () => haptic(HAPTIC_TYPES.SUCCESS),
    error: () => haptic(HAPTIC_TYPES.ERROR),
    warning: () => haptic(HAPTIC_TYPES.WARNING)
  };
}

export default { triggerHaptic, useHaptic, HAPTIC_TYPES };
