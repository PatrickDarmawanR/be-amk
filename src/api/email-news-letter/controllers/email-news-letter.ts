/**
 * email-news-letter controller
 */

import { factories } from "@strapi/strapi";
import { sendNewsletterConfirmation } from "../../../utils/sendNewsletterConfirmation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export default factories.createCoreController(
  "api::email-news-letter.email-news-letter",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const { email } = ctx.request.body ?? {};

        if (!email) {
          return ctx.badRequest("Email wajib diisi");
        }

        if (!EMAIL_REGEX.test(String(email).trim())) {
          return ctx.badRequest("Format email tidak valid");
        }

        const normalized = String(email).trim().toLowerCase();

        const existing = await strapi.db
          .query("api::email-news-letter.email-news-letter")
          .findOne({ where: { email: normalized } });

        if (existing) {
          return ctx.badRequest("Email sudah terdaftar");
        }

        const entry = await strapi.db
          .query("api::email-news-letter.email-news-letter")
          .create({
            data: { email: normalized },
          });

        let emailResult = null;
        let emailSent = false;
        let message = "";
        let status = 0;

        try {
          const raw = await sendNewsletterConfirmation(normalized);

          emailResult = {
            accepted: raw.accepted,
            rejected: raw.rejected,
            messageId: raw.messageId,
          };

          emailSent = true;
          status = 200;
          message = "Pendaftaran newsletter berhasil. Email konfirmasi berhasil dikirim.";
        } catch (err) {
          strapi.log.error("Gagal mengirim email newsletter:", err);

          emailResult = { error: err?.message || String(err) };
          emailSent = false;
          status = 500;
          message = "Pendaftaran berhasil, namun email konfirmasi gagal dikirim.";
        }

        const response = {
          data: {
            id: entry.id,
            email: entry.email,
          },
          meta: {
            emailSent,
            emailResult,
            status,
            message,
          },
        };

        return ctx.created(response);
      } catch (err) {
        strapi.log.error("Error email-news-letter.create:", err);
        return ctx.internalServerError("Terjadi kesalahan pada server");
      }
    },
  })
);
