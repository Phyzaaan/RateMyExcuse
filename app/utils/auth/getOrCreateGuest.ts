import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

export interface GuestUser {
  guestId: string;
  isNew: boolean;
}

export default async function getOrCreateGuest(): Promise<GuestUser> {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  let guestId = cookieStore.get("guestId")?.value;

  // -----------------------------
  // Existing Guest
  // -----------------------------
  if (guestId) {
    const { data } = await supabase
      .from("users")
      .select("is_guest")
      .eq("user_id", guestId)
      .maybeSingle();

    if (data) {
      await supabase
        .from("users")
        .update({
          last_seen: new Date().toISOString(),
        })
        .eq("user_id", guestId);

      return {
        guestId,
        isNew: false,
      };
    }
  }

  // -----------------------------
  // Create Guest
  // -----------------------------
  guestId = crypto.randomUUID();

  const { error } = await supabase.from("users").insert({
    user_id: guestId,
    username: `Guest-${guestId.slice(0, 6)}`,
    is_guest: true,
    games_remaining: 5,
    games_played: 0,
    highest_score: 0,
    last_seen: new Date().toISOString(),
  });

  if (error) throw error;

  cookieStore.set("guestId", guestId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return {
    guestId,
    isNew: true,
  };
}
