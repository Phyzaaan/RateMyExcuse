// app/api/webhooks/paddle/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

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
    // TODO: mark this user as premium in your database
    console.log("Grant premium to:", userId);
  }

  if (event.event_type === "subscription.canceled") {
    const userId = event.data.custom_data?.userId;
    // TODO: remove premium access
    console.log("Revoke premium for:", userId);
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
