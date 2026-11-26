import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface InquiryPayload {
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  country?: string;
  product?: string;
  quantity?: string;
  message?: string;
  website?: string; // Honeypot field
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function stripLineBreaks(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || "465");
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true"
      : port === 465;
  const user = process.env.SMTP_USER?.trim();
  let pass = process.env.SMTP_PASS?.trim();
  // Gmail App Passwords are often copied in 4-letter groups with spaces ("xxxx xxxx xxxx xxxx")
  if (host?.toLowerCase() === "smtp.gmail.com" && pass && /^[a-z0-9]{4}(\s+[a-z0-9]{4}){3}$/i.test(pass)) {
    pass = pass.replace(/\s+/g, "");
  }
  const from = process.env.SMTP_FROM?.trim() || (user ? `DCHIND EXPORTS <${user}>` : "");
  const to = process.env.INQUIRY_TO_EMAIL?.trim() || user || "";

  const isConfigured = Boolean(host && user && pass && to);
  return { host, port, secure, user, pass, from, to, isConfigured };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryPayload;

    // Honeypot check: silently accept spam traps without sending email
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true, referenceId: "DCH-SPAM-FILTERED" });
    }

    const fullName = stripLineBreaks(body.fullName ?? "");
    const companyName = stripLineBreaks(body.companyName ?? "");
    const email = stripLineBreaks(body.email ?? "");
    const phone = stripLineBreaks(body.phone ?? "");
    const country = stripLineBreaks(body.country ?? "");
    const product = stripLineBreaks(body.product ?? "");
    const quantity = stripLineBreaks(body.quantity ?? "");
    const message = (body.message ?? "").trim();

    const fieldErrors: Record<string, string> = {};

    if (fullName.length < 2) {
      fieldErrors.fullName = "Please enter your full name (at least 2 characters).";
    }
    if (companyName.length < 2) {
      fieldErrors.companyName = "Please enter your company name.";
    }
    if (!EMAIL_REGEX.test(email)) {
      fieldErrors.email = "Enter an email address in the format name@company.com.";
    }
    if (phone.length < 6) {
      fieldErrors.phone = "Please enter a valid contact phone number.";
    }
    if (country.length < 2) {
      fieldErrors.country = "Please specify your destination country.";
    }
    if (product.length < 2) {
      fieldErrors.product = "Please select a copper product category.";
    }
    if (quantity.length < 1) {
      fieldErrors.quantity = "Please specify your estimated quantity required.";
    }
    if (message.length < 10) {
      fieldErrors.message = "Please provide inquiry details (at least 10 characters).";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please review the highlighted fields and try again.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const referenceId = `DCH-${Date.now().toString(36).toUpperCase()}`;
    const smtp = getSmtpConfig();

    if (!smtp.isConfigured) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            ok: false,
            error: "Email service is not configured yet. Please contact us directly via email or phone.",
          },
          { status: 503 }
        );
      }

      console.warn(
        `[Inquiry ${referenceId}] SMTP env vars (SMTP_HOST, SMTP_USER, SMTP_PASS) not set in .env.local. Skipping email send in development.`
      );

      return NextResponse.json(
        {
          ok: true,
          emailSent: false,
          referenceId,
          message:
            "Your business inquiry has been received (SMTP not yet configured in .env.local).",
        },
        { status: 201 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });

    const plainText = [
      `New Business Inquiry - DCHIND EXPORTS`,
      `Reference ID: ${referenceId}`,
      `----------------------------------------`,
      `Full Name: ${fullName}`,
      `Company: ${companyName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Country: ${country}`,
      `Product Interested In: ${product}`,
      `Quantity Required: ${quantity}`,
      ``,
      `Message:`,
      message,
    ].join("\n");

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; background:#07111B; color:#F8FAFC; padding:24px; border-radius:12px;">
        <div style="border-bottom:2px solid #C87535; padding-bottom:12px; margin-bottom:20px;">
          <h2 style="margin:0; color:#E58A45;">New Business Inquiry — DCHIND EXPORTS</h2>
          <p style="margin:6px 0 0; color:#A7B4C2; font-size:13px;">Reference ID: <strong style="color:#F8FAFC;">${escapeHtml(referenceId)}</strong></p>
        </div>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr><td style="padding:8px 0; color:#A7B4C2; width:180px;">Full Name</td><td style="padding:8px 0; color:#F8FAFC;">${escapeHtml(fullName)}</td></tr>
          <tr><td style="padding:8px 0; color:#A7B4C2;">Company</td><td style="padding:8px 0; color:#F8FAFC;">${escapeHtml(companyName)}</td></tr>
          <tr><td style="padding:8px 0; color:#A7B4C2;">Email</td><td style="padding:8px 0; color:#E58A45;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 0; color:#A7B4C2;">Phone</td><td style="padding:8px 0; color:#F8FAFC;">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding:8px 0; color:#A7B4C2;">Country</td><td style="padding:8px 0; color:#F8FAFC;">${escapeHtml(country)}</td></tr>
          <tr><td style="padding:8px 0; color:#A7B4C2;">Product</td><td style="padding:8px 0; color:#E58A45; font-weight:bold;">${escapeHtml(product)}</td></tr>
          <tr><td style="padding:8px 0; color:#A7B4C2;">Quantity Required</td><td style="padding:8px 0; color:#F8FAFC;">${escapeHtml(quantity)}</td></tr>
        </table>
        <div style="margin-top:20px; padding:16px; background:#0C1B29; border:1px solid rgba(255,255,255,0.1); border-radius:8px;">
          <p style="margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:1px; color:#E58A45;">Message</p>
          <p style="margin:0; white-space:pre-wrap; line-height:1.6; color:#F8FAFC;">${escapeHtml(message)}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: smtp.from,
      to: smtp.to,
      replyTo: email,
      subject: `[${referenceId}] New Copper Inquiry: ${product} (${quantity}) — ${companyName}`,
      text: plainText,
      html: htmlBody,
    });

    if (process.env.SMTP_SEND_AUTOREPLY === "true") {
      await transporter.sendMail({
        from: smtp.from,
        to: email,
        subject: `Inquiry Received [${referenceId}] — DCHIND EXPORTS`,
        text: `Dear ${fullName},\n\nThank you for contacting DCHIND EXPORTS regarding ${product} (${quantity}).\nYour inquiry reference ID is ${referenceId}. Our trade desk will review your requirements and respond shortly.\n\nBest regards,\nDCHIND EXPORTS`,
      });
    }

    return NextResponse.json(
      {
        ok: true,
        emailSent: true,
        referenceId,
        message: "Your business inquiry has been sent to the DCHIND EXPORTS trade desk.",
      },
      { status: 201 }
    );
  } catch (error) {
    const err = error as { code?: string; responseCode?: number; message?: string };
    const isAuthError = err?.code === "EAUTH" || err?.responseCode === 535;
    const devDetail = isAuthError
      ? "SMTP login rejected (535). Check SMTP_USER and make sure SMTP_PASS is a valid 16-character App Password (not your regular Gmail password)."
      : err?.message || "SMTP delivery failed.";

    console.warn("SMTP inquiry delivery failed:", err?.message || error);

    return NextResponse.json(
      {
        ok: false,
        error:
          process.env.NODE_ENV !== "production"
            ? devDetail
            : "Unable to send your inquiry right now. Please try again shortly.",
      },
      { status: isAuthError ? 502 : 500 }
    );
  }
}
