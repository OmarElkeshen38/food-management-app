import logo from '../../assets/images/logo1.png';
import emailIcon from '../../assets/icons/email.svg';
import passwordIcon from '../../assets/icons/password.svg';
import showPassIcon from '../../assets/icons/showPass.svg';
import AuthButton from "../../Shared/AuthButton/AuthButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { USER_URLS } from '../../services/urls/urls.js';
import { axiosInstance } from '../../services/urls/urls.js';

function ForgetPass() {

  let {register, formState:{errors}, handleSubmit} = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await axiosInstance.post(`${USER_URLS.forget_pass}`, data);
      toast.success("Code sent successfully", {
        position: "top-right",
        theme: "light"
      });
      navigate('/reset-password');
      
    } catch (error) {
      toast.error(error.response.data.message,{
        theme: "light"
      });
      
    }
  }

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-sm-12 col-md-8 col-lg-6 bg-white px-5 py-3 rounded-3">
            <div>
              <div className="logo-container text-center">
                <img className="w-50" src={logo} alt="food recipe" />
              </div>
              <div className="title my-3">
                <h3 className="h5">Forgot Your Password?</h3>
                <p className="text-muted">No worries! Please enter your email and we will send a password reset link </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
                <div className="input-group mb-1">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={emailIcon} className="w-100" alt="email icon" />
                  </span>
                  <input {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Please enter a valid email address.'
                    }
                  })}
                  type="email" className="form-control py-2 px-0" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" />
                </div>

                {errors.email&&<span className="bg-transparent text-danger">{errors.email.message}</span>}

                <div className="links d-flex justify-content-end mb-4">
                  <Link to='/login' className="text-decoration-none success">Login Now?</Link>
                </div>
                <ToastContainer />
                <AuthButton title='Submit' />

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPass
