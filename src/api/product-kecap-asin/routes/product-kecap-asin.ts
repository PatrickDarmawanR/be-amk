/**
 * product-kecap-asin router
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/product-kecap-asin",
      handler: "product-kecap-asin.find",
    },
    {
      method: "GET",
      path: "/product-kecap-asin/:slug",
      handler: "product-kecap-asin.find",
    },
  ],
};

