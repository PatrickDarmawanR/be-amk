/**
 * product-kecap-inggeris router
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/product-kecap-inggeris",
      handler: "product-kecap-inggeris.find",
    },
    {
      method: "GET",
      path: "/product-kecap-inggeris/:slug",
      handler: "product-kecap-inggeris.find",
    },
  ],
};
