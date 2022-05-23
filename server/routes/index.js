module.exports = [
  {
    method: "GET",
    path: "/repos", // localhost:1337/github-projects/repos
    handler: "getReposController.index",
    config: {
      policies: [
        "admin::isAuthenticatedAdmin",
        {
          name: "admin::hasPermissions",
          config: {
            actions: [
              "plugin::github-projects.repos.read",
              "plugin::github-projects.projects.read",
            ],
          },
        },
      ],
    },
  },
  {
    method: "POST",
    path: "/project",
    handler: "projectController.create",
    config: {
      policies: [
        "admin::isAuthenticatedAdmin",
        {
          name: "admin::hasPermissions",
          config: {
            actions: ["plugin::github-projects.projects.create"],
          },
        },
      ],
    },
  },
  {
    method: "DELETE",
    path: "/project/:id",
    handler: "projectController.delete",
    config: {
      policies: [
        "admin::isAuthenticatedAdmin",
        {
          name: "admin::hasPermissions",
          config: {
            actions: ["plugin::github-projects.projects.delete"],
          },
        },
      ],
    },
  },
  {
    method: "POST",
    path: "/projects",
    handler: "projectController.createAll",
    config: {
      policies: [
        "admin::isAuthenticatedAdmin",
        {
          name: "admin::hasPermissions",
          config: {
            actions: ["plugin::github-projects.projects.create"],
          },
        },
      ],
    },
  },
  {
    method: "DELETE",
    path: "/projects",
    handler: "projectController.deleteAll",
    config: {
      policies: [
        "admin::isAuthenticatedAdmin",
        {
          name: "admin::hasPermissions",
          config: {
            actions: ["plugin::github-projects.projects.delete"],
          },
        },
      ],
    },
  },
  {
    method: "GET",
    path: "/projects",
    handler: "projectController.find",
    config: {
      auth: false,
      prefix: false,
    },
  },
  {
    method: "GET",
    path: "/projects/:id",
    handler: "projectController.findOne",
    config: {
      auth: false,
      prefix: false,
    },
  },
];
