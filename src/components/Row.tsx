import { useContext, useRef, useEffect } from "react";

import Cell from "./Cell";
import { NUM_COLS, CELL_SIZE, COLORS, WORDLE_CONTEXT } from "../config/consts";

type RowProps = {
  guess: string[];
  color: string[];
  index: number;
};

const Row = ({ guess, color, index }: RowProps) => {
  const ref = useRef(null);
  const context = useContext(WORDLE_CONTEXT);
  const { attempt, activeRowRef } = context;

  useEffect(() => {
    if (index === attempt && activeRowRef !== ref) {
      context.activeRowRef = ref;
    }
  }, [attempt, activeRowRef, index, context]);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${NUM_COLS}, ${CELL_SIZE}px)`,
        gridGap: 10,
      }}
    >
      {Array.from(Array(NUM_COLS).keys()).map((cellIndex) => (
        <Cell
          key={`cell-${cellIndex}`}
          letter={guess[cellIndex] ?? ""}
          color={color[cellIndex] ?? COLORS.Black}
        />
      ))}
    </div>
  );
};

export default Row;
