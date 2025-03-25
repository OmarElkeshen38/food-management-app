import React, { useContext } from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

function MainLayout({ loginData }) {

  return (
    <>
      <div className="d-flex gap-4 vh-100">
        <div >
          <SideBar loginData={loginData} />
        </div>

        <div className="w-100 d-flex flex-column">
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
