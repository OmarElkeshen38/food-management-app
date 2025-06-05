import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../../assets/images/logo.png"
import {  toast } from 'react-toastify';
import {  publicAxiosInstance, USERS_URLS } from '../../../Services/Urls/Urls';
import { EMAIL_VALIDATION } from '../../../Services/Validations/Validations';



export default function ForgetPass() {

  let {register, formState:{errors,isSubmitting }, handleSubmit} =useForm({mode:"onChange"});
  let navigate = useNavigate()
  const onSubmit= async(data)=>{
    try {
    let respons= await  publicAxiosInstance.post(USERS_URLS.Forget_Pass,data)
   
     toast.success(respons.data.message );
    navigate("/reset-password",{state:data.email})
   
    } catch (error) {
      toast.error(error.response.data.message );
      
    }
    
  }
  return <>
      
                 <div className="title py-3">
                  <h3 className='h5'>Forgot Your Password?</h3>
                  <p className='text-muted fs-6'>No worries! Please enter your email and we will send a password reset link </p>
                 </div>
                 <form onSubmit={handleSubmit(onSubmit)} >
                 <div className="input-group mb-2 py-3">
                   <span className="input-group-text" id="basic-addon1">
                   <i className='fa fa-envelope' aria-hidden="true"></i>
                   </span>
                   <input {...register("email",EMAIL_VALIDATION)} type="text"
                    class="form-control input-group-text p-3" placeholder="Enter your E-mail"  aria-describedby="basic-addon1"/>
                 </div>
                 {errors.email&&<span className='text-danger'>{errors.email.message}</span>}
                 <button disabled={isSubmitting} className='w-100 btnn rounded-2 py-3 mb-2'>{isSubmitting?"Loading...":"Submit"}</button>
                 </form>
          
    </>
  
  
}
