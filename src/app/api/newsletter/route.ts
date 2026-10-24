import { NextResponse } from "next/server";
import { z } from "zod";
import { addNewsletterContact } from "@/lib/email";
import { clientIp, rateLimit, verifyCaptcha } from "@/lib/guard";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  name: z.string().trim().max(120).optional(),
  website: z.string().max(0).optional().or(z.literal("")),
  captcha: z.string().max(2048).optional(),
});

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(`newsletter:${ip}`, 5, 10 * 60_000)) {
    return NextResponse.json(
      { error: "Too many attempts — please try again in a few minutes." },
      { status: 429 },
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid email" },
      { status: 400 },
    );
  }
  if (parsed.data.website) return NextResponse.json({ ok: true });

  try {
    if (!(await verifyCaptcha(parsed.data.captcha, ip, "newsletter"))) {
      return NextResponse.json(
        { error: "Please complete the security check and try again." },
        { status: 400 },
      );
    }
    const result = await addNewsletterContact(parsed.data.email, parsed.data.name);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Newsletter sign-up failed", err);
    return NextResponse.json(
      { error: "Sorry — something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
