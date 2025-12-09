/**
 * recipe controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::recipe.recipe",
  ({ strapi }) => ({
    async find(ctx) {
      const base = process.env.STRAPI_PUBLIC_URL;

      const filterCountry = ctx.query.country
        ? String(ctx.query.country).toLowerCase().trim()
        : "";

      const filterSauces = ctx.query.sauce
        ? String(ctx.query.sauce)
            .split(",")
            .map((s) => s.toLowerCase().trim())
        : [];

      ctx.query = {
        ...ctx.query,
        populate: {
          mainRecipe: {
            populate: {
              main_recipe_items: {
                populate: ["coverImage", "thumbnailImage"],
              },
            },
          },
          subRecipe: {
            populate: {
              countryRecipe: { populate: ["image"] },
              sauceRecipe: { populate: ["image"] },
              recipeItem: {
                populate: {
                  sub_recipe_items: {
                    populate: ["coverImage", "thumbnailImage"],
                  },
                },
              },
            },
          },
        },
      };

      const { results, pagination } = await strapi
        .service("api::recipe.recipe")
        .find(ctx.query);

      const mapImg = (img: any) => {
        if (!img) return null;
        if (img.url)
          return img.url.startsWith("http") ? img.url : base + img.url;
        return null;
      };

      const filterSubItems = (items: any[]) => {
        return items.filter((sri) => {
          let pass = true;

          const countryValue = String(sri.country || "").toLowerCase().trim();
          const sauce1Value = String(sri.sauce1 || "").toLowerCase().trim();
          const sauce2Value = String(sri.sauce2 || "").toLowerCase().trim();

          if (filterCountry) {
            pass = pass && countryValue === filterCountry;
          }

          if (filterSauces.length > 0) {
            const match =
              filterSauces.includes(sauce1Value) ||
              filterSauces.includes(sauce2Value);
            pass = pass && match;
          }

          return pass;
        });
      };

      const data = results.map((item: any) => {
        const mainRecipe = (item.mainRecipe || []).map((m: any) => ({
          main_recipe_items: (m.main_recipe_items || []).map((x: any) => ({
            id: x.id,
            title: x.title,
            slug: x.slug,
            coverImage: mapImg(x.coverImage),
          })),
        }));

        const subRecipe = {
          countryRecipe: (item.subRecipe?.countryRecipe || []).map(
            (cr: any) => ({
              country: cr.country,
              image: mapImg(cr.image),
            })
          ),

          sauceRecipe: (item.subRecipe?.sauceRecipe || []).map(
            (sr: any) => ({
              sauce: sr.sauce,
              image: mapImg(sr.image),
            })
          ),

          recipeItem: (item.subRecipe?.recipeItem || []).map((ri: any) => {
            const filteredItems = filterSubItems(ri.sub_recipe_items || []);

            if (filteredItems.length === 0) {
              return {
                message: "Data tidak ditemukan",
                sub_recipe_items: [],
              };
            }

            return {
              sub_recipe_items: filteredItems.map((sri: any) => ({
                id: sri.id,
                title: sri.title,
                slug: sri.slug,
                country: sri.country,
                sauce1: sri.sauce1,
                sauce2: sri.sauce2,
                coverImage: mapImg(sri.coverImage),
              })),
            };
          }),
        };

        return {
          id: item.id,
          documentId: item.documentId,
          mainRecipe,
          subRecipe,
        };
      });

      const activeFilters = {
        country: filterCountry || null,
        sauces: filterSauces.length > 0 ? filterSauces : [],
      };

      return { data, pagination, activeFilters };
    },
  })
);
