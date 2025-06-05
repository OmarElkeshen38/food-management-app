import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from "../../../assets/images/logo.png"

export default function AuthLayout() {
  return <>
    <div className='auth-container '>
      <div className="container-fluid bg-layer">
        <div className='vh-100 d-flex justify-content-center align-items-center '>
          <div className="w-50 bg-white rounded-3 px-5 py-3 authFormContent">
            <div className='logo-container text-center'>
              <img className="w-50" src={logo} alt="" />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>


  </>


}
