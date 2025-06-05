
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import { publicAxiosInstance, USERS_URLS } from '../../../Services/Urls/Urls';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../../Services/Validations/Validations';
import 'react-toastify/dist/ReactToastify.css'

export default function VerifyAccount() {

  let {state}=useLocation()

  let {register, formState:{errors,isSubmitting}, handleSubmit} =useForm(
   { mode:"onChange"}
  );
  
  
  
  let navigate = useNavigate()

  const onSubmit= async(data)=>{
    try {
    let respons= await  publicAxiosInstance.put(USERS_URLS.VERIFY,data)
   
     toast.success(respons.data.message);
    navigate("/login")
    
    } catch (error) {
       toast.error(error.response.data.message);
      // console.log(error.response.data.message);
    }
    
  }

  return <>
       
                 <div className="title">
                  <h3 className='h5'> Reset  Password</h3>
                  <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
                 </div>
                 <form onSubmit={handleSubmit(onSubmit)} >
                 <div className="input-group mb-2">
                   <span className="input-group-text" id="basic-addon1">
                   <i className='fa fa-envelope' aria-hidden="true"></i>
                   </span>
                   <input {...register("email",EMAIL_VALIDATION)} type="text"
                    className="form-control input-group-text p-3" placeholder="Enter your E-mail"  aria-describedby="basic-addon1"/>
                 </div>
                 {errors.email&&<span className='text-danger'>{errors.email.message}</span>}
                
                 <div className="input-group mb-2 mt-3">
                   <span className="input-group-text" id="basic-addon1">
                   <i className='fa fa-lock' aria-hidden="true"></i>
                   </span>
                   <input {...register("code" ,{required:"Otp is required"})} type="text"
                    className="form-control input-group-text p-3" placeholder="OTP" aria-label="Username" aria-describedby="basic-addon1"/>
                 </div>
                 {errors.code&&<span className='text-danger'>{errors.code.message}</span>}

                 <button disabled={isSubmitting}  className='w-100 btnn rounded-2 py-3 my-3'> {isSubmitting?"Loading...":" Send"}</button>
                 </form>
         
    </>
  
}

