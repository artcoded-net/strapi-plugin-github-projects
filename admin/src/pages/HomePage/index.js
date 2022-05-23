/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';
import Repo from "../../components/Repo";

const HomePage = () => {
  return (
    <div>
      <Repo />
    </div>
  );
};

export default memo(HomePage);
