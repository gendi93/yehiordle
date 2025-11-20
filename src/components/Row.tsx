import { useRef, memo } from "react";
import Cell from "./Cell";
import { NUM_COLS, COLORS } from "../config/consts";
import { useTheme } from "../contexts/ThemeContext";

type RowProps = {
    guess: string[];
    color: string[];
    index: number;
    isActive?: boolean;
    isFlipping?: boolean;
};

const Row = memo(({ guess, color, index, isFlipping = false }: RowProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            ref={ref}
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${NUM_COLS}, 1fr)`,
                gridGap: "clamp(5px, 1vw, 10px)",
                width: "100%",
            }}
            role="row"
            aria-label={`Guess row ${index + 1}`}
        >
            {Array.from(Array(NUM_COLS).keys()).map((cellIndex) => (
                <Cell
                    key={`cell-${cellIndex}-${index}`}
                    letter={guess[cellIndex] ?? ""}
                    color={color[cellIndex] ?? (isDark ? COLORS.Black : COLORS.White)}
                    isFlipping={isFlipping}
                    delay={cellIndex * 100}
                />
            ))}
        </div>
    );
});

Row.displayName = "Row";

export default Row;
