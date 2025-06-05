import React, { useEffect, useState } from 'react'
import logo from "../../../assets/images/logo.png"
import { toast } from 'react-toastify';
import { privateAxiosInstance, publicAxiosInstance, USERS_URLS } from '../../../Services/Urls/Urls';
import { useForm } from 'react-hook-form';
import { PASSWORD_VALIDATION } from '../../../Services/Validations/Validations';



export default function ChangePass({closeModal}) {

  let {register, formState:{errors,isSubmitting}, handleSubmit,watch,trigger} =useForm( { mode:"onChange"});

   const [oldPasswordEye, setoldPasswordEye] = useState(false)
    const handelOldPasswordClick=()=>{
      setoldPasswordEye(!oldPasswordEye)
    }
    const [newPasswordEye, setNewPasswordEye] = useState(false)
    const handelNewPasswordClick=()=>{
      setNewPasswordEye(!newPasswordEye)
    }
    const [confirmNewPasswordEye, setConfirmNewPasswordEye] = useState(false)
    const handelConfirmNewPassword=()=>{
      setConfirmNewPasswordEye(!confirmNewPasswordEye)
    }

     const newPassword=watch("newPassword")
      const confirmNewPassword=watch("confirmNewPassword")
    
      useEffect(()=>{
            if(confirmNewPassword){
              trigger("confirmNewPassword")
            }
      },[newPassword,confirmNewPassword,trigger])
    


   const onSubmit= async(data)=>{
      try {
      let respons= await  privateAxiosInstance.put(USERS_URLS.Change_Pass,data)
  
      
       toast.success(respons.data.message);
       closeModal()
      
      } catch (error) {
         toast.error(error.response.data.message);
      }
      
    }
  return (
    <>
      <div className='modal  d-flex align-items-center justify-content-center row '>
          <div className=' bg-white rounded-2 position-relative col-md-5 '>
          <i onClick={closeModal} className="fa-regular fa-circle-xmark fs-3 position-absolute end-0 p-3 text-success"></i>
          <div className='logo-container text-center'>
                <img className="w-50"  src={logo} alt="" />
                 </div>
          <div className="title m-3 ">
                  <h3 className='h5'>Change Your Password</h3>
                  <p className='text-muted fs-6'>Enter your details below </p>
                 </div>
                       <form onSubmit={handleSubmit(onSubmit)} className='m-4' >
                         <div className="input-group mb-2 mt-3 position-relative">
                             <span className="input-group-text" id="basic-addon1">
                                 <i className='fa fa-lock' aria-hidden="true"></i>
                              </span>
                              <input {...register("oldPassword" ,PASSWORD_VALIDATION)} type={(oldPasswordEye===false)?"password":'text'} className="form-control input-group-text" placeholder="Old Password" aria-label="Username" aria-describedby="basic-addon1"/>
                              <span className="input-group-text" id="basic-addon1">
                              {(oldPasswordEye===false)?<i className="fa-solid fa-eye-slash" onClick={handelOldPasswordClick}></i>:<i className="fa-solid fa-eye" onClick={handelOldPasswordClick}></i>}
                               </span>
                           </div>
                         {errors.oldPassword&&<span className='text-danger'>{errors.oldPassword.message}</span>}
                         
                         <div className="input-group mb-2 mt-3 position-relative">
                             <span className="input-group-text" id="basic-addon1">
                                 <i className='fa fa-lock' aria-hidden="true"></i>
                              </span>
                              <input {...register("newPassword" ,PASSWORD_VALIDATION)} type={(newPasswordEye===false)?"password":'text'} className="form-control input-group-text" placeholder="New Password" aria-label="Username" aria-describedby="basic-addon1"/>
                              <span className="input-group-text" id="basic-addon1">
                              {(newPasswordEye===false)?<i className="fa-solid fa-eye-slash" onClick={handelNewPasswordClick}></i>:<i className="fa-solid fa-eye" onClick={handelNewPasswordClick}></i>}
                               </span>
                           </div>
                           {errors.newPassword&&<span className='text-danger'>{errors.newPassword.message}</span>}

                         <div className="input-group mb-2 mt-3 position-relative">
                             <span className="input-group-text" id="basic-addon1">
                                 <i className='fa fa-lock' aria-hidden="true"></i>
                              </span>
                              <input {...register("confirmNewPassword" ,{required:"Confirm Password is required",
                                validate:(confirmNewPassword)=>
                                confirmNewPassword===watch("newPassword")||"Password do not match"})} type={(confirmNewPasswordEye===false)?"password":'text'}  className="form-control input-group-text" placeholder="Confirm New Password" aria-label="Username" aria-describedby="basic-addon1"/>
                              <span className="input-group-text" id="basic-addon1">
                              {(confirmNewPasswordEye===false)?<i className="fa-solid fa-eye-slash" onClick={handelConfirmNewPassword}></i>:<i className="fa-solid fa-eye" onClick={handelConfirmNewPassword}></i>}
                               </span>
                           </div>
                           {errors.confirmNewPassword&&<span className='text-danger'>{errors.confirmNewPassword.message}</span> }
                           <button disabled={isSubmitting} className='w-100 btnn rounded-2 py-2 my-2 '> {isSubmitting?"Loading...":"Change Password"}</button>
                       </form>
                       </div>
      
          </div>
                      
               
    </>
  )
}
