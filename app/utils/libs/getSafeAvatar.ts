
export default function getSafeAvatar(src?: string | null) {
  if (!src || src === "undefined" || src === "null" || src.trim() === "") {
    return "/img/user.jpg";
  }

  return src;
}