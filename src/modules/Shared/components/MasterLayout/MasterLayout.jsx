import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout({loginData}) {
  return (
    <>
    <div className="d-flex  ">
      <SideBar/>
      
      <div className="w-100 mx-4 ">
        <NavBar loginData={loginData} />
        <Outlet/>
      </div>

    </div>
    </>
  )
}
