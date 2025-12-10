import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmailForgotPassword({
  to,
  subject,
  html,
  text,
}: EmailOptions) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT
    ? Number(process.env.SMTP_PORT)
    : undefined;
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM;

  if (!host || !port || !user || !pass || !from) {
    throw new Error("SMTP configuration incomplete.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: secure ?? port === 465,
    auth: { user, pass },
  });

  return transporter.sendMail({ from, to, subject, html, text });
}
