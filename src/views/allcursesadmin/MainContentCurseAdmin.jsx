import React from 'react'
import PropTypes from 'prop-types';

export default function MainContentCurseAdmin({children}) {
  const mode =  "ModeLight"
  return (
    <main className={"GM__"+mode+"__content-curse"}>{children}</main>
  )
}
MainContentCurseAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};
