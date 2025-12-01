/**
 * ahs-approved-item router
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/ahs-approved-items/:slug",
      handler: "ahs-approved-item.findOne",
      config: { auth: false },
    },
  ],
};
