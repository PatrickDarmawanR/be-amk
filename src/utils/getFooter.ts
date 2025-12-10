// src/utils/getFooter.ts

const mapImage = (img: any, base: string) =>
  img
    ? Array.isArray(img)
      ? img.map((i) => `${base}${i.url}`)
      : `${base}${img.url}`
    : null;

export async function getFooter(strapi: any, base: string) {
  const res = await strapi.entityService.findMany("api::footer.footer", {
    populate: {
      image: true,
      socialMedia: { populate: { icon: true } },
    },
  });

  const item = Array.isArray(res) ? res[0] : res;
  if (!item) return null;

  const attrs = item.attributes || item;

  return {
    id: item.id,
    title: attrs.title || null,
    imageUrl: mapImage(attrs.image, base),
    socialMedia:
      attrs.socialMedia?.map((sm: any) => ({
        key: sm.key || null,
        alt: sm.alt || null,
        href: sm.href || null,
        iconUrl: mapImage(sm.icon, base),
      })) || [],
  };
}
