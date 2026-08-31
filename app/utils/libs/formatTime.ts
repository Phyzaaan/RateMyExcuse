const unit = [60, 60, 24, 30, 12, 0];
const names = ["second", "minute", "hour", "day", "month", "year"];

// Time Format: 2026-08-30T06:26:47.546254+00:00 YYYY-MM-DDTHH:MM:SS.ms+UTC:UTC
// Conver too X Days/Mons/Yeas ago
export default function formatTime(time: string) {
  const diff = Math.floor((Date.now() - new Date(time).getTime()) / 1000);

  if (diff < 1) return "Just a moment ago";

  let res = "";
  unit.reduce((prev, curr, idx) => {
    const value = Math.floor(diff / prev);
    console.log({
      prev,
      curr,
      idx,
      value,
      name: names[idx],
    });
    if (value >= 1) {
      res = `${value} ${value === 1 ? names[idx] : names[idx] + "s"} ago`;
    }
    return prev * curr;
  }, 1);

  return res;
}
