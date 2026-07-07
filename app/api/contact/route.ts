import { NextRequest } from "next/server"
import nodemailer from "nodemailer"
import { checkRateLimit } from "@/lib/security/rateLimit"
import sql from "@/lib/db"

export const runtime = "nodejs"

async function sendWithResend(from: string, to: string, replyTo: string, subject: string, text: string, html: string) {
  const { Resend } = await import("resend")
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({ from, to, replyTo, subject, text, html })
}

async function sendWithSmtp(smtpUser: string, to: string, replyTo: string, subject: string, text: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || "587"),
    secure: Number(process.env.SMTP_PORT || "587") === 465,
    auth: { user: smtpUser, pass: process.env.SMTP_PASS },
  })
  await transporter.sendMail({ from: `"RSL Contact Form" <${smtpUser}>`, to, replyTo, subject, text, html })
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown"
    if (!checkRateLimit(ip, 5, 10 * 60 * 1000)) {
      return Response.json({ success: false, error: "Too many requests." }, { status: 429 })
    }

    const body = await req.json()
    const name = body?.name
    const email = body?.email
    const message = body?.message
    const inquiryType = body?.inquiryType
    const phone = body?.phone ?? null

    if (body?.company) return Response.json({ success: true })

    if (!name || !email || !message || !inquiryType) {
      return Response.json({ success: false, error: "Missing required fields." }, { status: 400 })
    }

    // Save to database
    try {
      if (sql) await sql`INSERT INTO contact_submissions (name, email, phone, message) VALUES (${name}, ${email}, ${phone}, ${message})`
      console.log("Contact submission stored:", email, new Date().toISOString())
    } catch (dbErr) {
      console.error("DB insert failed — name:", name, "email:", email, "error:", dbErr)
      // Continue to email sending even if DB fails — do not block the user
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "vanrillsingh@gmail.com"
    const subject = `[RSL Inquiry] ${inquiryType} - ${name}`
    const text = `Name: ${name}\nEmail: ${email}\nInquiry type: ${inquiryType}\n\n${message}`
    const html = `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Inquiry Type:</strong> ${inquiryType}</p><hr /><p>${message.replace(/\n/g, "<br />")}</p>`

    const hasResend = !!process.env.RESEND_API_KEY
    const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)

    if (!hasResend && !hasSmtp) {
      return Response.json({ success: false, error: "Mail service is not configured." }, { status: 500 })
    }

    if (hasResend) {
      try {
        const fromAddress = process.env.RESEND_FROM_EMAIL || "RSL Contact Form <onboarding@resend.dev>"
        await sendWithResend(fromAddress, receiverEmail, email, subject, text, html)
        return Response.json({ success: true })
      } catch (resendErr) {
        console.error("Resend send failed:", resendErr)
        if (!hasSmtp) {
          return Response.json({ success: false, error: "Failed to send your message." }, { status: 500 })
        }
      }
    }

    if (hasSmtp) {
      await sendWithSmtp(process.env.SMTP_USER!, receiverEmail, email, subject, text, html)
      return Response.json({ success: true })
    }

    return Response.json({ success: false, error: "Failed to send your message." }, { status: 500 })
  } catch (err) {
    console.error("Contact form error:", err)
    return Response.json({ success: false, error: "Failed to send your message." }, { status: 500 })
  }
}
