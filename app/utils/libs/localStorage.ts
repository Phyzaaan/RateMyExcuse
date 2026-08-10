const STORAGE_KEY = "gameCount";

// Save game count
export const setStoredGameCount = (count: number): void => {
  if (typeof window === "undefined") return; // SSR sanity check
  localStorage.setItem(STORAGE_KEY, count.toString());
};

// Grab game count (defaults to 5 if missing)
export const getStoredGameCount = (setGameCount: (value: number) => void) => {
  if (typeof window === "undefined") return 5; // SSR sanity check
  const count = localStorage.getItem(STORAGE_KEY);
  setGameCount(count ? parseInt(count, 10) : 5);
};
