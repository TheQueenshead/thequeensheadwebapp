import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiries";
import { sendEnquiry } from "@/lib/email";

export async function POST(req: Request) {
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
    const result = await sendEnquiry(parsed.data);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Enquiry send failed", err);
    return NextResponse.json(
      {
        error:
          "Sorry — we couldn't send your enquiry just now. Please call us or try again shortly.",
      },
      { status: 500 },
    );
  }
}
