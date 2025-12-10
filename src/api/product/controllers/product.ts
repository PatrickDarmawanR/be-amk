/**
 * product controller
 */

import { factories } from "@strapi/strapi";
import { getFooter } from "../../../utils/getFooter";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          section_1: {
            populate: {
              eCommerce: { populate: { icon: true } },
            },
          },
          section_2: {
            populate: {
              kecapInggeris: {
                populate: {
                  kecapInggerisItems: {
                    populate: {
                      product_kecap_inggeris: {
                        populate: ["background", "itemsKecapInggeris.image", "itemsKecapInggeris.background"]
                      },
                    },
                  },
                },
              },
              kecapAsin: {
                populate: {
                  kecapAsinItems: {
                    populate: {
                      product_kecap_asin: {
                        populate: ["background", "itemsKecapAsin.image", "itemsKecapAsin.background"]
                      },
                    },
                  },
                },
              },
            },
          },
          section_3: { populate: "*" },
        },
      };

      const { data, meta } = await super.find(ctx);
      const baseUrl = process.env.STRAPI_PUBLIC_URL;

      const item = data?.[0];
      if (!item) return ctx.notFound("Data product tidak ditemukan");

      const attrs = item.attributes || item;

      const mapImage = (img) =>
        img
          ? Array.isArray(img)
            ? img.map((i) => `${baseUrl}${i.url}`)
            : `${baseUrl}${img.url}`
          : null;

      const section_1 = attrs.section_1 && {
        text_1: attrs.section_1.text_1,
        text_2: attrs.section_1.text_2,
        text_3: attrs.section_1.text_3,
        text_4: attrs.section_1.text_4,

        eCommerce:
          attrs.section_1.eCommerce?.map((e) => ({
            id: e.id,
            alt: e.alt,
            href: e.href,
            icon: mapImage(e.icon),
          })) || [],
      };

      const mapSingleProduct = (prod) =>
        !prod
          ? null
          : {
              id: prod.id,
              title: prod.title,
              slug: prod.slug,
              alt: prod.alt,
              description: prod.description,
              background: mapImage(prod.background),

              items:
                (prod.itemsKecapInggeris || prod.itemsKecapAsin || []).map((i) => ({
                  title: i.title,
                  label: i.label,
                  alt: i.alt,
                  image: mapImage(i.image),
                  background: mapImage(i.background),
                })),
            };

      const section_2 = attrs.section_2 && {
        kecapInggeris: attrs.section_2.kecapInggeris
          ? {
              title: attrs.section_2.kecapInggeris.title,
              product: mapSingleProduct(
                attrs.section_2.kecapInggeris.kecapInggerisItems?.product_kecap_inggeris
              ),
            }
          : null,

        kecapAsin: attrs.section_2.kecapAsin
          ? {
              title: attrs.section_2.kecapAsin.title,
              product: mapSingleProduct(
                attrs.section_2.kecapAsin.kecapAsinItems?.product_kecap_asin
              ),
            }
          : null,
      };

      const section_3 = attrs.section_3 && {
        title: attrs.section_3.title,
      };

      const footer = await getFooter(strapi, baseUrl);

      const result = {
        id: item.id,
        section_1,
        section_2,
        section_3,
        footer,
      };

      return ctx.send({ data: result, meta });
    },
  })
);
