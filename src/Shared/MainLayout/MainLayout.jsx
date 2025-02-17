import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

function MainLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="w-25 bg-info">
          <SideBar />
        </div>
        <div className="w-75 bg-danger">
          <Navbar />
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
