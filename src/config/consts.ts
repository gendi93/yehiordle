import { createContext } from "react";
export const LETTERS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export const KEYBOARD_LETTERS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "<"],
];

export const NUM_ROWS = 6;
export const NUM_COLS = 5;
export const CELL_SIZE = 60;

export enum COLORS {
  Green = "#538d4e",
  Grey = "#3a3a3c",
  Yellow = "#b59f3b",
  Black = "#121213",
}

const game: {
  attempt: number;
  activeRowRef: React.MutableRefObject<null> | null;
} = {
  attempt: 0,
  activeRowRef: null,
};
export const WORDLE_CONTEXT = createContext(game);
