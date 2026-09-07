"use client";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddleInstance: Paddle | undefined;

export async function getPaddle(): Promise<Paddle | undefined> {
  if (paddleInstance) return paddleInstance;

  paddleInstance = await initializePaddle({
    environment: process.env.NEXT_PUBLIC_PADDLE_ENV as "sandbox" | "production",
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
  });

  return paddleInstance;
}