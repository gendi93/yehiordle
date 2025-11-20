import { useCallback, memo } from "react";
import { KEYBOARD_LETTERS } from "../config/consts";

type KeyboardProps = {
    keys: { [key: string]: string };
    checkGuess: () => void;
    handleInput: (char: string) => void;
    shouldShake?: boolean;
    shakeKey?: number;
};

const Keyboard = memo(({ keys, handleInput, shouldShake = false, shakeKey = 0 }: KeyboardProps) => {
    // Use shakeKey to force re-render when animation should trigger

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
            key={`keyboard-${shakeKey}`}
            className={shouldShake ? "keyboard-shake" : ""}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                width: "100%",
                maxWidth: "min(600px, 95vw)",
                padding: "0 10px",
                margin: "0 auto",
            }}
            role="group"
            aria-label="Virtual keyboard"
        >
            {KEYBOARD_LETTERS.map((row, rowIndex) => {
                const bottomRow = rowIndex === 2;
                return (
                    <div
                        key={`keyboardRow-${rowIndex}`}
                        style={{
                            display: "grid",
                            gridTemplateColumns: `${bottomRow ? "65px" : ""} repeat(${bottomRow ? row.length - 2 : row.length
                                }, minmax(35px, 43px)) ${bottomRow ? "65px" : ""}`,
                            gridGap: 5,
                            height: "58px",
                            width: "100%",
                            maxWidth: "100%",
                            justifyContent: "center",
                        }}
                    >
                        {row.map((key, keyIndex) => {
                            const enterKey = bottomRow && keyIndex === 0;
                            const keyLabel = key === "<" ? "Backspace" : key === "enter" ? "Enter" : key.toUpperCase();
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
                                        transition: "background-color 0.2s ease, transform 0.1s ease",
                                    }}
                                    data-char={key === "<" ? "backspace" : key}
                                    onClick={handleClick}
                                    aria-label={keyLabel}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.transform = "scale(0.95)";
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                >
                                    {key === "<" ? "⌫" : key.toUpperCase()}
                                </button>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
});

Keyboard.displayName = "Keyboard";

export default Keyboard;
