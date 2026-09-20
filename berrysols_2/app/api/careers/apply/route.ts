import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_CV_SIZE = 5 * 1024 * 1024;
const allowedCvTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function requiredValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = requiredValue(formData, "name");
    const email = requiredValue(formData, "email");
    const phone = requiredValue(formData, "phone");
    const city = requiredValue(formData, "city");
    const roleTitle = requiredValue(formData, "roleTitle");
    const roleSlug = requiredValue(formData, "roleSlug");
    const education = requiredValue(formData, "education");
    const experience = requiredValue(formData, "experience");
    const coverNote = requiredValue(formData, "coverNote");
    const cv = formData.get("cv");

    if (!name || !email || !phone || !city || !roleTitle || !roleSlug) {
      return NextResponse.json({ error: "Please complete all required personal information." }, { status: 400 });
    }

    if (!(cv instanceof File) || cv.size === 0) {
      return NextResponse.json({ error: "Please attach your CV." }, { status: 400 });
    }

    if (cv.size > MAX_CV_SIZE || !allowedCvTypes.has(cv.type)) {
      return NextResponse.json({ error: "Your CV must be a PDF, DOC, or DOCX file smaller than 5 MB." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const sender = process.env.CAREERS_FROM_EMAIL || smtpUser;
    const recipient = process.env.CAREERS_TO_EMAIL || "isha@berrysols.com";

    if (!smtpHost || !smtpUser || !smtpPassword) {
      return NextResponse.json({ error: "Email delivery is not configured yet. Add the SMTP environment variables first." }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPassword },
    });

    const cvBuffer = Buffer.from(await cv.arrayBuffer());
    const applicationText = [
      `Role: ${roleTitle}`,
      `Role slug: ${roleSlug}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `City: ${city}`,
      "",
      `Education: ${education || "Not provided"}`,
      "",
      `Experience: ${experience || "Not provided"}`,
      "",
      `Cover note: ${coverNote || "Not provided"}`,
    ].join("\n");

    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `Job application: ${roleTitle} - ${name}`,
      text: applicationText,
      attachments: [{ filename: cv.name, content: cvBuffer, contentType: cv.type }],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Career application email failed", error);
    return NextResponse.json({ error: "We could not send your application. Please try again." }, { status: 500 });
  }
}
