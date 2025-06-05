import React, { useEffect, useState } from 'react'
import ChangePass from '../../Authentication/Change-pass/ChangePass';
import { useNavigate } from 'react-router-dom';
import imag from "../../../assets/images/Ellipse 234.png"
import { privateAxiosInstance, USERS_URLS } from '../../../Services/Urls/Urls';


export default function Navbar({saveLoginData}) {
  const loginData =saveLoginData()
  
  const [showChangePassword, setShowChangePassword] = useState(false)
  
  const navigate =useNavigate()
 


  return (
    <>

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid mx-5">
  
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 px-5 mb-lg-0 ">
      <img className='img_nav' src={imag} alt="" />
        <li className="nav-item">
          <a className="nav-link active" aria-current="page">{loginData?.userName}</a>
        </li>
        
        <li className="nav-item dropdown  ">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            
          </a>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><a className="dropdown-item "><i className="fa-solid fa-user"></i> Profile</a></li>
            <li><a  onClick={()=>setShowChangePassword(true)}  className="dropdown-item" ><i  className="fa-solid fa-lock-open"></i> ChangePassword</a></li>
            <li><a onClick={()=>navigate("/login")} className="dropdown-item" ><i className="fa-solid fa-right-from-bracket"  ></i> LogOut </a></li>
          </ul>
        </li>
        <li className=" nav-link">
        <i className="fa-solid fa-bell"></i>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>
{showChangePassword&&(<ChangePass closeModal={()=>setShowChangePassword(false)}/>)}
    
    </>
  )
 
  
}


      
    
  