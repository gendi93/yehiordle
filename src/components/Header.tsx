import { COLORS } from "../config/consts";
import { useTheme } from "../contexts/ThemeContext";

type HeaderProps = {
    onHelpClick: () => void;
    onStatsClick: () => void;
    onRestartClick: () => void;
    onSettingsClick: () => void;
    debugWord?: string;
    debugMode?: boolean;
    onToggleDebug?: () => void;
};

const Header = ({ onHelpClick, onStatsClick, onRestartClick, onSettingsClick, debugWord, debugMode, onToggleDebug }: HeaderProps) => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            style={{
                borderBottom: `1px solid ${isDark ? COLORS.Grey : "#d3d6da"}`,
                width: "100%",
                maxWidth: "100%",
                padding: "0 16px",
                height: debugMode ? 85 : 65,
                marginBottom: 10,
                fontFamily: "'Roboto Slab', serif",
                fontSize: "clamp(24px, 5vw, 35px)",
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                backgroundColor: isDark ? COLORS.Black : "#ffffff",
                color: isDark ? COLORS.White : COLORS.Black,
                boxSizing: "border-box",
            }}
            role="banner"
        >
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "8px" }}>
                <button
                    onClick={onHelpClick}
                    style={{
                        background: "none",
                        border: "none",
                        color: isDark ? COLORS.White : COLORS.Black,
                        fontSize: "20px",
                        cursor: "pointer",
                        padding: "8px",
                        borderRadius: "4px",
                    }}
                    aria-label="Help"
                    title="Help"
                >
                    ?
                </button>
                {onToggleDebug && (
                    <button
                        onClick={onToggleDebug}
                        style={{
                            background: debugMode ? COLORS.Green : "none",
                            border: `1px solid ${isDark ? COLORS.Grey : "#d3d6da"}`,
                            color: isDark ? COLORS.White : COLORS.Black,
                            fontSize: "12px",
                            cursor: "pointer",
                            padding: "4px 8px",
                            borderRadius: "4px",
                        }}
                        aria-label="Toggle debug mode"
                        title="Debug Mode"
                    >
                        DEBUG
                    </button>
                )}
            </div>
            <div style={{ fontWeight: "bold", textAlign: "center", display: "flex", flexDirection: "column", gap: "4px" }}>
                <div>YEHIORDLE</div>
                {debugMode && debugWord && (
                    <div style={{ fontSize: "14px", color: COLORS.Green, fontWeight: "normal" }}>
                        {debugWord.toUpperCase()}
                    </div>
                )}
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "flex-end" }}>
                <button
                    onClick={onStatsClick}
                    style={{
                        background: "none",
                        border: "none",
                        color: isDark ? COLORS.White : COLORS.Black,
                        fontSize: "20px",
                        cursor: "pointer",
                        padding: "8px",
                        borderRadius: "4px",
                    }}
                    aria-label="Statistics"
                    title="Statistics (S)"
                >
                    📊
                </button>
                <button
                    onClick={onSettingsClick}
                    style={{
                        background: "none",
                        border: "none",
                        color: isDark ? COLORS.White : COLORS.Black,
                        fontSize: "20px",
                        cursor: "pointer",
                        padding: "8px",
                        borderRadius: "4px",
                    }}
                    aria-label="Settings"
                    title="Settings"
                >
                    ⚙️
                </button>
                <button
                    onClick={toggleTheme}
                    style={{
                        background: "none",
                        border: "none",
                        color: isDark ? COLORS.White : COLORS.Black,
                        fontSize: "20px",
                        cursor: "pointer",
                        padding: "8px",
                        borderRadius: "4px",
                    }}
                    aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
                    title="Toggle theme"
                >
                    {isDark ? "☀️" : "🌙"}
                </button>
                <button
                    onClick={onRestartClick}
                    style={{
                        background: "none",
                        border: "none",
                        color: isDark ? COLORS.White : COLORS.Black,
                        fontSize: "20px",
                        cursor: "pointer",
                        padding: "8px",
                        borderRadius: "4px",
                    }}
                    aria-label="Restart game"
                    title="Restart (R)"
                >
                    ↻
                </button>
            </div>
        </div>
    );
};

export default Header;
