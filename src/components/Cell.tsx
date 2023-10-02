import { CELL_SIZE, COLORS } from "../config/consts";

type CellProps = {
  letter: string;
  color: string;
};

const Cell = ({ letter, color }: CellProps) => {
  return (
    <div
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
        margin: 0,
        padding: 0,
        background: color,
        textAlign: "center",
        color: "white",
        fontSize: 40,
        border: `2px solid ${color === COLORS.Black ? COLORS.Grey : color}`,
        fontWeight: "bold",
      }}
    >
      {letter.toUpperCase()}
    </div>
  );
};

export default Cell;
