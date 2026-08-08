import React from "react"

import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

// styling
import LayoutWrapper from './Layout.styles'
import {Normalize} from 'styled-normalize'

interface LayoutProps {
  children: React.ReactNode
  limitWidth?: string
}

const Layout = ({ children, limitWidth }: LayoutProps) => {
  return (
    <>
      <LayoutWrapper limitWidth={limitWidth}>
        <Normalize/>

        <main>
          <Header/>
          {children}
        </main>
        <Footer/>

      </LayoutWrapper>
    </>
  )
}

export default Layout
