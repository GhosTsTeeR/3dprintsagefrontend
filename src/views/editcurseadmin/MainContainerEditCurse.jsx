import React from 'react'

export default function MainContainerEditCurse({children}) {
  const mode =  "ModeLight"
  return (
    <section className={"GM__"+mode+"__container-curse"}>{children}</section>
  )
}
