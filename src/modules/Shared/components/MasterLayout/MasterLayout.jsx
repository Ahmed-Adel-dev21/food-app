import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex min-vh-100 ">
        <div className="sidebar-wrapper">
          <SideBar />
        </div>

        <div className="w-100 mx-4 ">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
