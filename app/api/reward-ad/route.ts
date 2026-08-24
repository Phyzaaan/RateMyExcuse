import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/utils/supabase/admin";
import getOrCreateGuest from "@/app/utils/auth/getOrCreateGuest";
import getUserId from "@/app/utils/auth/getUserId";

export async function POST() {
  try {
    const userId = await getUserId();

    // If not logged in, resolve the guest
    const finalUserId = userId ?? (await getOrCreateGuest()).guestId;

    // increase the game count by 1
    const { data, error } = await supabaseAdmin.rpc(
      "increment_games",
      {
        target_user_id: finalUserId,
      },
    );

    if (error) throw error;

    return NextResponse.json({
      games_remaining: data,
    }, { status: 200 },);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to claim reward" },
      { status: 500 },
    );
  }
}
