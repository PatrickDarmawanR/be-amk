/**
 * ahs-approved controller (Strapi v5 + TypeScript)
 */

import { factories } from "@strapi/strapi";
import { getFeaturedArticles } from "../../../utils/getFeaturedArticles";

export default factories.createCoreController(
  "api::ahs-approved.ahs-approved",
  ({ strapi }) => ({
    async find(ctx) {
      const baseUrl = process.env.STRAPI_PUBLIC_URL;
      const search = ctx.query.search ? String(ctx.query.search) : "";

      const itemFilters = search
        ? {
            $or: [
              { title: { $containsi: search } },
              { slug: { $containsi: search } },
              { location: { $containsi: search } },
            ],
          }
        : {};

      const entities = await strapi.db
        .query("api::ahs-approved.ahs-approved")
        .findMany({
          populate: {
            ahs_approved_items: {
              where: itemFilters,
              populate: { coverImage: true },
            },
          },
          limit: 1,
        });

      if (!entities?.length) {
        return ctx.notFound("Data AHS Approved tidak ditemukan");
      }

      const approved = entities[0];
      const items = approved.ahs_approved_items || [];

      const mapImage = (img: any) =>
        img && img.url ? `${baseUrl}${img.url}` : null;

      const approvedItems = items.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        location: item.location,
        coverImage: mapImage(item.coverImage),
      }));

      const featuredArticles = await getFeaturedArticles(strapi);

      if (search && approvedItems.length === 0) {
        return {
          data: {
            id: approved.id,
            items: [],
            message: `Tidak ada data yang cocok dengan pencarian: "${search}"`,
            featuredArticles,
          },
        };
      }

      return {
        data: {
          id: approved.id,
          items: approvedItems,
          featuredArticles,
        },
      };
    },
  })
);
