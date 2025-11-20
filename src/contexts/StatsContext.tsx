import React, { createContext, useContext, useState, useEffect } from "react";
import { Statistics } from "../config/types";
import { loadStatistics, saveStatistics } from "../utils/storage";
import { getTodayDateString } from "../utils/dailyWord";

interface StatsContextType {
    statistics: Statistics;
    updateStats: (attempts: number, won: boolean) => void;
    resetStats: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: React.ReactNode }) {
    const [statistics, setStatistics] = useState<Statistics>(() =>
        loadStatistics()
    );

    useEffect(() => {
        // Check if we need to reset streak (new day)
        const today = getTodayDateString();
        if (
            statistics.lastPlayedDate &&
            statistics.lastPlayedDate !== today &&
            statistics.currentStreak > 0
        ) {
            // Check if streak should continue (if they played yesterday)
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayString = yesterday.toISOString().split("T")[0];

            if (statistics.lastPlayedDate !== yesterdayString) {
                // Streak broken
                setStatistics((prev) => ({
                    ...prev,
                    currentStreak: 0,
                }));
            }
        }
    }, [statistics.lastPlayedDate, statistics.currentStreak]);

    const updateStats = (attempts: number, won: boolean) => {
        setStatistics((prev) => {
            const today = getTodayDateString();
            const isNewDay = prev.lastPlayedDate !== today;

            const newStats: Statistics = {
                ...prev,
                gamesPlayed: isNewDay ? prev.gamesPlayed + 1 : prev.gamesPlayed,
                gamesWon: isNewDay && won ? prev.gamesWon + 1 : prev.gamesWon,
                lastPlayedDate: today,
            };

            if (won && isNewDay) {
                // Update streak
                const newStreak = prev.lastPlayedDate === today ? prev.currentStreak : prev.currentStreak + 1;
                newStats.currentStreak = newStreak;
                newStats.maxStreak = Math.max(prev.maxStreak, newStreak);

                // Update guess distribution
                if (attempts >= 1 && attempts <= 6) {
                    newStats.guessDistribution = {
                        ...prev.guessDistribution,
                        [attempts as keyof typeof prev.guessDistribution]:
                            prev.guessDistribution[attempts as keyof typeof prev.guessDistribution] + 1,
                    };
                }
            } else if (!won && isNewDay) {
                // Lost - reset streak
                newStats.currentStreak = 0;
            }

            saveStatistics(newStats);
            return newStats;
        });
    };

    const resetStats = () => {
        const defaultStats: Statistics = {
            gamesPlayed: 0,
            gamesWon: 0,
            currentStreak: 0,
            maxStreak: 0,
            guessDistribution: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
            },
            lastPlayedDate: null,
        };
        setStatistics(defaultStats);
        saveStatistics(defaultStats);
    };

    return (
        <StatsContext.Provider value={{ statistics, updateStats, resetStats }}>
            {children}
        </StatsContext.Provider>
    );
}

export function useStats() {
    const context = useContext(StatsContext);
    if (context === undefined) {
        throw new Error("useStats must be used within a StatsProvider");
    }
    return context;
}
