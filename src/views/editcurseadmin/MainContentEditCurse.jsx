import React from 'react'

export default function MainContentEditCurse({children}) {
  const mode =  "ModeLight"
  return (
    <main className={"GM__"+mode+"__content-curse"}>{children}</main>
  )
}
