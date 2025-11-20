import Modal from "./Modal";
import { COLORS } from "../config/consts";
import { useTheme } from "../contexts/ThemeContext";

export default function SettingsModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { settings, updateSettings } = useTheme();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Settings">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    color: "white",
                }}
            >
                <div>
                    <div
                        style={{
                            display: "flex",
                            marginBottom: "16px",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                                Hard Mode
                            </div>
                            <div style={{ fontSize: "12px", color: COLORS.Grey }}>
                                Any revealed hints must be used in subsequent guesses
                            </div>
                        </div>
                        <label
                            style={{
                                position: "relative",
                                display: "inline-block",
                                width: "50px",
                                height: "24px",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={settings.hardMode}
                                onChange={(e) =>
                                    updateSettings({ hardMode: e.target.checked })
                                }
                                style={{
                                    opacity: 0,
                                    width: 0,
                                    height: 0,
                                }}
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    cursor: "pointer",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: settings.hardMode
                                        ? COLORS.Green
                                        : COLORS.Grey,
                                    transition: "0.3s",
                                    borderRadius: "24px",
                                }}
                            >
                                <span
                                    style={{
                                        position: "absolute",
                                        content: '""',
                                        height: "18px",
                                        width: "18px",
                                        left: "3px",
                                        bottom: "3px",
                                        backgroundColor: "white",
                                        transition: "0.3s",
                                        borderRadius: "50%",
                                        transform: settings.hardMode
                                            ? "translateX(26px)"
                                            : "translateX(0)",
                                    }}
                                />
                            </span>
                        </label>
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "16px",
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                                Sound Effects
                            </div>
                            <div style={{ fontSize: "12px", color: COLORS.Grey }}>
                                Play sounds for game events
                            </div>
                        </div>
                        <label
                            style={{
                                position: "relative",
                                display: "inline-block",
                                width: "50px",
                                height: "24px",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={settings.soundEnabled}
                                onChange={(e) =>
                                    updateSettings({ soundEnabled: e.target.checked })
                                }
                                style={{
                                    opacity: 0,
                                    width: 0,
                                    height: 0,
                                }}
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    cursor: "pointer",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: settings.soundEnabled
                                        ? COLORS.Green
                                        : COLORS.Grey,
                                    transition: "0.3s",
                                    borderRadius: "24px",
                                }}
                            >
                                <span
                                    style={{
                                        position: "absolute",
                                        content: '""',
                                        height: "18px",
                                        width: "18px",
                                        left: "3px",
                                        bottom: "3px",
                                        backgroundColor: "white",
                                        transition: "0.3s",
                                        borderRadius: "50%",
                                        transform: settings.soundEnabled
                                            ? "translateX(26px)"
                                            : "translateX(0)",
                                    }}
                                />
                            </span>
                        </label>
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                                Haptic Feedback
                            </div>
                            <div style={{ fontSize: "12px", color: COLORS.Grey }}>
                                Vibrate on mobile devices (if supported)
                            </div>
                        </div>
                        <label
                            style={{
                                position: "relative",
                                display: "inline-block",
                                width: "50px",
                                height: "24px",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={settings.hapticEnabled}
                                onChange={(e) =>
                                    updateSettings({ hapticEnabled: e.target.checked })
                                }
                                style={{
                                    opacity: 0,
                                    width: 0,
                                    height: 0,
                                }}
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    cursor: "pointer",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: settings.hapticEnabled
                                        ? COLORS.Green
                                        : COLORS.Grey,
                                    transition: "0.3s",
                                    borderRadius: "24px",
                                }}
                            >
                                <span
                                    style={{
                                        position: "absolute",
                                        content: '""',
                                        height: "18px",
                                        width: "18px",
                                        left: "3px",
                                        bottom: "3px",
                                        backgroundColor: "white",
                                        transition: "0.3s",
                                        borderRadius: "50%",
                                        transform: settings.hapticEnabled
                                            ? "translateX(26px)"
                                            : "translateX(0)",
                                    }}
                                />
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
