/**
 * article-item router
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/article-items/:slug",
      handler: "article-item.findOne",
      config: { auth: false },
    },
  ],
};
