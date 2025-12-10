/**
 * product-kecap-inggeris controller
 */

import { factories } from "@strapi/strapi";
import { getOtherItems } from "../../../utils/getOtherItems";
import { getFooter } from "../../../utils/getFooter";
import { getCountryRecipe } from "../../../utils/getCountryRecipes";

export default factories.createCoreController(
  "api::product-kecap-inggeris.product-kecap-inggeris",
  ({ strapi }) => ({
    async find(ctx) {
      const { slug } = ctx.params || {};
      const baseUrl = process.env.STRAPI_PUBLIC_URL;

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
        background: p?.background?.url ? `${baseUrl}${p.background.url}` : null,
        items: Array.isArray(p?.itemsKecapInggeris)
          ? p.itemsKecapInggeris.map((i: any) => ({
              id: i.id ?? null,
              title: i.title ?? null,
              label: i.label ?? null,
              alt: i.alt ?? null,
              image: i?.image?.url ? `${baseUrl}${i.image.url}` : null,
              background: i?.background?.url
                ? `${baseUrl}${i.background.url}`
                : null,
            }))
          : [],
      });

      const product = slug
        ? data[0]
          ? formatProduct(data[0])
          : null
        : data.map(formatProduct);

      const other = await getOtherItems({ strapi });

      const otherItems = {
        asin: other.asin ?? [],
        inggeris: other.inggeris ?? [],
      };

      const countryRecipe = await getCountryRecipe(strapi, baseUrl);

      const footer = await getFooter(strapi, baseUrl);

      return ctx.send({ product, otherItems, countryRecipe, footer });
    },
  })
);
