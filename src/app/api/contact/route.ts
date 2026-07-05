import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSettings } from "@/sanity/lib/queries";
import { localProfile } from "@/lib/localContent";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.CONTACT_FROM_EMAIL;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Ämnesrad i mejlet beroende på vilket sammanhang formuläret skickades från. */
function buildSubject(context: string, subject: string, name: string): string {
  if (context === "lecture") {
    return subject
      ? `Föreläsningsförfrågan: ${subject} – från ${name}`
      : `Föreläsningsförfrågan från ${name}`;
  }
  if (context === "artwork" && subject) {
    return `Köpförfrågan: ${subject} – från ${name}`;
  }
  return `Meddelande från ${name} via hemsidan`;
}

export async function POST(request: Request) {
  if (!resendApiKey || !fromEmail) {
    console.error("Saknar RESEND_API_KEY eller CONTACT_FROM_EMAIL");
    return NextResponse.json(
      { error: "E-posttjänsten är inte konfigurerad." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const { name, from, message, subject, context, artwork } = (body ?? {}) as {
    name?: string;
    from?: string;
    message?: string;
    subject?: string;
    context?: string;
    // Bakåtkompatibilitet med tidigare payload som skickade "artwork".
    artwork?: string;
  };

  const cleanName = name?.trim();
  const cleanFrom = from?.trim();
  const cleanMessage = message?.trim();
  const cleanSubject =
    typeof subject === "string" && subject.trim()
      ? subject.trim()
      : typeof artwork === "string"
        ? artwork.trim()
        : "";
  const cleanContext = context === "lecture" ? "lecture" : artwork ? "artwork" : context === "artwork" ? "artwork" : "general";

  if (!cleanName || !cleanFrom || !cleanMessage) {
    return NextResponse.json(
      { error: "Fyll i namn, e-post och meddelande." },
      { status: 400 },
    );
  }

  if (!isEmail(cleanFrom)) {
    return NextResponse.json(
      { error: "Ange en giltig e-postadress." },
      { status: 400 },
    );
  }

  const settings = await getSettings();
  const toEmail = settings?.email ?? localProfile.email;

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: cleanFrom,
      subject: buildSubject(cleanContext, cleanSubject, cleanName),
      text: `${cleanSubject ? `${cleanContext === "lecture" ? "Föreläsning" : "Verk"}: ${cleanSubject}\n\n` : ""}${cleanMessage}\n\n— ${cleanName} (${cleanFrom})`,
    });

    if (error) {
      console.error("Resend-fel:", error);
      return NextResponse.json(
        { error: "Kunde inte skicka meddelandet. Försök igen." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Oväntat fel vid utskick:", err);
    return NextResponse.json(
      { error: "Kunde inte skicka meddelandet. Försök igen." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
