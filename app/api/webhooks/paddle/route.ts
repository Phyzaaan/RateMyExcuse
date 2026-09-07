import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/app/utils/supabase/admin";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("paddle-signature") ?? "";

  // Verify the webhook is genuinely from Paddle
  const isValid = verifyPaddleSignature(
    rawBody,
    signature,
    process.env.PADDLE_WEBHOOK_SECRET!,
  );
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event_type === "transaction.completed") {
    const userId = event.data.custom_data?.userId;

    if (!userId) {
      console.error(
        "No userId in custom_data — payload was:",
        event.data.custom_data,
      );
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("users")
      .update({ is_premium: true })
      .eq("user_id", userId)
      .select(); // <-- now data will show the actual updated row(s), or []

    if (error) {
      console.error("Error updating user:", error);
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 },
      );
    }

    console.log("Rows updated:", data); // [] means zero matches, not a DB error
  }

  if (event.event_type === "subscription.canceled") {
    const userId = event.data.custom_data?.userId;

    if (!userId) {
      console.error(
        "No userId in custom_data — payload was:",
        event.data.custom_data,
      );
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("users")
      .update({ is_premium: false })
      .eq("user_id", userId);

    if (error) {
      console.error("Error revoking premium for user:", error);
      return NextResponse.json(
        { error: "Failed to revoke premium" },
        { status: 500 },
      );
    }

    console.log("Rows updated:", data); // [] means zero matches, not a DB error
  }

  return NextResponse.json({ received: true });
}

function verifyPaddleSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string,
): boolean {
  // Paddle sends: "ts=1234567890;h1=abcdef..."
  const parts = Object.fromEntries(
    signatureHeader.split(";").map((p) => p.split("=")),
  );
  const signedPayload = `${parts.ts}:${rawBody}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");
  return expected === parts.h1;
}
