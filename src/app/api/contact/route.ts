import { writeClient } from "@/sanity/lib/writeClient";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  budget?: unknown;
  timeline?: unknown;
  message?: unknown;
  companyWebsite?: unknown;
};

const MAX_FIELD_LENGTH = 5000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, number[]>();

function cleanText(value: unknown, maxLength = 300) {
  if (typeof value !== "string") return "";

  return value.trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string, now = Date.now()) {
  const recent = (rateLimitStore.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, recent);
    return false;
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return true;
}

export async function POST(request: Request) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Contact form is missing SANITY_API_WRITE_TOKEN.");

    return Response.json(
      { error: "Could not save your message. Please email directly instead." },
      { status: 500 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const honeypot = cleanText(payload.companyWebsite, 200);
  if (honeypot) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const name = cleanText(payload.name);
  const email = cleanText(payload.email);
  const projectType = cleanText(payload.projectType);
  const budget = cleanText(payload.budget);
  const timeline = cleanText(payload.timeline);
  const message = cleanText(payload.message, MAX_FIELD_LENGTH);

  if (!name || !email || !message) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const submission = await writeClient.create({
      _type: "contactSubmission",
      name,
      email,
      projectType,
      budget,
      timeline,
      message,
      status: "new",
      submittedAt: new Date().toISOString(),
      source: "website-contact-form",
    });

    return Response.json({ id: submission._id });
  } catch (error) {
    console.error("Sanity contact submission failed", error);

    return Response.json(
      { error: "Could not save your message. Please email directly instead." },
      { status: 500 }
    );
  }
}
