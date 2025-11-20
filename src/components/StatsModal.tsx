import Modal from "./Modal";
import { COLORS } from "../config/consts";
import { useStats } from "../contexts/StatsContext";

export default function StatsModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { statistics } = useStats();

    const winRate =
        statistics.gamesPlayed > 0
            ? Math.round((statistics.gamesWon / statistics.gamesPlayed) * 100)
            : 0;

    const maxDistribution = Math.max(
        ...Object.values(statistics.guessDistribution)
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Statistics">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    color: "white",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "16px",
                        textAlign: "center",
                    }}
                >
                    <div>
                        <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                            {statistics.gamesPlayed}
                        </div>
                        <div style={{ fontSize: "12px", color: COLORS.Grey }}>
                            Played
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                            {winRate}%
                        </div>
                        <div style={{ fontSize: "12px", color: COLORS.Grey }}>
                            Win Rate
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                            {statistics.currentStreak}
                        </div>
                        <div style={{ fontSize: "12px", color: COLORS.Grey }}>
                            Current Streak
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                            {statistics.maxStreak}
                        </div>
                        <div style={{ fontSize: "12px", color: COLORS.Grey }}>
                            Max Streak
                        </div>
                    </div>
                </div>

                <div>
                    <div
                        style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            marginBottom: "12px",
                        }}
                    >
                        Guess Distribution
                    </div>
                    {[1, 2, 3, 4, 5, 6].map((num) => {
                        const count = statistics.guessDistribution[
                            num as keyof typeof statistics.guessDistribution
                        ];
                        const percentage =
                            maxDistribution > 0 ? (count / maxDistribution) * 100 : 0;

                        return (
                            <div
                                key={num}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    marginBottom: "8px",
                                }}
                            >
                                <div style={{ width: "20px", fontSize: "14px" }}>{num}</div>
                                <div
                                    style={{
                                        flex: 1,
                                        height: "24px",
                                        backgroundColor: COLORS.Grey,
                                        borderRadius: "4px",
                                        overflow: "hidden",
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${percentage}%`,
                                            height: "100%",
                                            backgroundColor: COLORS.Green,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "flex-end",
                                            paddingRight: "8px",
                                            color: "white",
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            transition: "width 0.3s ease",
                                        }}
                                    >
                                        {count > 0 && count}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Modal>
    );
}
