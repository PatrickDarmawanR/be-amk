/**
 * footer controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::footer.footer",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          image: true,
          socialMedia: { populate: { icon: true } },
        },
      };

      const { data, meta } = await super.find(ctx);
      const baseUrl = process.env.STRAPI_PUBLIC_URL;

      const item = data?.[0];
      if (!item) return ctx.notFound("Data footer tidak ditemukan");

      const attrs = item.attributes || item;

      const mapImage = (img: any) =>
        img
          ? Array.isArray(img)
            ? img.map((i) => `${baseUrl}${i.url}`)
            : `${baseUrl}${img.url}`
          : null;

      const result = {
        id: item.id,
        title: attrs.title || null,
        imageUrl: mapImage(attrs.image),

        socialMedia:
          attrs.socialMedia?.map((sm) => ({
            key: sm.key || null,
            alt: sm.alt || null,
            href: sm.href || null,
            iconUrl: mapImage(sm.icon),
          })) || [],
      };

      return ctx.send({ data: result, meta });
    },
  })
);
