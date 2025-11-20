import { useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext";

type SoundType = "key" | "correct" | "wrong" | "win";

const SOUND_DURATIONS: Record<SoundType, number> = {
  key: 50,
  correct: 100,
  wrong: 200,
  win: 500,
};

export function useSound() {
  const { settings } = useTheme();

  const playSound = useCallback(
    (type: SoundType) => {
      if (!settings.soundEnabled) return;

      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for different sounds
      const frequencies: Record<SoundType, number> = {
        key: 400,
        correct: 600,
        wrong: 200,
        win: 800,
      };

      oscillator.frequency.value = frequencies[type];
      oscillator.type = type === "wrong" ? "sawtooth" : "sine";

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + SOUND_DURATIONS[type] / 1000
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(
        audioContext.currentTime + SOUND_DURATIONS[type] / 1000
      );
    },
    [settings.soundEnabled]
  );

  return { playSound };
}
