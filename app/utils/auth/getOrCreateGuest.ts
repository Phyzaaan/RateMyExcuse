import { cookies } from "next/headers";
import { supabaseAdmin } from "../supabase/admin";

export interface GuestUser {
  guestId: string;
  isNew: boolean;
}

export default async function getOrCreateGuest(): Promise<GuestUser> {
  const cookieStore = await cookies();
  let guestId = cookieStore.get("guestId")?.value;

  // -----------------------------
  // Existing Guest
  // -----------------------------
  if (guestId) {
    const { data } = await supabaseAdmin
      .from("users")
      .select("is_guest")
      .eq("user_id", guestId)
      .maybeSingle();

    if (data) {
      const { error } = await supabaseAdmin
        .from("users")
        .update({
          last_seen: new Date().toISOString(),
        })
        .eq("user_id", guestId);

      if (error) throw error;

      return {
        guestId: guestId,
        isNew: false,
      };
    }
  }

  // -----------------------------
  // Create Guest
  // -----------------------------
  guestId = crypto.randomUUID();

  const { error } = await supabaseAdmin.from("users").insert({
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
    guestId: guestId,
    isNew: true,
  };
}
