import { COLORS } from "../config/consts";

const Header = () => {
  return (
    <div
      style={{
        borderBottom: `1px solid ${COLORS.Grey}`,
        width: "100vw",
        padding: 0,
        height: 65,
        marginBottom: 10,
        fontFamily: "'Roboto Slab', serif",
        fontSize: 35,
        display: "grid",
        placeItems: "center",
      }}
    >
      YEHIORDLE
    </div>
  );
};

export default Header;
