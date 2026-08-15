import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import { supabaseAdmin } from "@/app/utils/supabase/admin";
import getOrCreateGuest from "@/app/utils/auth/getOrCreateGuest";
import { User } from "@supabase/supabase-js";

async function connectGuestToUser(authUser: User) {
  const { data: existingUser } = await supabaseAdmin
    .from("users")
    .select("user_id")
    .eq("user_id", authUser.id)
    .maybeSingle();

  if (existingUser) return;

  const { guestId } = await getOrCreateGuest();

  const username =
    authUser.user_metadata?.full_name ??
    authUser.user_metadata?.name;

  const avatar =
    authUser.user_metadata?.avatar_url ??
    authUser.user_metadata?.picture;

  const { error } = await supabaseAdmin
    .from("users")
    .update({
      user_id: authUser.id,
      is_guest: false,
      ...(username && { username }),
      ...(avatar && { avatar }),
    })
    .eq("user_id", guestId)
    .eq("is_guest", true);

  if (error) throw error;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/";
  const cookieStore = await cookies();

  try {
    const supabase = createClient(cookieStore);

    // Authenticate the user
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) throw error;
    } else if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type,
      });

      if (error) throw error;
    } else {
      throw new Error("Missing authentication parameters.");
    }

    // Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;

    // Connect guest account to authenticated account
    if (user) {
      await connectGuestToUser(user);
    }

    return NextResponse.redirect(`${origin}${next}`);
  } catch (error) {
    console.error("AUTH CALLBACK ERROR:", error);

    return NextResponse.redirect(`${origin}/error`);
  }
}
