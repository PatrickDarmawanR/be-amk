// src/utils/getRelatedAhsApprovedItems.ts

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
