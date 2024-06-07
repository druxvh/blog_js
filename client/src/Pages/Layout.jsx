import React from 'react'
import Header from '../sections/Header'
import Footer from '../sections/Footer'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <>
     <Header />
     <Outlet />
     <Footer />
    </>
  )
}

export default Layout