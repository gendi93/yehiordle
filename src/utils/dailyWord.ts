import { WORDS } from "../config/words";

/**
 * Generates a consistent daily word based on the current date
 * Uses a seed based on the date to ensure the same word is selected each day
 */
export function getDailyWord(): string[] {
  const today = new Date();
  const dateString = today.toISOString().split("T")[0]; // YYYY-MM-DD
  
  // Create a simple hash from the date string
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use absolute value and modulo to get index
  const index = Math.abs(hash) % WORDS.length;
  return WORDS[index].split("");
}

/**
 * Gets the date string for today in YYYY-MM-DD format
 */
export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}
