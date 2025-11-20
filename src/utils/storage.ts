import { GameState, Statistics, Settings } from "../config/types";
import { getTodayDateString } from "./dailyWord";

const STORAGE_KEYS = {
  GAME_STATE: "yehiordle_game_state",
  STATISTICS: "yehiordle_statistics",
  SETTINGS: "yehiordle_settings",
} as const;

export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save game state:", error);
  }
}

export function loadGameState(): GameState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    if (!stored) return null;
    
    const state = JSON.parse(stored) as GameState;
    
    // Check if the saved state is for today
    if (state.date !== getTodayDateString()) {
      return null; // State is from a different day
    }
    
    return state;
  } catch (error) {
    console.error("Failed to load game state:", error);
    return null;
  }
}

export function clearGameState(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
  } catch (error) {
    console.error("Failed to clear game state:", error);
  }
}

export function saveStatistics(stats: Statistics): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
  } catch (error) {
    console.error("Failed to save statistics:", error);
  }
}

export function loadStatistics(): Statistics {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STATISTICS);
    if (!stored) {
      return getDefaultStatistics();
    }
    return JSON.parse(stored) as Statistics;
  } catch (error) {
    console.error("Failed to load statistics:", error);
    return getDefaultStatistics();
  }
}

function getDefaultStatistics(): Statistics {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    },
    lastPlayedDate: null,
  };
}

export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
}

export function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!stored) {
      return getDefaultSettings();
    }
    return JSON.parse(stored) as Settings;
  } catch (error) {
    console.error("Failed to load settings:", error);
    return getDefaultSettings();
  }
}

function getDefaultSettings(): Settings {
  return {
    theme: "dark",
    soundEnabled: false,
    hapticEnabled: false,
    hardMode: false,
  };
}
