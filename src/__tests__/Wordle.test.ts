import { describe, expect, test } from "@jest/globals";
import { getDailyWord, getTodayDateString } from "../utils/dailyWord";
import { COLORS } from "../config/consts";
import { VALID_GUESSES } from "../config/words";

describe("Daily Word Generation", () => {
  test("should generate a word of length 5", () => {
    const word = getDailyWord();
    expect(word).toHaveLength(5);
  });

  test("should generate the same word for the same date", () => {
    const word1 = getDailyWord();
    const word2 = getDailyWord();
    expect(word1).toEqual(word2);
  });

  test("should return a valid date string", () => {
    const dateString = getTodayDateString();
    expect(dateString).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("Word Validation", () => {
  test("should validate common words", () => {
    expect(VALID_GUESSES["hello"]).toBe(true);
    expect(VALID_GUESSES["world"]).toBe(true);
    expect(VALID_GUESSES["test"]).toBeUndefined();
  });
});

describe("Color Constants", () => {
  test("should have valid color values", () => {
    expect(COLORS.Green).toBe("#538d4e");
    expect(COLORS.Yellow).toBe("#b59f3b");
    expect(COLORS.Grey).toBe("#3a3a3c");
    expect(COLORS.Black).toBe("#121213");
  });
});

describe("Game Logic - Color Assignment", () => {
  test("should assign green for correct position", () => {
    const word = ["h", "e", "l", "l", "o"];
    const guess = ["h", "e", "l", "l", "o"];
    const result: string[] = [];

    guess.forEach((letter, index) => {
      if (letter === word[index]) {
        result.push(COLORS.Green);
      }
    });

    expect(result).toEqual([
      COLORS.Green,
      COLORS.Green,
      COLORS.Green,
      COLORS.Green,
      COLORS.Green,
    ]);
  });

  test("should assign yellow for correct letter wrong position", () => {
    const word = ["h", "e", "l", "l", "o"];
    const guess = ["o", "h", "e", "l", "l"];
    const result: string[] = [];
    const newKeys: { [key: string]: string } = {};

    guess.forEach((letter, index) => {
      if (letter === word[index]) {
        newKeys[letter] = COLORS.Green;
        result.push(COLORS.Green);
      } else if (word.includes(letter)) {
        const countInWord = word.filter((x) => x === letter).length;
        const wordLetterMap = word.map((x) => (x === letter ? true : false));
        const guessLetterMap = guess.map((x) => (x === letter ? true : false));
        const correctLetterCount = wordLetterMap.reduce((acc, curr, idx) => {
          if (curr && curr === guessLetterMap[idx]) return acc + 1;
          else return acc + 0;
        }, 0);
        const firstInstance = guess.findIndex(
          (x, idx) => x === letter && word[idx] !== letter
        );
        if (countInWord > correctLetterCount && firstInstance === index) {
          if (newKeys?.[letter] !== COLORS.Green)
            newKeys[letter] = COLORS.Yellow;
          result.push(COLORS.Yellow);
        } else {
          result.push(COLORS.Grey);
        }
      } else {
        newKeys[letter] = COLORS.Grey;
        result.push(COLORS.Grey);
      }
    });

    // First letter 'o' should be yellow (in word but wrong position)
    expect(result[0]).toBe(COLORS.Yellow);
  });

  test("should assign grey for letters not in word", () => {
    const word = ["h", "e", "l", "l", "o"];
    const guess = ["a", "b", "c", "d", "e"];
    const result: string[] = [];

    guess.forEach((letter, index) => {
      if (letter === word[index]) {
        result.push(COLORS.Green);
      } else if (word.includes(letter)) {
        result.push(COLORS.Yellow);
      } else {
        result.push(COLORS.Grey);
      }
    });

    expect(result[0]).toBe(COLORS.Grey); // 'a' not in word
    expect(result[1]).toBe(COLORS.Grey); // 'b' not in word
    expect(result[2]).toBe(COLORS.Grey); // 'c' not in word
    expect(result[3]).toBe(COLORS.Grey); // 'd' not in word
    expect(result[4]).toBe(COLORS.Green); // 'e' in correct position
  });
});

describe("Win Detection", () => {
  test("should detect win when all letters match", () => {
    const word = ["h", "e", "l", "l", "o"];
    const guess = ["h", "e", "l", "l", "o"];
    const isWin = guess.every((letter, index) => letter === word[index]);
    expect(isWin).toBe(true);
  });

  test("should detect loss when not all letters match", () => {
    const word = ["h", "e", "l", "l", "o"];
    const guess = ["h", "e", "l", "l", "a"];
    const isWin = guess.every((letter, index) => letter === word[index]);
    expect(isWin).toBe(false);
  });
});
