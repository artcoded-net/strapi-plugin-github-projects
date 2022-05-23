import React from "react";
import { useNotification } from "@strapi/helper-plugin";
import { Button, Main } from "@strapi/design-system";

const SettingsPage = () => {
  const toggleNotification = useNotification();

  const handleClick = () => {
    toggleNotification({
      // required
      type: "info|success|warning",
      // required
      message: {
        id: "notification.version.update.message",
        defaultMessage: "A new version is available",
      },
      // optional
      link: {
        url: "https://github.com/strapi/strapi/releases/tag/v4",
        label: {
          id: "notification.version.update.link",
          defaultMessage: "See more",
        },
      },
      // optional: default = false
      blockTransition: false,
      // optional
      onClose: () => localStorage.setItem("STRAPI_UPDATE_NOTIF", true),
    });
  };

  return (
    <Main>
      <h1>This is the homepage</h1>
      <Button onClick={handleClick}>Display notification</Button>
    </Main>
  );
};

export default SettingsPage;
