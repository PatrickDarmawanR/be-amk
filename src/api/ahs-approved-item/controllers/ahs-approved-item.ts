/**
 * ahs-approved-item controller
 */

import { factories } from "@strapi/strapi";
import { getRelatedAhsApprovedItems } from "../../../utils/getRelatedAhsApprovedItems";


export default factories.createCoreController(
  "api::ahs-approved-item.ahs-approved-item",
  ({ strapi }) => ({

    async find(ctx) {
      const baseUrl = process.env.STRAPI_PUBLIC_URL;

      const mapImage = (img?: any) =>
        img
          ? Array.isArray(img)
            ? img.map((i) => `${baseUrl}${i.url}`)
            : `${baseUrl}${img.url}`
          : null;

      const mapRestaurantImages = (items?: any[]) =>
        Array.isArray(items)
          ? items.map((item) => ({
              id: item.id,
              imageUrl: mapImage(item.image),
            }))
          : [];

      const { results, pagination } = await strapi
        .service("api::ahs-approved-item.ahs-approved-item")
        .find({
          ...ctx.query,
          populate: {
            coverImage: true,
            restaurantImage: { populate: { image: true } },
          },
        });

      const data = results.map((entity) => ({
        id: entity.id,
        title: entity.title,
        slug: entity.slug,
        subTitle: entity.subTitle,
        description: entity.description,
        location: entity.location,
        gMaps: entity.gMaps,
        instagram: entity.instagram,
        phoneNumber: entity.phoneNumber,
        coverImageUrl: mapImage(entity.coverImage),
        restaurantImages: mapRestaurantImages(entity.restaurantImage),
      }));

      return ctx.send({ data, pagination });
    },

    async findOne(ctx) {
      const { slug } = ctx.params;
      const baseUrl = process.env.STRAPI_PUBLIC_URL;

      if (!slug) return ctx.badRequest("Slug is required");

      const mapImage = (img?: any) =>
        img
          ? Array.isArray(img)
            ? img.map((i) => `${baseUrl}${i.url}`)
            : `${baseUrl}${img.url}`
          : null;

      const mapRestaurantImages = (items?: any[]) =>
        Array.isArray(items)
          ? items.map((item) => ({
              id: item.id,
              imageUrl: mapImage(item.image),
            }))
          : [];

      const entity = await strapi.db
        .query("api::ahs-approved-item.ahs-approved-item")
        .findOne({
          where: { slug },
          populate: {
            coverImage: true,
            restaurantImage: { populate: { image: true } },
          },
        });

      if (!entity) return ctx.notFound("Approved item tidak ditemukan");

      const item = {
        id: entity.id,
        title: entity.title,
        slug: entity.slug,
        subTitle: entity.subTitle,
        description: entity.description,
        location: entity.location,
        gMaps: entity.gMaps,
        instagram: entity.instagram,
        phoneNumber: entity.phoneNumber,
        coverImageUrl: mapImage(entity.coverImage),
        restaurantImages: mapRestaurantImages(entity.restaurantImage),
      };

      const relatedAhsApprovedItems = await getRelatedAhsApprovedItems(strapi, slug, 10);

      return ctx.send({
        data: {
          item,
          relatedAhsApprovedItems,
        },
      });
    },
  })
);
