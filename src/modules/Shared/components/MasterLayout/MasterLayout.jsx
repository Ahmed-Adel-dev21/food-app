import React from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <>
    <div className="d-flex">
      <SideBar/>
      <div className="w-100">
        <NavBar/>
        <Header/>
        <Outlet/>
      </div>

    </div>
    </>
  )
}
