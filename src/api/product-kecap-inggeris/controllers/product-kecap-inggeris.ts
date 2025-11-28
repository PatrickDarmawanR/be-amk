/**
 * product-kecap-inggeris controller
 */

import { factories } from "@strapi/strapi";
import { getOtherItems } from "../../../utils/getOtherItems";

export default factories.createCoreController(
  "api::product-kecap-inggeris.product-kecap-inggeris",
  ({ strapi }) => ({
    async find(ctx) {
      const { slug } = ctx.params || {};
      const base = process.env.STRAPI_PUBLIC_URL;

      const data = (await strapi.entityService.findMany(
        "api::product-kecap-inggeris.product-kecap-inggeris",
        {
          filters: slug ? { slug } : {},
          populate: {
            background: true,
            itemsKecapInggeris: { populate: ["image", "background"] },
          },
        }
      )) as any[];

      const formatProduct = (p: any) => ({
        id: p.id ?? null,
        slug: p.slug ?? null,
        title: p.title ?? null,
        alt: p.alt ?? null,
        description: p.description ?? null,
        background: p?.background?.url ? `${base}${p.background.url}` : null,
        items: Array.isArray(p?.itemsKecapInggeris)
          ? p.itemsKecapInggeris.map((i: any) => ({
              id: i.id ?? null,
              title: i.title ?? null,
              label: i.label ?? null,
              alt: i.alt ?? null,
              image: i?.image?.url ? `${base}${i.image.url}` : null,
              background: i?.background?.url ? `${base}${i.background.url}` : null,
            }))
          : [],
      });

      const product = slug ? (data[0] ? formatProduct(data[0]) : null) : data.map(formatProduct);

      const other = await getOtherItems({ strapi });

      const otherItems = other?.merged ?? [];

      return ctx.send({ product, otherItems });
    },
  })
);
