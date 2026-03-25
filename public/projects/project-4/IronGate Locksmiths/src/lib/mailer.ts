import nodemailer from "nodemailer";
import { Resend } from "resend";

import { siteConfig } from "@/lib/content";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  message: string;
};

type MailDeliveryResult = {
  mode: "resend" | "smtp" | "dev-log";
};

function createHtml(payload: ContactPayload) {
  return `
    <h2>New Irongate Locksmiths enquiry</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Phone:</strong> ${payload.phone}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Service:</strong> ${payload.serviceType}</p>
    <p><strong>Message:</strong></p>
    <p>${payload.message.replace(/\n/g, "<br />")}</p>
  `;
}

export async function sendContactEmail(payload: ContactPayload): Promise<MailDeliveryResult> {
  const html = createHtml(payload);
  const subject = `New enquiry: ${payload.serviceType}`;

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Irongate Locksmiths <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? siteConfig.email,
      replyTo: payload.email,
      subject,
      html,
    });

    return { mode: "resend" };
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: String(process.env.SMTP_SECURE ?? "false") === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL ?? siteConfig.email,
      replyTo: payload.email,
      subject,
      html,
      text: `${payload.name}\n${payload.phone}\n${payload.email}\n${payload.serviceType}\n\n${payload.message}`,
    });

    return { mode: "smtp" };
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[contact-form] Email transport not configured. Logging enquiry for local development.", payload);

    return { mode: "dev-log" };
  }

  throw new Error("Email is not configured. Add RESEND_API_KEY or SMTP credentials.");
}