import { useCallback } from "react";

import { KEYBOARD_LETTERS } from "../config/consts";

type KeyboardProps = {
  keys: { [key: string]: string };
  checkGuess: () => void;
  handleInput: (char: string) => void;
};

const Keyboard = ({ keys, handleInput }: KeyboardProps) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const char = (e.target as HTMLButtonElement)?.dataset.char;

      if (char) handleInput(char);
      return;
    },
    [handleInput]
  );

  return (
    <div
      style={{
        display: "grid",
        gridGap: 10,
        gridTemplateRows: `repeat(${KEYBOARD_LETTERS.length}, 58px)`,
        placeItems: "center",
      }}
    >
      {KEYBOARD_LETTERS.map((row, rowIndex) => {
        const bottomRow = rowIndex === 2;
        return (
          <div
            key={`keyboardRow-${rowIndex}`}
            style={{
              display: "grid",
              gridTemplateColumns: `${bottomRow ? "65px" : ""} repeat(${
                bottomRow ? row.length - 2 : row.length
              }, 43px) ${bottomRow ? "65px" : ""}`,
              gridGap: 5,
              height: "100%",
            }}
          >
            {row.map((key, keyIndex) => {
              const enterKey = bottomRow && keyIndex === 0;
              return (
                <button
                  key={`keyboardKey-${keyIndex}`}
                  style={{
                    height: "100%",
                    margin: 0,
                    padding: 0,
                    background: keys[key] ?? "#818384",
                    textAlign: "center",
                    color: "white",
                    fontSize: `${enterKey ? "12px" : "20px"}`,
                    fontWeight: "bold",
                    borderRadius: 5,
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                    outline: "none",
                    border: "none",
                  }}
                  data-char={key === "<" ? "backspace" : key}
                  onClick={handleClick}
                >
                  {key.toUpperCase()}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
