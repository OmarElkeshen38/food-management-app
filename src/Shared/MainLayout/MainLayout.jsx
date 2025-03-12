import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

function MainLayout({ loginData }) {
  console.log(loginData);
  
  return (
    <>
      <div className="d-flex">
        <div className="w-25">
          <SideBar />
        </div>
        <div className="w-75">
          <Navbar loginData={loginData} />
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
