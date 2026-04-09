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

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT || "587")
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "vanrillsingh@gmail.com"

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("SMTP environment variables are not configured")
      return Response.json(
        { success: false, error: "Mail service is not configured. Please try again later." },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    await transporter.sendMail({
      from: `"RSL Contact Form" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `[RSL Inquiry] ${inquiryType} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nInquiry type: ${inquiryType}\n\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error("Contact form error:", err)
    return Response.json(
      { success: false, error: "Failed to send your message. Please try again or contact us via WhatsApp." },
      { status: 500 }
    )
  }
}
