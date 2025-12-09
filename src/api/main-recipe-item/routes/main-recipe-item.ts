/**
 * main-recipe-item router
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/main-recipe-items/:slug",
      handler: "main-recipe-item.findOne",
      config: {
        auth: false,
      },
    },
  ],
};

