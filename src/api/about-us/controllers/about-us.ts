/**
 * about-us controller
 */

import { factories } from "@strapi/strapi";
import { getFeaturedArticles } from "../../../utils/getFeaturedArticles";

export default factories.createCoreController(
  "api::about-us.about-us",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {},
      };

      const { data, meta } = await super.find(ctx);
      const item = data?.[0];

      if (!item) return ctx.notFound("Data About Us tidak ditemukan");

      const attrs = item.attributes || item;

      const featuredArticles = await getFeaturedArticles(strapi);

      const result = {
        id: item.id,
        hrefCatalog: attrs.hrefCatalog ?? null,

        featuredArticle: featuredArticles,
      };

      return ctx.send({ data: result, meta });
    },
  })
);
