import Row from "./Row";
import { NUM_ROWS, CELL_SIZE } from "../config/consts";

type GridProps = {
  guesses: string[][];
  colors: string[][];
  guess: string[];
  attempt: number;
};

const Grid = ({ guesses, guess, colors, attempt }: GridProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${NUM_ROWS}, ${CELL_SIZE}px)`,
        gridGap: 10,
      }}
    >
      {Array.from(Array(NUM_ROWS).keys()).map((rowIndex) => (
        <Row
          key={`row-${rowIndex}`}
          index={rowIndex}
          guess={rowIndex === attempt ? guess : guesses[rowIndex] ?? []}
          color={colors[rowIndex] ?? []}
        />
      ))}
    </div>
  );
};

export default Grid;
