/**
 * certificate controller
 */

import { factories } from "@strapi/strapi";
import { getFeaturedArticles } from "../../../utils/getFeaturedArticles";

export default factories.createCoreController(
  "api::certificate.certificate",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          kecapInggeris: {
            populate: {
              imageBackground: true,
              logo: true,
              certificateListKI: { populate: "*" },
              certificateFileKI: { populate: "*" },
            },
          },
          kecapAsin: {
            populate: {
              imageBackground: true,
              logo: true,
              certificateListKA: { populate: "*" },
              certificateFileKA: { populate: "*" },
            },
          },
        },
      };

      const { data, meta } = await super.find(ctx);
      const baseUrl = process.env.STRAPI_PUBLIC_URL;

      const item = data?.[0];
      if (!item) return ctx.notFound("Data certificate tidak ditemukan");

      const attrs = item.attributes || item;

      const mapImage = (img) =>
        img
          ? Array.isArray(img)
            ? img.map((i) => `${baseUrl}${i.url}`)
            : `${baseUrl}${img.url}`
          : null;

      const kecapInggeris = attrs.kecapInggeris && {
        title: attrs.kecapInggeris.title || null,
        imageBackground: mapImage(attrs.kecapInggeris.imageBackground),
        logo: mapImage(attrs.kecapInggeris.logo),

        certificateListKI:
          attrs.kecapInggeris.certificateListKI?.map((item) => ({
            icon: mapImage(item.icon),
            certificateName: item.certificateName,
          })) || [],

        info: attrs.kecapInggeris.info || null,

        certificateFileKI:
          attrs.kecapInggeris.certificateFileKI?.map((file) => ({
            alt: file.alt || null,
            image: mapImage(file.image),
            caption: file.caption || null,
            href: file.href ? `${baseUrl}${file.href.url}` : null,
          })) || [],
      };

      const kecapAsin = attrs.kecapAsin && {
        title: attrs.kecapAsin.title || null,
        imageBackground: mapImage(attrs.kecapAsin.imageBackground),
        logo: mapImage(attrs.kecapAsin.logo),

        certificateListKA:
          attrs.kecapAsin.certificateListKA?.map((item) => ({
            icon: mapImage(item.icon),
            certificateName: item.certificateName,
          })) || [],

        info: attrs.kecapAsin.info || null,

        certificateFileKA:
          attrs.kecapAsin.certificateFileKA?.map((file) => ({
            alt: file.alt || null,
            image: mapImage(file.image),
            caption: file.caption || null,
            href: file.href ? `${baseUrl}${file.href.url}` : null,
          })) || [],
      };

      const featuredArticles = await getFeaturedArticles(strapi);

      const result = {
        id: item.id,
        kecapInggeris,
        kecapAsin,
        featuredArticles,
      };

      ctx.send({ data: result, meta });
    },
  })
);
