const STORAGE_KEY = "userData";

// Save game count
export const setStoredUserData = (
  count: number,
  username: string,
  avatar: string,
): void => {
  if (typeof window === "undefined") return; // SSR sanity check
  const data = {
    count,
    username,
    avatar,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Grab game count (defaults to 5 if missing)
export const getStoredUserData = (
  setGameCount: (value: number) => void,
  setUsername: (value: string) => void,
  setAvatar: (value: string) => void,
) => {
  if (typeof window === "undefined") return 5; // SSR sanity check
  const res = localStorage.getItem(STORAGE_KEY);

  if (!res) return;

  const data = JSON.parse(res);

  setGameCount(data.count);
  setUsername(data.username);
  setAvatar(data.avatar);
};
