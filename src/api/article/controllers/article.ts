/**
 * article controller
 */

import { factories } from "@strapi/strapi";
import { getFooter } from "../../../utils/getFooter";

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }) => ({
    async find(ctx) {
      const baseUrl = process.env.STRAPI_PUBLIC_URL;

      const footer = await getFooter(strapi, baseUrl);

      const entities = await strapi.db.query("api::article.article").findMany({
        populate: {
          article_items: { populate: { image: true } },
        },
        limit: 1,
      });

      if (!entities?.length) {
        return ctx.notFound("Data artikel tidak ditemukan");
      }

      const article = entities[0];
      const allItems = article.article_items || [];

      const sortedItems = allItems.sort((a: any, b: any) => {
        const dateA = new Date(a.publishedDateTime || a.createdAt).getTime();
        const dateB = new Date(b.publishedDateTime || b.createdAt).getTime();
        return dateB - dateA;
      });

      const mapImage = (img: any) =>
        img
          ? Array.isArray(img)
            ? img.map((i) => `${baseUrl}${i.url}`)
            : `${baseUrl}${img.url}`
          : null;

      const data = {
        id: article.id,
        title: article.title,
        articles: sortedItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          publishedDateTime: item.publishedDateTime,
          imageUrl: mapImage(item.image),
        })),
        footer,
      };

      return ctx.send({ data });
    },
  })
);
