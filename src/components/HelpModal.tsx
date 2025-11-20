import Modal from "./Modal";
import { COLORS } from "../config/consts";

export default function HelpModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="How to Play">
            <div style={{ color: "white", lineHeight: "1.6" }}>
                <div style={{ marginBottom: "24px" }}>
                    <p style={{ marginBottom: "16px" }}>
                        Guess the <strong>YEHIORDLE</strong> in 6 tries.
                    </p>
                    <p style={{ marginBottom: "16px" }}>
                        Each guess must be a valid 5-letter word. Hit the enter button to
                        submit.
                    </p>
                    <p style={{ marginBottom: "16px" }}>
                        After each guess, the color of the tiles will change to show how
                        close your guess was to the word.
                    </p>
                </div>

                <div style={{ marginBottom: "24px" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "12px",
                        }}
                    >
                        <div
                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: COLORS.Green,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "20px",
                            }}
                        >
                            W
                        </div>
                        <div>
                            <strong>Green</strong> - The letter is in the word and in the
                            correct spot.
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "12px",
                        }}
                    >
                        <div
                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: COLORS.Yellow,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "20px",
                            }}
                        >
                            W
                        </div>
                        <div>
                            <strong>Yellow</strong> - The letter is in the word but in the
                            wrong spot.
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <div
                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: COLORS.Grey,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "20px",
                            }}
                        >
                            W
                        </div>
                        <div>
                            <strong>Grey</strong> - The letter is not in the word in any
                            spot.
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
    );
}
