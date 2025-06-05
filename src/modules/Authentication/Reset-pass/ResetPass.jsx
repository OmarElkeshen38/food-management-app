import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import { publicAxiosInstance, USERS_URLS } from '../../../Services/Urls/Urls';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../../Services/Validations/Validations';
import 'react-toastify/dist/ReactToastify.css'

export default function ResetPass() {

  let {state}=useLocation()

  let {register, formState:{errors,isSubmitting}, handleSubmit,watch,trigger} =useForm({defaultValues:{state:state.email}},
   { mode:"onChange"}
  );
  const password=watch("password")
  const confirmPassword=watch("confirmPassword")

  useEffect(()=>{
        if(confirmPassword){
          trigger("confirmPassword")
        }
  },[password,confirmPassword,trigger])

  const [passwordEye, setPasswordEye] = useState(false)
  
  const handelPasswordClick=()=>{
    setPasswordEye(!passwordEye)
  }
  const [passwordConfirmEye, setPasswordConfitmEye] = useState(false)
  const handelPasswordConfirm=()=>{
    setPasswordConfitmEye(!passwordConfirmEye)
  }
  
  let navigate = useNavigate()

  const onSubmit= async(data)=>{
    try {
    let respons= await  publicAxiosInstance.post(USERS_URLS.Reset_Pass,data)
   
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
                    class="form-control input-group-text p-3" placeholder="Enter your E-mail"  aria-describedby="basic-addon1"/>
                 </div>
                 {errors.email&&<span className='text-danger'>{errors.email.message}</span>}
                
                 <div className="input-group mb-2 mt-3">
                   <span className="input-group-text" id="basic-addon1">
                   <i className='fa fa-lock' aria-hidden="true"></i>
                   </span>
                   <input {...register("seed" ,{required:"Otp is required"})} type="text" 
                   class="form-control input-group-text p-3" placeholder="OTP" aria-label="Username" aria-describedby="basic-addon1"/>
                 </div>
                 {errors.seed&&<span className='text-danger'>{errors.seed.message}</span>}

                 <div className="input-group mb-2 mt-3 position-relative">
                   <span className="input-group-text" id="basic-addon1">
                   <i className='fa fa-lock' aria-hidden="true"></i>
                   </span>
                   <input {...register("password" ,PASSWORD_VALIDATION)}
                    type={(passwordEye===false)?"password":'text'}
                     class="form-control input-group-text p-3" placeholder="New Password" aria-label="Username" aria-describedby="basic-addon1"/>
                   <span className="input-group-text" id="basic-addon1">
                   {(passwordEye===false)?<i class="fa-solid fa-eye-slash" onClick={handelPasswordClick}></i>:<i class="fa-solid fa-eye" onClick={handelPasswordClick}></i>}
                   </span>
                  </div>
                  
                 {errors.password&&<span className='text-danger'>{errors.password.message}</span>}

                 <div className="input-group mb-2 mt-3">
                   <span className="input-group-text" id="basic-addon1">
                   <i className='fa fa-lock' aria-hidden="true"></i>
                   </span>
                   <input {...register("confirmPassword" ,{required:"Confirm Password is required",
                   validate:(confirmPassword)=>
                    confirmPassword===watch("password")||"Password do not match"})} 
                    type={(passwordConfirmEye===false)?"password":'text'} 
                    className="form-control input-group-text p-3" placeholder="Confirm New Password" aria-label="Username" aria-describedby="basic-addon1"/>
                   <span className="input-group-text" id="basic-addon1">
                   {(passwordConfirmEye===false)?<i className="fa-solid fa-eye-slash" onClick={handelPasswordConfirm}></i>:<i class="fa-solid fa-eye" onClick={handelPasswordConfirm}></i>}
                   </span>
                    
                  </div>
                   
                 {errors.confirmPassword&&<span className='text-danger'>{errors.confirmPassword.message}</span> }
                
                 <button disabled={isSubmitting}  className='w-100 btnn rounded-2 py-3 my-3'> {isSubmitting?"Loading...":"Reset Password"}</button>
                 </form>
         
    </>
  
}
