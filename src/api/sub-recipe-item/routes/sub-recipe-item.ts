/**
 * sub-recipe-item router
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/sub-recipe-items/:slug",
      handler: "sub-recipe-item.findOne",
      config: {
        auth: false,
      },
    },
  ],
};

