/**
 * product-kecap-inggeris controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product-kecap-inggeris.product-kecap-inggeris",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          image: true,
          background: true,
        },
      };

      const { data, meta } = await super.find(ctx);
      const baseUrl = process.env.STRAPI_PUBLIC_URL;

      const mapImage = (img) =>
        img ? `${baseUrl}${img.url}` : null;

      const result = data.map((item) => {
        const attrs = item.attributes || item;

        return {
          id: item.id,
          title: attrs.title,
          slug: attrs.slug,
          label: attrs.label,
          alt: attrs.alt,
          image: mapImage(attrs.image),
          background: mapImage(attrs.background),
        };
      });

      return ctx.send({ data: result, meta });
    },

    async findOne(ctx) {
      const { slug } = ctx.params;

      ctx.query = {
        ...ctx.query,
        populate: {
          image: true,
          background: true,
        },
      };

      const { data } = await super.find(ctx);
      const baseUrl = process.env.STRAPI_PUBLIC_URL;

      const item = data.find((i) => i.attributes.slug === slug);
      if (!item)
        return ctx.notFound("Product Kecap Inggeris tidak ditemukan");

      const attrs = item.attributes;

      const mapImage = (img) =>
        img ? `${baseUrl}${img.url}` : null;

      const result = {
        id: item.id,
        title: attrs.title,
        slug: attrs.slug,
        label: attrs.label,
        alt: attrs.alt,
        image: mapImage(attrs.image),
        background: mapImage(attrs.background),
      };

      return ctx.send({ data: result });
    },
  })
);
