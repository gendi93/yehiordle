import { useState, useCallback, useEffect } from "react";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import { LETTERS, COLORS } from "./config/consts";
import { WORDS, VALID_GUESSES } from "./config/words";

const WORD = WORDS[Math.floor(Math.random() * WORDS.length)].split("");
console.log(WORD);

const Wordle = () => {
  const [guesses, setGuesses] = useState([] as string[][]);
  const [guess, setGuess] = useState([] as string[]);
  const [colors, setColors] = useState([] as string[][]);
  const [activeLetter, setActiveLetter] = useState(0);
  const [keys, setKeys] = useState({} as { [key: string]: string });

  const triggerAnimation = useCallback(() => {
    console.log("nope");
  }, []);

  const checkGuess = useCallback(() => {
    if (guess.length < 5) return;
    if (!VALID_GUESSES[guess.join("")]) {
      triggerAnimation();
      return;
    }

    const newGuesses = [...guesses];
    const newColors = [...colors];
    const newColor = [] as string[];
    const newKeys = { ...keys };

    guess.forEach((letter, index) => {
      if (letter === WORD[index]) {
        newKeys[letter] = COLORS.Green;
        newColor.push(COLORS.Green);
      } else if (WORD.includes(letter)) {
        const countInWord = WORD.filter((x) => x === letter).length;
        const wordLetterMap = WORD.map((x) => (x === letter ? true : false));
        const guessLetterMap = guess.map((x) => (x === letter ? true : false));
        const correctLetterCount = wordLetterMap.reduce((acc, curr, index) => {
          if (curr && curr === guessLetterMap[index]) return acc + 1;
          else return acc + 0;
        }, 0);
        const firstInstance = guess.findIndex(
          (x, index) => x === letter && WORD[index] !== letter
        );
        if (countInWord > correctLetterCount && firstInstance === index) {
          if (newKeys?.[letter] !== COLORS.Green)
            newKeys[letter] = COLORS.Yellow;
          newColor.push(COLORS.Yellow);
        } else {
          newColor.push(COLORS.Grey);
        }
      } else {
        newKeys[letter] = COLORS.Grey;
        newColor.push(COLORS.Grey);
      }
    });
    newGuesses.push(guess);
    newColors.push(newColor);
    setGuesses(newGuesses);
    setColors(newColors);
    setKeys(newKeys);

    setGuess([]);
  }, [guess, guesses, colors, keys, triggerAnimation]);

  const handleInput = useCallback(
    (char: string) => {
      if (char === "enter") {
        checkGuess();
      } else {
        const newGuess = [...guess];
        if (char === "backspace") {
          newGuess.pop();
          setActiveLetter(activeLetter - 1);
        } else if (guess.length < 5) {
          newGuess.push(char);
          setActiveLetter(activeLetter + 1);
        }
        setGuess(newGuess);
      }
    },
    [activeLetter, guess, checkGuess]
  );

  const updateGuess = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        !(
          LETTERS.includes(e.key) ||
          e.key.toLowerCase() === "backspace" ||
          e.key.toLowerCase() === "enter"
        )
      )
        return;

      handleInput(e.key.toLowerCase());
    },
    [handleInput]
  );

  useEffect(() => {
    document.addEventListener("keydown", updateGuess);

    return () => {
      document.removeEventListener("keydown", updateGuess);
    };
  }, [updateGuess]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr auto auto",
        placeItems: "center",
        gridGap: 20,
        background: COLORS.Black,
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        lineHeight: 1.5,
        fontSynthesis: "none",
        textRendering: "optimizeLegibility",
        width: "100vw",
      }}
    >
      <Grid
        guesses={guesses}
        guess={guess}
        colors={colors}
        attempt={guesses.length}
      />
      <Keyboard keys={keys} checkGuess={checkGuess} handleInput={handleInput} />
    </div>
  );
};

export default Wordle;
