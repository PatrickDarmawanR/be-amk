// src/utils/getOtherItems.ts

import type { Core } from "@strapi/strapi";

type RawItem = any;

export async function getOtherItems({ strapi }: { strapi: Core.Strapi }) {
  const base = process.env.STRAPI_PUBLIC_URL;

  const asinEntries = (await strapi.entityService.findMany(
    "api::product-kecap-asin.product-kecap-asin",
    {
      populate: {
        itemsKecapAsin: { populate: ["image", "background"] },
      },
    }
  )) as any[];

  const inggerisEntries = (await strapi.entityService.findMany(
    "api::product-kecap-inggeris.product-kecap-inggeris",
    {
      populate: {
        itemsKecapInggeris: { populate: ["image", "background"] },
      },
    }
  )) as any[];

  const asinList: RawItem[] =
    asinEntries?.flatMap((p) => p.itemsKecapAsin || []) ?? [];

  const inggerisList: RawItem[] =
    inggerisEntries?.flatMap((p) => p.itemsKecapInggeris || []) ?? [];

  const formatItem = (it: RawItem) => ({
    id: it?.id ?? null,
    title: it?.title ?? null,
    alt: it?.alt ?? "",
    label: it?.label ?? null,
    background: it?.background?.url ? `${base}${it.background.url}` : null,
    image: it?.image?.url ? `${base}${it.image.url}` : null,
  });

  const asinFormatted = asinList.map(formatItem);
  const inggerisFormatted = inggerisList.map(formatItem);

  return {
    asin: asinFormatted,
    inggeris: inggerisFormatted,
  };
}
