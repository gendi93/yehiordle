import React from "react";
import ReactDOM from "react-dom/client";
import Wordle from "./Wordle";
import { ThemeProvider } from "./contexts/ThemeContext";
import { StatsProvider } from "./contexts/StatsContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./index.css";

function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <StatsProvider>
                    <Wordle />
                </StatsProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
