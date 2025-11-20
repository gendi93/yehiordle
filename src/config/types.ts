export type GameStatus = "playing" | "won" | "lost";

export type Theme = "dark" | "light";

export interface GameState {
  guesses: string[][];
  colors: string[][];
  keys: { [key: string]: string };
  status: GameStatus;
  currentWord: string;
  date: string;
  hardMode: boolean;
}

export interface Statistics {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
  };
  lastPlayedDate: string | null;
}

export interface Settings {
  theme: Theme;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  hardMode: boolean;
}

export type CellColor = "green" | "yellow" | "grey" | "black";
