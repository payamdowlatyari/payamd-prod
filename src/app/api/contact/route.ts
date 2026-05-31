import { NextResponse } from "next/server";

import { sendContactEmail } from "~/lib/contact/provider";
import {
  isHoneypotTriggered,
  type ContactRequestInput,
  validateContactInput,
} from "~/lib/contact/schema";

type RateEntry = {
  count: number;
  expiresAt: number;
};

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateStore = new Map<string, RateEntry>();

function getClientIp(request: Request): string {
  const header = request.headers.get("x-forwarded-for");

  if (!header) {
    return "unknown";
  }

  return header.split(",")[0].trim();
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = rateStore.get(ip);

  if (!current || current.expiresAt <= now) {
    rateStore.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  current.count += 1;
  rateStore.set(ip, current);
  return false;
}

export async function POST(request: Request): Promise<Response> {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: ContactRequestInput;

  try {
    body = (await request.json()) as ContactRequestInput;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request payload." },
      { status: 400 }
    );
  }

  if (isHoneypotTriggered(body)) {
    return NextResponse.json(
      { ok: true, message: "Message sent successfully." },
      { status: 200 }
    );
  }

  const validation = validateContactInput(body);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, message: validation.error },
      { status: 400 }
    );
  }

  try {
    await sendContactEmail(validation.data);

    return NextResponse.json(
      { ok: true, message: "Your message has been sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact email send failed", {
      error,
      ip,
    });

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to send message, please try again later.",
      },
      { status: 500 }
    );
  }
}
