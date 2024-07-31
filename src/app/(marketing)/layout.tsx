import Header from "@/components/header"
import React, { FC } from "react"

interface layoutProps {
  children: React.ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <main className="">{children}</main>
    </>
  )
}

export default layout
