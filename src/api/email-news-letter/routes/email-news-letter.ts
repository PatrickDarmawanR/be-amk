export default {
  routes: [
    {
      method: "POST",
      path: "/newsletter",
      handler: "email-news-letter.create",
      config: {
        auth: false, 
      },
    },
  ],
};
