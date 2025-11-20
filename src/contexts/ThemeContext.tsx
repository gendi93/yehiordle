import React, { createContext, useContext, useState, useEffect } from "react";
import { Theme, Settings } from "../config/types";
import { loadSettings, saveSettings } from "../utils/storage";

interface ThemeContextType {
    theme: Theme;
    settings: Settings;
    toggleTheme: () => void;
    updateSettings: (updates: Partial<Settings>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Settings>(() => loadSettings());

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute("data-theme", settings.theme);
        saveSettings(settings);
    }, [settings]);

    const toggleTheme = () => {
        setSettings((prev) => ({
            ...prev,
            theme: prev.theme === "dark" ? "light" : "dark",
        }));
    };

    const updateSettings = (updates: Partial<Settings>) => {
        setSettings((prev) => {
            const newSettings = { ...prev, ...updates };
            saveSettings(newSettings);
            return newSettings;
        });
    };

    return (
        <ThemeContext.Provider
            value={{
                theme: settings.theme,
                settings,
                toggleTheme,
                updateSettings,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
