"use strict";

module.exports = ({ strapi }) => ({
  create: async (repo, userId) => {
    const newProject = await strapi.entityService.create(
      "plugin::github-projects.project",
      {
        data: {
          repositoryId: `${repo.id}`,
          title: repo.name,
          shortDescription: repo.shortDescription,
          repositoryUrl: repo.url,
          longDescription: repo.longDescription,
          createdBy: userId,
          updatedBy: userId,
        },
      }
    );
    return newProject;
  },
  delete: async (projectId) => {
    const deletedProject = await strapi.entityService.delete(
      "plugin::github-projects.project",
      projectId
    );
    return deletedProject;
  },
  createAll: async (repos, userId) => {
    const createPromises = repos.map(
      async (repo) =>
        await strapi
          .plugin("github-projects")
          .service("projectService")
          .create(repo, userId)
    );
    return Promise.all(createPromises);
  },
  deleteAll: async (projectIds) => {
    const deletePromises = projectIds.map(
      async (id) =>
        await strapi
          .plugin("github-projects")
          .service("projectService")
          .delete(id)
    );
    return Promise.all(deletePromises);
  },
  find: async (params) => {
    return strapi.entityService.findMany(
      "plugin::github-projects.project",
      params
    );
  },
  findOne: async (projectId, params) => {
    return strapi.entityService.findOne(
      "plugin::github-projects.project",
      projectId,
      params
    );
  },
});
