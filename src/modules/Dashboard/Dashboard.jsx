import React from 'react'
import Header from '../Shared/Header/Header'
import imag from "../../assets/images/home_img (2).png"
import { Link, useOutletContext } from 'react-router-dom'


export default function Dashboard() {
  const { saveLoginData } = useOutletContext();
  const loginData =saveLoginData()
  console.log(loginData);
  
  // console.log(loginData);
  
  return (
    <>
   <div className="content mx-3">
   <Header  title={`Welcome ${loginData?.userName} !` } description={"This is a welcoming screen for the entry of the application , you can now see the options"} img={imag}/>
    <div className="header_recipe m-3 p-3 rounded-3">
         <div className="row d-flex justify-content-between">
           <div className='col-md-10'>
           <h3>Fill the <span className='fs-3 text-success'>Recipes !</span></h3>
           <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
           </div>
           <div className='col-md-2'>
           <Link to="/dashboard/recipes" className='btn btn-color text-white mt-3 p-3'>Fill Recipes <i className="fa-solid fa-arrow-right"></i></Link>
           </div>
            </div>
       </div>
   </div>
 

    </>
  )
}
