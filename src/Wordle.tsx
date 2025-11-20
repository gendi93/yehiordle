import { useState, useCallback, useEffect } from "react";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Header from "./components/Header";
import GameOverModal from "./components/GameOverModal";
import HelpModal from "./components/HelpModal";
import StatsModal from "./components/StatsModal";
import SettingsModal from "./components/SettingsModal";
import ErrorMessage from "./components/ErrorMessage";
import Confetti from "./components/Confetti";
import { LETTERS, COLORS } from "./config/consts";
import { VALID_GUESSES } from "./config/words";
import { getDailyWord, getTodayDateString } from "./utils/dailyWord";
import { loadGameState, saveGameState, clearGameState } from "./utils/storage";
import { useStats } from "./contexts/StatsContext";
import { useTheme } from "./contexts/ThemeContext";
import { useSound } from "./hooks/useSound";
import { useHaptic } from "./hooks/useHaptic";
import { GameStatus } from "./config/types";

const Wordle = () => {
    const { updateStats } = useStats();
    const { settings, theme } = useTheme();
    const { playSound } = useSound();
    const { triggerHaptic } = useHaptic();

    // Initialize word - use daily word instead of random
    const [WORD] = useState(() => getDailyWord());
    const [currentDate] = useState(() => getTodayDateString());

    // Game state
    const [guesses, setGuesses] = useState<string[][]>([]);
    const [guess, setGuess] = useState<string[]>([]);
    const [colors, setColors] = useState<string[][]>([]);
    const [keys, setKeys] = useState<{ [key: string]: string }>({});
    const [status, setStatus] = useState<GameStatus>("playing");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [shouldShake, setShouldShake] = useState(false);
    const [shakeCounter, setShakeCounter] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [flippingRowIndex, setFlippingRowIndex] = useState<number | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [debugMode, setDebugMode] = useState(false);

    // Modals
    const [showHelp, setShowHelp] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showGameOver, setShowGameOver] = useState(false);

    // Load game state on mount
    useEffect(() => {
        const savedState = loadGameState();
        if (savedState && savedState.date === currentDate) {
            setGuesses(savedState.guesses);
            setColors(savedState.colors);
            setKeys(savedState.keys);
            setStatus(savedState.status);
        }
        setIsLoading(false);
    }, [currentDate]);

    // Save game state whenever it changes
    useEffect(() => {
        if (!isLoading && status !== "playing") {
            saveGameState({
                guesses,
                colors,
                keys,
                status,
                currentWord: WORD.join(""),
                date: currentDate,
                hardMode: settings.hardMode,
            });
        } else if (!isLoading) {
            saveGameState({
                guesses,
                colors,
                keys,
                status,
                currentWord: WORD.join(""),
                date: currentDate,
                hardMode: settings.hardMode,
            });
        }
    }, [guesses, colors, keys, status, WORD, currentDate, settings.hardMode, isLoading]);

    // Hard mode validation
    const validateHardMode = useCallback(
        (newGuess: string[]): string | null => {
            if (!settings.hardMode || guesses.length === 0) return null;

            const previousGuess = guesses[guesses.length - 1];
            const previousColors = colors[colors.length - 1];
            const revealedLetters: { [key: string]: { green: number[]; yellow: string[] } } = {};

            // Collect revealed information
            previousGuess.forEach((letter, index) => {
                if (!revealedLetters[letter]) {
                    revealedLetters[letter] = { green: [], yellow: [] };
                }
                if (previousColors[index] === COLORS.Green) {
                    revealedLetters[letter].green.push(index);
                } else if (previousColors[index] === COLORS.Yellow) {
                    revealedLetters[letter].yellow.push(letter);
                }
            });

            // Check if all green letters are in correct positions
            for (const [letter, info] of Object.entries(revealedLetters)) {
                for (const greenIndex of info.green) {
                    if (newGuess[greenIndex] !== letter) {
                        return `Letter ${letter.toUpperCase()} must be in position ${greenIndex + 1}`;
                    }
                }

                // Check if all yellow letters are used
                const yellowCount = info.yellow.length;
                const newGuessCount = newGuess.filter((l) => l === letter).length;
                const greenCount = info.green.length;
                if (newGuessCount < greenCount + yellowCount) {
                    return `Guess must contain ${letter.toUpperCase()}`;
                }
            }

            return null;
        },
        [guesses, colors, settings.hardMode]
    );

    const triggerAnimation = useCallback(() => {
        playSound("wrong");
        triggerHaptic("error");
        // Increment counter to force re-render with new key
        setShakeCounter((prev) => prev + 1);
        setShouldShake(true);
        setTimeout(() => setShouldShake(false), 500);
    }, [playSound, triggerHaptic]);

    const checkGuess = useCallback(() => {
        if (status !== "playing") return;
        if (guess.length < 5) {
            setErrorMessage("Word must be 5 letters");
            return;
        }

        const guessWord = guess.join("");
        if (!VALID_GUESSES[guessWord]) {
            triggerAnimation();
            setErrorMessage("Not a valid word");
            return;
        }

        // Hard mode validation
        const hardModeError = validateHardMode(guess);
        if (hardModeError) {
            triggerAnimation();
            setErrorMessage(hardModeError);
            return;
        }

        const newGuesses = [...guesses];
        const newColors = [...colors];
        const newColor: string[] = [];
        const newKeys = { ...keys };

        // Check each letter
        guess.forEach((letter, index) => {
            if (letter === WORD[index]) {
                newKeys[letter] = COLORS.Green;
                newColor.push(COLORS.Green);
            } else if (WORD.includes(letter)) {
                const countInWord = WORD.filter((x) => x === letter).length;
                const wordLetterMap = WORD.map((x) => (x === letter ? true : false));
                const guessLetterMap = guess.map((x) => (x === letter ? true : false));
                const correctLetterCount = wordLetterMap.reduce((acc, curr, idx) => {
                    if (curr && curr === guessLetterMap[idx]) return acc + 1;
                    else return acc + 0;
                }, 0);
                const firstInstance = guess.findIndex(
                    (x, idx) => x === letter && WORD[idx] !== letter
                );
                if (countInWord > correctLetterCount && firstInstance === index) {
                    if (newKeys?.[letter] !== COLORS.Green)
                        newKeys[letter] = COLORS.Yellow;
                    newColor.push(COLORS.Yellow);
                } else {
                    newColor.push(COLORS.Grey);
                }
            } else {
                newKeys[letter] = COLORS.Grey;
                newColor.push(COLORS.Grey);
            }
        });

        newGuesses.push(guess);
        newColors.push(newColor);

        // Set flipping state to trigger animation
        const currentAttempt = guesses.length;
        setFlippingRowIndex(currentAttempt);
        setIsFlipping(true);
        playSound("correct");
        triggerHaptic("medium");

        // Update colors immediately so they're ready for animation
        setGuesses(newGuesses);
        setColors(newColors);
        setKeys(newKeys);

        // Check win/loss
        const isWin = guess.every((letter, index) => letter === WORD[index]);
        const isLoss = newGuesses.length >= 6 && !isWin;

        setTimeout(() => {
            setIsFlipping(false);
            setFlippingRowIndex(null);
            if (isWin) {
                setStatus("won");
                setShowConfetti(true);
                playSound("win");
                triggerHaptic("success");
                updateStats(newGuesses.length, true);
                setTimeout(() => {
                    setShowGameOver(true);
                    setShowConfetti(false);
                }, 1500);
            } else if (isLoss) {
                setStatus("lost");
                playSound("wrong");
                triggerHaptic("error");
                updateStats(6, false);
                setTimeout(() => {
                    setShowGameOver(true);
                }, 500);
            }
        }, 600);

        setGuess([]);
    }, [
        guess,
        guesses,
        colors,
        keys,
        status,
        WORD,
        triggerAnimation,
        validateHardMode,
        playSound,
        triggerHaptic,
        updateStats,
    ]);

    const handleInput = useCallback(
        (char: string) => {
            if (status !== "playing") return;

            if (char === "enter") {
                checkGuess();
            } else {
                const newGuess = [...guess];
                if (char === "backspace") {
                    if (newGuess.length > 0) {
                        newGuess.pop();
                        playSound("key");
                        triggerHaptic("light");
                    }
                } else if (guess.length < 5) {
                    newGuess.push(char);
                    playSound("key");
                    triggerHaptic("light");
                }
                setGuess(newGuess);
            }
        },
        [status, guess, checkGuess, playSound, triggerHaptic]
    );

    const updateGuess = useCallback(
        (e: KeyboardEvent) => {
            if (
                e.metaKey ||
                e.ctrlKey ||
                e.altKey ||
                !(
                    LETTERS.includes(e.key) ||
                    e.key.toLowerCase() === "backspace" ||
                    e.key.toLowerCase() === "enter"
                )
            )
                return;

            handleInput(e.key.toLowerCase());
        },
        [handleInput]
    );

    useEffect(() => {
        document.addEventListener("keydown", updateGuess);
        return () => {
            document.removeEventListener("keydown", updateGuess);
        };
    }, [updateGuess]);

    const handleRestart = useCallback(() => {
        clearGameState();
        window.location.reload();
    }, []);

    const isDark = theme === "dark";
    const backgroundColor = isDark ? COLORS.Black : COLORS.White;
    const textColor = isDark ? COLORS.White : COLORS.Black;

    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    backgroundColor,
                    color: textColor,
                }}
            >
                Loading...
            </div>
        );
    }

    return (
        <>
            <div
                style={{
                    width: "100%",
                    maxWidth: "100%",
                    margin: "0 auto",
                    backgroundColor: backgroundColor,
                }}
            >
                <Header
                    onHelpClick={() => setShowHelp(true)}
                    onStatsClick={() => setShowStats(true)}
                    onSettingsClick={() => setShowSettings(true)}
                    onRestartClick={handleRestart}
                    debugWord={WORD.join("")}
                    debugMode={debugMode}
                    onToggleDebug={() => setDebugMode(!debugMode)}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "20px",
                    background: backgroundColor,
                    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
                    lineHeight: 1.5,
                    fontSynthesis: "none",
                    textRendering: "optimizeLegibility",
                    width: "100%",
                    maxWidth: "100%",
                    minHeight: "calc(100vh - 75px)",
                    color: textColor,
                    padding: "20px 16px",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        maxWidth: "500px",
                    }}
                >
                    <Grid
                        guesses={guesses}
                        guess={guess}
                        colors={colors}
                        attempt={guesses.length}
                        isFlipping={isFlipping}
                        flippingRowIndex={flippingRowIndex}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        maxWidth: "600px",
                    }}
                >
                    <Keyboard
                        keys={keys}
                        checkGuess={checkGuess}
                        handleInput={handleInput}
                        shouldShake={shouldShake}
                        shakeKey={shakeCounter}
                    />
                </div>
            </div>

            {showConfetti && <Confetti />}

            <ErrorMessage
                message={errorMessage}
                onClose={() => setErrorMessage("")}
            />

            <GameOverModal
                isOpen={showGameOver}
                onClose={() => setShowGameOver(false)}
                status={status}
                word={WORD.join("")}
                attempts={guesses.length}
                guesses={guesses}
                colors={colors}
            />

            <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
            <StatsModal isOpen={showStats} onClose={() => setShowStats(false)} />
            <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
        </>
    );
};

export default Wordle;
