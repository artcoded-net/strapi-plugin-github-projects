"use strict";

module.exports = {
  index: async (ctx) => {
    ctx.body = await strapi
      .plugin("github-projects")
      .service("getReposService")
      .getPublicRepos();
  },
};
