import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/utils/supabase/admin";
import getOrCreateGuest from "@/app/utils/auth/getOrCreateGuest";
import getUserId from "@/app/utils/auth/getUserId";

export async function POST() {
  try {
    let userId = await getUserId();

    if (!userId) {
      const { guestId } = await getOrCreateGuest();
      userId = guestId;
    }

    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("games_remaining, username, avatar")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to retrieve account." },
        { status: 500 },
      );
    }

    if (user.games_remaining <= 0) {
      return NextResponse.json(
        { error: "You don't have any free games left." },
        { status: 429 },
      );
    }

    return NextResponse.json({
        username: user.username,
        avatar: user.avatar,
        games_remaining: user.games_remaining
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to start conversation." },
      { status: 500 },
    );
  }
}
