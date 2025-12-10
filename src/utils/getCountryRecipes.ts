// src/utils/getCountryRecipe.ts

const mapMedia = (media: any, base: string) => {
  if (!media) return null;
  if (media.url) {
    return media.url.startsWith("http") ? media.url : base + media.url;
  }
  return null;
};

export async function getCountryRecipe(strapi: any, base: string) {
  const recipeData = (await strapi.entityService.findMany(
    "api::recipe.recipe",
    {
      populate: {
        subRecipe: {
          populate: {
            countryRecipe: { populate: ["image"] },
          },
        },
      },
    }
  )) as any[];

  return recipeData.flatMap((rec) =>
    (rec.subRecipe?.countryRecipe || []).map((cr: any) => ({
      country: cr.country,
      image: mapMedia(cr.image, base),
    }))
  );
}
