import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

function MainLayout({ loginData }) {
  console.log(loginData);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <SideBar />
          </div>
          <div className="col-md-10">
            <Navbar loginData={loginData} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
