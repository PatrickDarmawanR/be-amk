/**
 * article-item controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::article-item.article-item",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { slug } = ctx.params;
      const baseUrl = process.env.STRAPI_PUBLIC_URL;

      const toGMT7 = (dateString?: string | Date | null) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return new Date(date.getTime() + 7 * 60 * 60 * 1000).toISOString();
      };

      const mapImage = (img?: { url?: string } | { url?: string }[]) =>
        img
          ? Array.isArray(img)
            ? img.map((i) => `${baseUrl}${i.url}`)
            : `${baseUrl}${img.url}`
          : null;

      // Ambil article by slug
      const entity = await strapi.db
        .query("api::article-item.article-item")
        .findOne({
          where: { slug },
          populate: { image: true },
        });

      if (!entity) return ctx.notFound("Artikel tidak ditemukan");

      // Ambil related articles
      const relatedArticlesRaw = await strapi.db
        .query("api::article-item.article-item")
        .findMany({
          where: {
            slug: { $ne: slug },
            publishedAt: { $notNull: true },
          },
          populate: { image: true },
          orderBy: { publishedDateTime: "desc" },
        });

      const relatedArticles = relatedArticlesRaw
        .filter(
          (v, index, arr) => arr.findIndex((x) => x.slug === v.slug) === index
        )
        .map((a) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          publishedDateTime: toGMT7(a.publishedDateTime),
          imageUrl: mapImage(a.image),
        }));

      const data = {
        article: {
          id: entity.id,
          title: entity.title,
          slug: entity.slug,
          description: entity.description,
          publishedDateTime: toGMT7(entity.publishedDateTime),
          imageUrl: mapImage(entity.image),
        },
        relatedArticles,
      };

      return ctx.send({ data });
    },
  })
);
