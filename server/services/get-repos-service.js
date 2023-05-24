"use strict";

const { request } = require("@octokit/request");
const md = require("markdown-it")();
const { getFetchClient } = require("@strapi/helper-plugin");

module.exports = ({ strapi }) => ({
  getProjectForRepo: async (repo) => {
    const { id } = repo;
    const matchingProjects = await strapi.entityService.findMany(
      "plugin::github-projects.project",
      {
        filters: {
          repositoryId: id,
        },
      }
    );
    if (matchingProjects.length == 1) return matchingProjects[0].id;
    return null;
  },

  getPublicRepos: async () => {
    const result = await request("GET /user/repos", {
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      type: "public",
    });
    // id, name, shortDescription, url, longDescription
    // https://raw.githubusercontent.com/artcoded-net/next-strapi-blog/main/README.md
    return Promise.all(
      result.data.map(async (item) => {
        const { id, name, description, html_url, owner, default_branch } = item;
        const readmeUrl = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`;

        let readmeResponse;

        try {
          const client = getFetchClient();
          const response = await client.get(readmeUrl);
          console.log(response);
          if (response) readmeResponse = response.data;
        } catch (e) {
          console.log(`Error occurred on item ${name}`);
          console.log("Error", e);
        }

        const longDescription = md
          .render(readmeResponse)
          .replaceAll("\n", "<br/>");
        const repo = {
          id,
          name,
          shortDescription: description,
          url: html_url,
          longDescription,
        };
        // Add some logic to search for an existing project for the current repo
        const relatedProjectId = await strapi
          .plugin("github-projects")
          .service("getReposService")
          .getProjectForRepo(repo);
        return {
          ...repo,
          projectId: relatedProjectId,
        };
      })
    );
  },
});
