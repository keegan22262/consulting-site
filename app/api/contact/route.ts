import { NextRequest } from "next/server"
import nodemailer from "nodemailer"
import { checkRateLimit } from "@/lib/security/rateLimit"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "unknown"

    if (!checkRateLimit(ip, 5, 10 * 60 * 1000)) {
      return Response.json(
        { success: false, error: "Too many requests." },
        { status: 429 }
      )
    }

    const body = await req.json()
    const name = body?.name
    const email = body?.email
    const message = body?.message
    const inquiryType = body?.inquiryType

    // Honeypot protection
    if (body?.company) {
      return Response.json({ success: true })
    }

    if (!name || !email || !message || !inquiryType) {
      return Response.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: "Inquiry: " + inquiryType,
      text: message,
    })

    return Response.json({ success: true })
  } catch {
    return Response.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    )
  }
}
