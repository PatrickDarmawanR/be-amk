/**
 * product controller
 */

import { factories } from "@strapi/strapi";

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
                      background: true,
                      product_kecap_inggerises: {
                        populate: ["image", "background"],
                      },
                    },
                  },
                },
              },
              kecapAsin: {
                populate: {
                  kecapAsinItems: {
                    populate: {
                      background: true,
                      product_kecap_asins: {
                        populate: ["image", "background"],
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

      const formatProductItems = (items, type) =>
        !items
          ? null
          : {
              title: items.title,
              description: items.description,
              alt: items.alt,
              background: mapImage(items.background),

              products: (items[type] || []).map((p) => ({
                id: p.id,
                title: p.title,
                slug: p.slug,
                label: p.label,
                alt: p.alt,
                image: mapImage(p.image),
                background: mapImage(p.background),
              })),
            };

      const section_2 = attrs.section_2 && {
        kecapInggeris: attrs.section_2.kecapInggeris
          ? {
              title: attrs.section_2.kecapInggeris.title,
              items: formatProductItems(
                attrs.section_2.kecapInggeris.kecapInggerisItems,
                "product_kecap_inggerises"
              ),
            }
          : null,

        kecapAsin: attrs.section_2.kecapAsin
          ? {
              title: attrs.section_2.kecapAsin.title,
              items: formatProductItems(
                attrs.section_2.kecapAsin.kecapAsinItems,
                "product_kecap_asins"
              ),
            }
          : null,
      };

      const section_3 = attrs.section_3 && {
        title: attrs.section_3.title,
      };

      const result = {
        id: item.id,
        section_1,
        section_2,
        section_3,
      };

      return ctx.send({ data: result, meta });
    },
  })
);
