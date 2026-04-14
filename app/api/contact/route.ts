import { NextRequest } from "next/server"
import nodemailer from "nodemailer"
import { checkRateLimit } from "@/lib/security/rateLimit"

export const runtime = "nodejs"

async function sendWithResend(
  from: string,
  to: string,
  replyTo: string,
  subject: string,
  text: string,
  html: string
) {
  const { Resend } = await import("resend")
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from,
    to,
    replyTo,
    subject,
    text,
    html,
  })
}

async function sendWithSmtp(
  smtpUser: string,
  to: string,
  replyTo: string,
  subject: string,
  text: string,
  html: string
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || "587"),
    secure: Number(process.env.SMTP_PORT || "587") === 465,
    auth: {
      user: smtpUser,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"RSL Contact Form" <${smtpUser}>`,
    to,
    replyTo,
    subject,
    text,
    html,
  })
}

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

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "vanrillsingh@gmail.com"
    const subject = `[RSL Inquiry] ${inquiryType} — ${name}`
    const text = `Name: ${name}\nEmail: ${email}\nInquiry type: ${inquiryType}\n\n${message}`
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br />")}</p>
    `

    const hasResend = !!process.env.RESEND_API_KEY
    const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)

    if (!hasResend && !hasSmtp) {
      console.error("No email provider configured. Set RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS.")
      return Response.json(
        { success: false, error: "Mail service is not configured. Please try again later." },
        { status: 500 }
      )
    }

    // Try Resend first (more reliable in serverless), fall back to SMTP
    if (hasResend) {
      try {
        const fromAddress = process.env.RESEND_FROM_EMAIL || "RSL Contact Form <onboarding@resend.dev>"
        await sendWithResend(fromAddress, receiverEmail, email, subject, text, html)
        return Response.json({ success: true })
      } catch (resendErr) {
        console.error("Resend send failed:", resendErr)
        // Fall through to SMTP if available
        if (!hasSmtp) {
          return Response.json(
            { success: false, error: "Failed to send your message. Please try again or contact us via WhatsApp." },
            { status: 500 }
          )
        }
      }
    }

    if (hasSmtp) {
      await sendWithSmtp(
        process.env.SMTP_USER!,
        receiverEmail,
        email,
        subject,
        text,
        html
      )
      return Response.json({ success: true })
    }

    return Response.json(
      { success: false, error: "Failed to send your message. Please try again or contact us via WhatsApp." },
      { status: 500 }
    )
  } catch (err) {
    console.error("Contact form error:", err)
    return Response.json(
      { success: false, error: "Failed to send your message. Please try again or contact us via WhatsApp." },
      { status: 500 }
    )
  }
}
