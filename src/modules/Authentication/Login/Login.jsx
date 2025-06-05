import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { publicAxiosInstance, USERS_URLS } from '../../../Services/Urls/Urls';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../../Services/Validations/Validations';




export default function Login({ saveLoginData }) {

  let { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({ mode: "onChange" });
  const [passwordEye, setPasswordEye] = useState(false)

  const handelPasswordClick = () => {
    setPasswordEye(!passwordEye)
  }

  let navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      let respons = await publicAxiosInstance.post(USERS_URLS.Login, data)
      localStorage.setItem("token", respons.data.token)

      saveLoginData()
      toast.success(respons.data.message || "Logged in Successfuly ");
      navigate("/dashboard")

      setToken(respons?.data?.token)

    } catch (error) {
      toast.error(error.response?.data?.message);

    }
  }
  return <>

    <div className="title">
      <h3 className='h5'>Log In</h3>
      <p className='text-muted'>Welcome Back ! Please enter your details</p>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="input-group mb-2">
        <span className="input-group-text" id="basic-addon1">
          <i className='fa fa-envelope' aria-hidden="true"></i>
        </span>
        <input {...register("email", EMAIL_VALIDATION)}
          type="text" className="form-control input-group-text p-3"
          placeholder="Enter your E-mail" aria-describedby="basic-addon1" />

      </div>
      {errors.email && <span className='text-danger'>{errors.email.message}</span>}


      <div className="input-group mb-2 mt-3">
        <span className="input-group-text" id="basic-addon1">
          <i className='fa fa-key' aria-hidden="true"></i>
        </span>
        <input {...register("password", PASSWORD_VALIDATION)}
          type={(passwordEye === false) ? "password" : "text"}
          className="form-control input-group-text p-3"
          placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />
        <span className="input-group-text" id="basic-addon1">
          {(passwordEye === false) ? <i className="fa-solid fa-eye-slash" onClick={handelPasswordClick}></i> : <i class="fa-solid fa-eye" onClick={handelPasswordClick}></i>}
        </span>
      </div>

      {errors.password && <span className='text-danger'>{errors.password.message}</span>}
      <div className="links my-2 d-flex justify-content-between">
        <Link to="/register" className='text-decoration-none text-black'>Register Now?</Link>
        <Link to="/forget-password" className='text-decoration-none forget-pass'>Forget Password</Link>
      </div>
      <button disabled={isSubmitting} className='w-100 btnn rounded-2 py-3 my-3'>{isSubmitting ? "Loading..." : "Login"}</button>
    </form>


  </>


}
