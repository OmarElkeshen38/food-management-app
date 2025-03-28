import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { publicAxiosInstance, USERS_URLS } from '../../services/urls/urls.js';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../services/Validation/Validation.js';
import { toast } from 'react-toastify';
import logo from '../../assets/images/logo1.png';
import AuthButton from '../../Shared/AuthButton/AuthButton.jsx';

function VerifyAccount() {

  let { state } = useLocation()

  let { register, formState: { errors, isSubmitting }, handleSubmit } = useForm(
    { mode: "onChange" }
  );

  let navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      let respons = await publicAxiosInstance.put(USERS_URLS.VERIFY, data)

      toast.success(respons.data.message);
      navigate("/login")

    } catch (error) {
      toast.error(error.response.data.message);
    }

  }

  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-sm-11 col-md-7 col-lg-5 bg-white px-5 py-3 rounded-3">
              <div>
                <div className="logo-container text-center">
                  <img className="w-50" src={logo} alt="food recipe" />
                </div>
                <div className="title my-3">
                  <h3 className="h5">Reset Password</h3>
                  <p className="text-muted">Please Enter Your Otp  or Check Your Inbox</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='loginForm' >
                  <div className="input-group mb-1">
                    <span className="input-group-text" id="basic-addon1">
                      <i className='fa fa-envelope' aria-hidden="true"></i>
                    </span>
                    <input {...register("email", EMAIL_VALIDATION)} type="text"
                      className="form-control py-2 px-0" placeholder="Enter your E-mail" aria-describedby="basic-addon1" />
                  </div>
                  {errors.email && <span className='bg-transparent text-danger'>{errors.email.message}</span>}

                  <div className="input-group mb-2 mt-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className='fa fa-lock' aria-hidden="true"></i>
                    </span>
                    <input {...register("code", { required: "Otp is required" })} type="text"
                      className="form-control py-2 px-0" placeholder="OTP" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  {errors.code && <span className='bg-transparent text-danger'>{errors.code.message}</span>}

                  <AuthButton title='Send' />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyAccount
