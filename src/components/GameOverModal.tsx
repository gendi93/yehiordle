import Modal from "./Modal";
import { COLORS } from "../config/consts";
import { GameStatus } from "../config/types";
import ShareButton from "./ShareButton";

type GameOverModalProps = {
    isOpen: boolean;
    onClose: () => void;
    status: GameStatus;
    word: string;
    attempts: number;
    guesses: string[][];
    colors: string[][];
};

export default function GameOverModal({
    isOpen,
    onClose,
    status,
    word,
    attempts,
    guesses,
    colors,
}: GameOverModalProps) {
    const isWin = status === "won";

    return (
        <Modal isOpen={isOpen} onClose={onClose} showCloseButton={true}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <div
                    style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        color: isWin ? COLORS.Green : "white",
                    }}
                >
                    {isWin ? "🎉 Congratulations! 🎉" : "Better luck next time!"}
                </div>

                <div style={{ color: "white", fontSize: "18px", textAlign: "center" }}>
                    {isWin ? (
                        <>
                            You guessed the word in <strong>{attempts}</strong>{" "}
                            {attempts === 1 ? "try" : "tries"}!
                        </>
                    ) : (
                        <>
                            The word was <strong>{word.toUpperCase()}</strong>
                        </>
                    )}
                </div>

                <ShareButton
                    status={status}
                    attempts={attempts}
                    guesses={guesses}
                    colors={colors}
                />

                <button
                    onClick={onClose}
                    style={{
                        padding: "12px 24px",
                        backgroundColor: COLORS.Green,
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
