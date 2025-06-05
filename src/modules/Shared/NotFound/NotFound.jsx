import React from 'react'
import imag_logo from "../../../assets/images/logo.png"
import imag from "../../../assets/images/not-found.png"
import { Navigate, useNavigate } from 'react-router-dom'
export default function NotFound() {


 let navigate=  useNavigate()

  let navigateToHome=()=>{
    navigate("/dashboard")
  }
  
  return (
    <>
    <div className="not_found p-3">
     <div className="logo">
       <img src={imag_logo} alt="" />
     </div>
     <div className="content mt-5 p-5">
      <h3>Oops.</h3>
      <p className='icon-color'>Page not found</p>
      <p><span>This Page doesn’t exist or was removed!
      We suggest you  back to home.</span></p>
      <button onClick={navigateToHome} className='btn btn-success p-3'><i class="fa-solid fa-arrow-left me-2"></i>Back To Home</button>
     </div>
    <img className='position-absolute bottom-0 end-0 ' src={imag} alt="" />
    </div>
    </>
  )
}
