import { useEffect, useState, memo } from "react";
import { COLORS } from "../config/consts";

type CellProps = {
    letter: string;
    color: string;
    isFlipping?: boolean;
    delay?: number;
};

const Cell = memo(({ letter, color, isFlipping = false, delay = 0 }: CellProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [flipKey, setFlipKey] = useState(0);

    useEffect(() => {
        if (isFlipping) {
            // Reset animation state
            setIsAnimating(false);
            setFlipKey((prev) => prev + 1);
            // Start animation after delay
            const timer = setTimeout(() => {
                setIsAnimating(true);
            }, delay);
            return () => clearTimeout(timer);
        } else {
            setIsAnimating(false);
        }
    }, [isFlipping, delay]);

    return (
        <div
            key={`cell-${flipKey}`}
            className={isAnimating ? "cell-flip" : ""}
            style={{
                width: "100%",
                aspectRatio: "1",
                margin: 0,
                padding: 0,
                background: color,
                textAlign: "center",
                color: "white",
                fontSize: "clamp(24px, 5vw, 40px)",
                border: `2px solid ${COLORS.Grey}`,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transformStyle: "preserve-3d",
                transition: "background-color 0.3s ease, border-color 0.3s ease",
            }}
            role="gridcell"
            aria-label={letter ? `Letter ${letter.toUpperCase()}, ${color === COLORS.Green ? "correct position" : color === COLORS.Yellow ? "wrong position" : "not in word"}` : "Empty cell"}
        >
            {letter.toUpperCase()}
        </div>
    );
});

Cell.displayName = "Cell";

export default Cell;
