import React, { useContext } from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

function MainLayout({ loginData }) {

  return (
    <>
      <div className="d-flex vh-100">
        <div >
          <SideBar loginData={loginData} />
        </div>

        <div className="w-100 d-flex flex-column px-3">
          <Navbar loginData={loginData} />
          <div className='overflow-y-auto'>
            <Outlet context={{ loginData }} />
          </div>
        </div>
      </div>

    </>
  );
}

export default MainLayout;
