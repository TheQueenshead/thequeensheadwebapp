import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiries";
import { sendEnquiry } from "@/lib/email";
import { clientIp, rateLimit, verifyCaptcha } from "@/lib/guard";

const SEND_FAILED =
  "Sorry — we couldn't send your enquiry just now. Please email us or try again shortly.";

export async function POST(req: Request) {
  const ip = clientIp(req);
  // 5 enquiries per visitor per 10 minutes is plenty for a real person
  if (!rateLimit(`enquiry:${ip}`, 5, 10 * 60_000)) {
    return NextResponse.json(
      { error: "You've sent a few enquiries in a row — please wait a few minutes or give us a call." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? "Please check the form and try again." },
      { status: 400 },
    );
  }

  // Honeypot tripped → pretend success, do nothing
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  try {
    if (!(await verifyCaptcha(parsed.data.captcha, ip, "enquiry"))) {
      return NextResponse.json(
        { error: "Please complete the security check and try again." },
        { status: 400 },
      );
    }
    const result = await sendEnquiry(parsed.data);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Enquiry send failed", err);
    return NextResponse.json({ error: SEND_FAILED }, { status: 500 });
  }
}
