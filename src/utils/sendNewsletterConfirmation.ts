import nodemailer from "nodemailer";

type SendResult = any;

export async function sendNewsletterConfirmation(toEmail: string): Promise<SendResult> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("SMTP configuration incomplete. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env");
  }

  const from = process.env.EMAIL_FROM;
  const subject = process.env.NEWSLETTER_SUBJECT;
  const htmlTemplate = process.env.NEWSLETTER_HTML;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: secure ?? (port === 465),
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from,
    to: toEmail,
    subject,
    text: `Terima kasih. Anda telah berlangganan.`,
    html: htmlTemplate.replace("{{email}}", toEmail),
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}
