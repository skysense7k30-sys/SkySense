import { NextResponse } from "next/server";
import { Resend } from "resend";
import clientPromise from "@/lib/mongoDb";
const resend = new Resend(process.env.RESEND_API_KEY);
// Basic in-memory rate limit (per server instance — fine for low traffic,
// swap for Redis/Upstash if you deploy multiple instances or need it durable).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const hits = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  hits.set(ip, entry);
  return entry.count > RATE_LIMIT_MAX;
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please try again in a minute." },
        { status: 429 }
      );
    }
    const body = await request.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").replace(/\D/g, "");
    const message = (body.message || "").trim();
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are all required." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "That email address doesn't look valid." },
        { status: 400 }
      );
    }
    if (name.length > 100 || email.length > 200 || phone.length > 15 || message.length > 5000) {
      return NextResponse.json(
        { error: "One of the fields is too long." },
        { status: 400 }
      );
    }
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "skysense");
    const doc = {
      name,
      email,
      phone,
      message,
      ip,
      createdAt: new Date(),
      emailSent: false,
    };
    const insertResult = await db.collection("contactMessages").insertOne(doc);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || "Skysense Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_INBOX,
      replyTo: email,
      subject: `[Skysense] New message from ${name}`,
      text: `From: ${name} <${email}>${phone ? `\nPhone: ${phone}` : ""}\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });
    if (error) {
      // Message is already saved in Mongo, so this isn't fatal — just log it
      // so you can notice the email side is broken (e.g. bad API key, domain
      // not verified) without losing the submission itself.
      console.error("Resend error (message still saved to DB):", error);
    } else {
      await db
        .collection("contactMessages")
        .updateOne({ _id: insertResult.insertedId }, { $set: { emailSent: true } });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
