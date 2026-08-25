import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/utils/supabase/admin";
import getUserId from "@/app/utils/auth/getUserId";
import getOrCreateGuest from "@/app/utils/auth/getOrCreateGuest";

export async function POST(request: Request) {
  try {
    const { excuse, scenario, totalScore } = await request.json();

    if (!excuse || !scenario || totalScore === undefined) {
      return NextResponse.json(
        { error: "excuse, scenario and totalScore are required" },
        { status: 400 }
      );
    }

    let userId = await getUserId();

    if (!userId) {
      const { guestId } = await getOrCreateGuest();

      userId = guestId;
    }

    const { data, error } = await supabaseAdmin
      .from("community_posts")
      .insert({
        user_id: userId,
        excuse,
        scenario,
        total_score: totalScore,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to create community post:", error);

      return NextResponse.json(
        { error: "Failed to create community post" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        post: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Community post error:", error);

    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}