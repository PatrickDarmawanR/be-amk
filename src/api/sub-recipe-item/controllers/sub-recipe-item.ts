/**
 * sub-recipe-item controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::sub-recipe-item.sub-recipe-item",
  ({ strapi }) => ({

    async find(ctx) {
      const baseUrl = process.env.STRAPI_PUBLIC_URL;

      const mapImage = (img: any) =>
        img ? `${baseUrl}${img.url}` : null;

      const { results, pagination } = await strapi
        .service("api::sub-recipe-item.sub-recipe-item")
        .find({
          ...ctx.query,
          populate: {
            coverImage: true,
            thumbnailImage: true,
          },
        });

      const data = results.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        country: item.country,
        sauce1: item.sauce1,
        sauce2: item.sauce2,
        portion: item.portion,
        time: item.time,
        hrefYoutube: item.hrefYoutube,
        ingredient: item.ingredient,
        instructions: item.instructions,
        coverImageUrl: mapImage(item.coverImage),
        thumbnailImageUrl: mapImage(item.thumbnailImage),
      }));

      return ctx.send({ data, pagination });
    },

    async findOne(ctx) {
      const { slug } = ctx.params;
      const baseUrl = process.env.STRAPI_PUBLIC_URL || "";

      if (!slug) return ctx.badRequest("Slug is required");

      const mapImage = (img: any) =>
        img ? `${baseUrl}${img.url}` : null;

      const entity = await strapi.db
        .query("api::sub-recipe-item.sub-recipe-item")
        .findOne({
          where: { slug },
          populate: {
            coverImage: true,
            thumbnailImage: true,
          },
        });

      if (!entity) return ctx.notFound("Sub Recipe item tidak ditemukan");

      const data = {
        id: entity.id,
        title: entity.title,
        slug: entity.slug,
        country: entity.country,
        sauce1: entity.sauce1,
        sauce2: entity.sauce2,
        portion: entity.portion,
        time: entity.time,
        hrefYoutube: entity.hrefYoutube,
        ingredient: entity.ingredient,
        instructions: entity.instructions,
        coverImageUrl: mapImage(entity.coverImage),
        thumbnailImageUrl: mapImage(entity.thumbnailImage),
      };

      return ctx.send({ data });
    },
  })
);
