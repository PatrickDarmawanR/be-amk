// src/utils/getFeaturedArticles.ts

export const getFeaturedArticles = async (strapi: any) => {
  const baseUrl = process.env.STRAPI_PUBLIC_URL;

  const toGMT7 = (dateString?: string | Date | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Date(date.getTime() + 7 * 60 * 60 * 1000).toISOString();
  };

  const mapImage = (img: any) =>
    img
      ? Array.isArray(img)
        ? img.map((i) => `${baseUrl}${i.url}`)
        : `${baseUrl}${img.url}`
      : null;

  const articlesRaw = await strapi.db
    .query("api::article-item.article-item")
    .findMany({
      where: { publishedAt: { $notNull: true } },
      populate: { image: true },
      orderBy: { publishedDateTime: "desc" },
    });

  return articlesRaw.map((a: any) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    publishedDateTime: toGMT7(a.publishedDateTime),
    imageUrl: mapImage(a.image),
  }));
};
