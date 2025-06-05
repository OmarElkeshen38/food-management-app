import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
// import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar'



export default function MasterLayout({saveLoginData}) {

  
  return (
   <>

   <div className="d-flex vh-100">
    <div >
    <SideBar saveLoginData={saveLoginData}/>
    </div>
     
    <div className="w-100 d-flex flex-column">
    <Navbar saveLoginData={saveLoginData}/>
    {/* <Header/> */}
    <div className='overflow-y-auto'> 
      <Outlet context={{ saveLoginData }}/>
    </div>
    </div>
   </div>

   </>
  )
}
