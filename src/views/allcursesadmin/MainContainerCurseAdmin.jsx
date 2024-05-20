import React from 'react';
import PropTypes from 'prop-types';

export default function MainContainerCurseAdmin({ children }) {
  const mode = "ModeLight";

  return (
    <section className={"GM__" + mode + "__container-curse"}>
      {children}
    </section>
  );
}

MainContainerCurseAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};
