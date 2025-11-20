import { memo } from "react";
import Row from "./Row";
import { NUM_ROWS } from "../config/consts";

type GridProps = {
    guesses: string[][];
    colors: string[][];
    guess: string[];
    attempt: number;
    isFlipping?: boolean;
    flippingRowIndex?: number | null;
};

const Grid = memo(({ guesses, guess, colors, attempt, isFlipping = false, flippingRowIndex = null }: GridProps) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateRows: `repeat(${NUM_ROWS}, 1fr)`,
                gridGap: "clamp(5px, 1vw, 10px)",
                width: "100%",
                maxWidth: "min(400px, 90vw)",
                margin: "0 auto",
            }}
            role="grid"
            aria-label="Wordle game grid"
        >
            {Array.from(Array(NUM_ROWS).keys()).map((rowIndex) => (
                <Row
                    key={`row-${rowIndex}`}
                    index={rowIndex}
                    guess={rowIndex === attempt ? guess : guesses[rowIndex] ?? []}
                    color={colors[rowIndex] ?? []}
                    isActive={rowIndex === attempt}
                    isFlipping={isFlipping && flippingRowIndex === rowIndex}
                />
            ))}
        </div>
    );
});

Grid.displayName = "Grid";

export default Grid;
