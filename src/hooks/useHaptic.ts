import { useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext";

type HapticType = "light" | "medium" | "heavy" | "success" | "error";

export function useHaptic() {
  const { settings } = useTheme();

  const triggerHaptic = useCallback(
    (type: HapticType) => {
      if (!settings.hapticEnabled || !navigator.vibrate) return;

      const patterns: Record<HapticType, number | number[]> = {
        light: 10,
        medium: 20,
        heavy: 30,
        success: [10, 50, 10],
        error: [20, 50, 20, 50, 20],
      };

      navigator.vibrate(patterns[type]);
    },
    [settings.hapticEnabled]
  );

  return { triggerHaptic };
}
