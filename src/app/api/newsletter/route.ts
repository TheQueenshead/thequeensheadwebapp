import { NextResponse } from "next/server";
import { z } from "zod";
import { addNewsletterContact } from "@/lib/email";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  name: z.string().trim().max(120).optional(),
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid email" },
      { status: 400 },
    );
  }
  if (parsed.data.website) return NextResponse.json({ ok: true });

  try {
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
