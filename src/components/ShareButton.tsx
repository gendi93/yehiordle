import { useState } from "react";
import { COLORS } from "../config/consts";
import { GameStatus } from "../config/types";

type ShareButtonProps = {
    status: GameStatus;
    attempts: number;
    guesses: string[][];
    colors: string[][];
};

export default function ShareButton({
    status,
    attempts,
    guesses,
    colors,
}: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const generateShareText = () => {
        const isWin = status === "won";
        const resultLine = `Yehiordle ${isWin ? attempts : "X"}/6\n\n`;

        const emojiGrid = guesses
            .map((guess, guessIndex) => {
                return guess
                    .map((_letter, letterIndex) => {
                        const color = colors[guessIndex]?.[letterIndex];
                        if (color === COLORS.Green) return "🟩";
                        if (color === COLORS.Yellow) return "🟨";
                        return "⬛";
                    })
                    .join("");
            })
            .join("\n");

        return resultLine + emojiGrid;
    };

    const handleShare = async () => {
        const text = generateShareText();

        if (navigator.share) {
            try {
                await navigator.share({
                    text,
                });
            } catch (error) {
                // User cancelled or error occurred
                copyToClipboard(text);
            }
        } else {
            copyToClipboard(text);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleShare}
            style={{
                padding: "12px 24px",
                backgroundColor: COLORS.Green,
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                minWidth: "120px",
            }}
        >
            {copied ? "Copied!" : "Share"}
        </button>
    );
}
