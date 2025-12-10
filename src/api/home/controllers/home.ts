/**
 * home controller
 */

import { factories } from "@strapi/strapi";
import { getOtherItems } from "../../../utils/getOtherItems";
import { getFeaturedArticles } from "../../../utils/getFeaturedArticles";
import { getCountryRecipe } from "../../../utils/getCountryRecipes";
import { getFooter } from "../../../utils/getFooter";

const mapMedia = (media: any, base: string) => {
  if (!media) return null;
  if (media.url) {
    return media.url.startsWith("http") ? media.url : base + media.url;
  }
  return null;
};

export const getRelatedAhsApprovedItems = async (
  strapi: any,
  excludeSlug: string,
  limit: number = 10
) => {
  const baseUrl = process.env.STRAPI_PUBLIC_URL;

  const mapImage = (img: any) =>
    img
      ? Array.isArray(img)
        ? img.map((i) => `${baseUrl}${i.url}`)
        : `${baseUrl}${img.url}`
      : null;

  const relatedRaw = await strapi.db
    .query("api::ahs-approved-item.ahs-approved-item")
    .findMany({
      where: {
        slug: { $ne: excludeSlug },
        publishedAt: { $notNull: true },
      },
      populate: {
        coverImage: true,
      },
      orderBy: { createdAt: "desc" },
      limit,
    });

  return relatedRaw.map((r: any) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    location: r.location,
    coverImageUrl: mapImage(r.coverImage),
  }));
};

export default factories.createCoreController(
  "api::home.home",
  ({ strapi }) => ({
    async find(ctx) {
      const baseUrl = process.env.STRAPI_PUBLIC_URL;

      ctx.query = {
        ...ctx.query,
        populate: {
          landingVideo: true,
          carousel: { populate: ["image"] },
          banner_1: { populate: ["image"] },
          banner_2: {
            populate: {
              image: true,
              videoItems: {
                populate: {
                  mainItems: { populate: ["item"] },
                  subItems: { populate: ["item"] },
                },
              },
            },
          },
          banner_3: { populate: ["image"] },
        },
      };

      const { results, pagination } = await strapi
        .service("api::home.home")
        .find(ctx.query);

      const otherItems = await getOtherItems({ strapi });
      const countryRecipe = await getCountryRecipe(strapi, baseUrl);
      const relatedAhsApprovedItems = await getRelatedAhsApprovedItems(
        strapi,
        "",
        10
      );
      const featuredArticles = await getFeaturedArticles(strapi);

      const footer = await getFooter(strapi, baseUrl);

      const data = results.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,

        landingVideo: mapMedia(item.landingVideo, baseUrl),

        carousel: (item.carousel || []).map((cr: any) => ({
          image: mapMedia(cr.image, baseUrl),
          alt: cr.alt,
        })),

        otherItems,

        banner_1: item.banner_1
          ? {
              title1: item.banner_1.title1,
              title2: item.banner_1.title2,
              image: mapMedia(item.banner_1.image, baseUrl),
              alt: item.banner_1.alt,
            }
          : null,

        banner_2: item.banner_2
          ? {
              title: item.banner_2.title,
              image: mapMedia(item.banner_2.image, baseUrl),
              alt: item.banner_2.alt,

              videoItems: item.banner_2.videoItems
                ? {
                    mainItems: (item.banner_2.videoItems.mainItems || []).map(
                      (mi: any) => ({
                        item: mapMedia(mi.item, baseUrl),
                        alt: mi.alt,
                      })
                    ),
                    subItems: (item.banner_2.videoItems.subItems || []).map(
                      (si: any) => ({
                        item: mapMedia(si.item, baseUrl),
                        alt: si.alt,
                      })
                    ),
                  }
                : null,
            }
          : null,

        countryRecipe,

        banner_3: item.banner_3
          ? {
              label: item.banner_3.label,
              image: mapMedia(item.banner_3.image, baseUrl),
              alt: item.banner_3.alt,
            }
          : null,

        relatedAhsApprovedItems,

        featuredArticles,

        footer,
      }));

      return {
        data,
        pagination,
      };
    },
  })
);
