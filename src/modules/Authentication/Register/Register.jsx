import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { publicAxiosInstance, USERS_URLS } from '../../../Services/Urls/Urls';
import { EMAIL_VALIDATION, Name_VALIDATION, PASSWORD_VALIDATION, PHON_VALIDATION } from '../../../Services/Validations/Validations';
import 'react-toastify/dist/ReactToastify.css'

export default function Register() {

  let { state } = useLocation()

  let { register, formState: { errors, isSubmitting }, handleSubmit, watch, trigger } = useForm({ mode: "onChange" });
  const password = watch("password")
  const confirmPassword = watch("confirmPassword")

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword")
    }
  }, [password, confirmPassword, trigger])

  const [passwordEye, setPasswordEye] = useState(false)

  const handelPasswordClick = () => {
    setPasswordEye(!passwordEye)
  }
  const [passwordConfirmEye, setPasswordConfitmEye] = useState(false)
  const handelPasswordConfirm = () => {
    setPasswordConfitmEye(!passwordConfirmEye)
  }

  let navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      let respons = await publicAxiosInstance.post(USERS_URLS.Register, data)

      toast.success(respons.data.message);
      navigate("/verify-account")

    } catch (error) {
      toast.error(error.response.data.message);

    }

  }

  return <>

    <div className="content position-relative">
      <div className="title col-md-7">
        <h3 className='h5'>Register</h3>
        <p className='text-muted'>Welcome Back! Please enter your details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="row">
          <div className="col-md-6">
            <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-user"></i>
              </span>
              <input {...register("userName", Name_VALIDATION)} type="text"
                class="form-control input-group-text p-3" placeholder="User Name" aria-describedby="basic-addon1" />
            </div>
            {errors.userName && <span className='text-danger'>{errors.userName.message}</span>}
          </div>
          <div className="col-md-6">
            <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i className='fa fa-envelope' aria-hidden="true"></i>
              </span>
              <input {...register("email", EMAIL_VALIDATION)} type="text"
                class="form-control input-group-text p-3" placeholder="Enter your E-mail" aria-describedby="basic-addon1" />
            </div>
            {errors.email && <span className='text-danger'>{errors.email.message}</span>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-earth-americas p-3"></i>
              </span>
              <input {...register("country", { required: "Country is require" })} type="text" class="form-control input-group-text" placeholder="Country " aria-describedby="basic-addon1" />
            </div>
            {errors.country && <span className='text-danger'>{errors.country.message}</span>}
          </div>
          <div className="col-md-6">
            <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon1">
                <i class="fa-solid fa-phone"></i>
              </span>
              <input {...register("phoneNumber", PHON_VALIDATION)} type="text"
                class="form-control input-group-text p-3" placeholder="Enter your Phone Number " aria-describedby="basic-addon1" />
            </div>
            {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="input-group mb-2 mt-3 position-relative">
              <span className="input-group-text" id="basic-addon1">
                <i className='fa fa-lock' aria-hidden="true"></i>
              </span>
              <input {...register("password", PASSWORD_VALIDATION)}
                type={(passwordEye === false) ? "password" : 'text'} class="form-control input-group-text p-3" placeholder=" Password" aria-label="Username" aria-describedby="basic-addon1" />
              <span className="input-group-text" id="basic-addon1">
                {(passwordEye === false) ? <i class="fa-solid fa-eye-slash" onClick={handelPasswordClick}></i> : <i class="fa-solid fa-eye" onClick={handelPasswordClick}></i>}
              </span>
            </div>
            {errors.password && <span className='text-danger'>{errors.password.message}</span>}

          </div>
          <div className="col-md-6">
            <div className="input-group mb-2 mt-3">
              <span className="input-group-text" id="basic-addon1">
                <i className='fa fa-lock' aria-hidden="true"></i>
              </span>
              <input {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (confirmPassword) =>
                  confirmPassword === watch("password") || "Password do not match"
              })}
                type={(passwordConfirmEye === false) ? "password" : 'text'} class="form-control input-group-text p-3" placeholder="Confirm Password" aria-label="Username" aria-describedby="basic-addon1" />
              <span className="input-group-text" id="basic-addon1">
                {(passwordConfirmEye === false) ? <i class="fa-solid fa-eye-slash" onClick={handelPasswordConfirm}></i> : <i class="fa-solid fa-eye" onClick={handelPasswordConfirm}></i>}
              </span>

            </div>
            {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}

          </div>
        </div>


        <Link to="/login" className='position-absolute end-0  text-decoration-none forget-pass'>Login Now ?</Link>
        <button disabled={isSubmitting} className='w-100 btnn rounded-2 py-3 my-5'> {isSubmitting ? "Loading..." : "Register"}</button>
      </form>
    </div>

  </>

}

