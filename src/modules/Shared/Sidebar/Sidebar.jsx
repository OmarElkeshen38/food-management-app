import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import image from "../../../assets/images/side-logo.png"
import ChangePass from '../../Authentication/Change-pass/ChangePass';

export default function SideBar({saveLoginData}) {
  const [showChangePassword, setShowChangePassword] = useState(false)
  const loginData =saveLoginData()
  // console.log(loginData);
  
//  console.log(loginData.userGroup);
 

  let navigate= useNavigate()
  const [isCollaps, setIsCollaps] = useState(false)
  let toggelCollaps=()=>{
    setIsCollaps(! isCollaps)
  }
  let logedOut=()=>{
    localStorage.removeItem("token")
   navigate("/login")
  }

  useEffect(()=>{
    const handelResize=()=>{
      if (window.innerWidth<=992){
        setIsCollaps(true)
      }else{
        setIsCollaps(false)
      }
    }
    handelResize()
    window.addEventListener("resize",handelResize)
    // return()=>window.removeEventListener("resize",handelResize)
  },[])
  
  return (
    <> 
    <div className='sidebar-container'>
    <Sidebar  collapsed={isCollaps} >
  <Menu>
    <MenuItem onClick={toggelCollaps} className='m-3 logo' icon={<img  src={image}/>}></MenuItem>
    <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
    {loginData.userGroup!="SystemUser"?<MenuItem icon={ <i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>:""}
    <MenuItem icon={<i className="fa-solid fa-receipt"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
    {loginData.userGroup!="SystemUser"? <MenuItem icon={<i className="fa-solid fa-table-cells"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>:""}
    {loginData.userGroup=="SystemUser"? <MenuItem icon={<i className="fa-solid fa-heart"></i>} component={<Link to="/dashboard/favorites" />} > Favorites </MenuItem>:""}
    <MenuItem icon={<i className="fa-solid fa-unlock"></i>} onClick={()=>setShowChangePassword(true)} > Change Password </MenuItem>
    <MenuItem  icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={logedOut}>Log Out</MenuItem>
  </Menu>
</Sidebar>
    </div>
      
      {showChangePassword&&(<ChangePass closeModal={()=>setShowChangePassword(false)}/>)}
    </>
    
  )
}
