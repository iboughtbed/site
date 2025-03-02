import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";

import { resend } from "@/lib/resend";
import { newsletterRateLimit } from "@/lib/rate-limit";

const joinNewsletterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export async function POST(req: Request) {
  const ip = (await headers()).get("x-real-ip") ?? "local";
  const rl = await newsletterRateLimit.limit(ip);

  if (!rl.success) {
    return NextResponse.json(
      { success: false, message: "Too many attempts. Try again later" },
      { status: 429 },
    );
  }

  const input = joinNewsletterSchema.parse(await req.json());

  try {
    await resend.contacts.create({
      email: input.email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
