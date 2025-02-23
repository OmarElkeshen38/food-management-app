import logo from '../../assets/images/logo1.png';
import emailIcon from '../../assets/icons/email.svg';
import passwordIcon from '../../assets/icons/password.svg';
import showPassIcon from '../../assets/icons/showPass.svg';
import AuthButton from "../../Shared/AuthButton/AuthButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { axiosInstance } from '../../services/urls/urlsjs';
import { USER_URLS } from '../../services/urls/urlsjs';

function Register() {

  const showPass = () => {
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  const showConfPass = () => {
    const confirmPassInput = document.getElementById("confirmPassword");
    if (confirmPassInput.type === "password") {
      confirmPassInput.type = "text";
    } else {
      confirmPassInput.type = "password";
    }
  };

  let {register, formState:{errors}, handleSubmit} = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await axiosInstance.post(`${USER_URLS.register}`, data);
      navigate('/login');
      toast.success("Register successfully", {
        position: "top-right",
        theme: "light"
      });
      
    } catch (error) {
      console.log(error.response.data);
      
      toast.error(error.response.data.message,{
        theme: "light"
      });
      
    }
  }

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-sm-12 col-md-10 col-lg-8 bg-white px-5 py-3 rounded-3">
            <div>
              <div className="logo-container text-center">
                <img className="w-50" src={logo} alt="food recipe" />
              </div>
              <div className="title my-3">
                <h3 className="h5 fw-bold">Register</h3>
                <p className="text-muted">Welcome Back! Please enter your details</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="loginForm my-4">
                <div className="d-flex align-items-center gap-5">
                  <div className="w-100">
                    <div className="input-group mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={emailIcon} className="w-100" alt="UserName icon" />
                      </span>
                      <input {...register('userName', {
                        required: 'userName is required',
                        pattern: {
                          value: /^[a-zA-Z0-9_]{3,}$/,
                          message: 'Username must be at least 3 characters and can only contain letters, numbers, and underscores (_).'
                        }
                      })}
                      type="text" className="form-control py-3 px-0" placeholder="UserName" aria-label="userName" aria-describedby="basic-addon1" />
                    </div>
                    {errors.userName&&<span className="bg-transparent text-danger">{errors.userName.message}</span>}
                  </div>
                    
                  <div className="w-100">
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
                      type="email" className="form-control py-3 px-0" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" />
                    </div>
                    {errors.email&&<span className="bg-transparent text-danger">{errors.email.message}</span>}
                    </div>
                </div>

                <div className="d-flex align-items-center gap-5 my-3">
                  <div className="w-100">
                    <div className="input-group mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={passwordIcon} className="w-100" alt="country icon" />
                      </span>
                      <input {...register('country', {
                        required: 'Country name is required',
                        pattern: {
                          value: /^[A-Za-z\s]{2,}$/,
                          message: 'Please enter a valid country name.'
                        }
                      })}
                      type="text" className="form-control py-3 px-0" placeholder="Country" aria-label="country" aria-describedby="basic-addon1" />
                    </div>
                    {errors.country&&<span className="bg-transparent text-danger">{errors.country.message}</span>}
                  </div>

                  <div className="w-100">
                    <div className="input-group mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={emailIcon} className="w-100" alt="email icon" />
                      </span>
                      <input {...register('phoneNumber', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^\+?\d{8,15}$/,
                          message: 'Phone number must be between 8 and 15 digits and can start with '+'. No spaces or special characters allowed.'
                        }
                      })}
                      type="number" id="phoneNumber" className="form-control py-3 px-0" placeholder="PhoneNumber" aria-label="phoneNumber" aria-describedby="basic-addon2" />
                    </div>
                    {errors.phoneNumber&&<span className="bg-transparent text-danger mb-3">{errors.phoneNumber.message}</span>}
                  </div>
                </div>

                <div className="d-flex align-items-center gap-5 mb-2-">
                  <div className="w-100">
                    <div className="input-group mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={passwordIcon} className="w-100" alt="password icon" />
                      </span>
                      <input {...register('password', {
                        required: 'Password is required',
                        pattern: {
                          value: /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Password must be at least 8 characters and include at least one number and one special character (@, #, $, etc.).'
                        }
                      })}
                      type="password" id='password' className="form-control py-3 px-0" placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
                      <span className="input-group-text" id="basic-addon2">
                        <img onClick={showPass} src={showPassIcon} className="w-100 border-0 p-0 showPass" alt="show password icon" />
                      </span>
                    </div>
                    {errors.password&&<span className="bg-transparent text-danger">{errors.password.message}</span>}
                  </div>

                  <div className="w-100">  
                    <div className="input-group mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <img src={passwordIcon} className="w-100" alt="password icon" />
                      </span>
                      <input {...register('confirmPassword', {
                        required: 'Confirm password is required',
                        pattern: {
                          value: /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: 'Passwords do not match. Please enter the same password.'
                        }
                      })}
                      type="password" id="confirmPassword" className="form-control py-3 px-0" placeholder="confirm-password" aria-label="confirmPassword" aria-describedby="basic-addon2" />
                      <span className="input-group-text" id="basic-addon2">
                        <img onClick={showConfPass} src={showPassIcon} className="w-100 border-0 p-0 showPass" alt="show password icon" />
                      </span>
                    </div>
                    {errors.confirmPassword&&<span className="bg-transparent text-danger mb-3">{errors.confirmPassword.message}</span>}
                  </div>
                </div>



                <div className="links d-flex justify-content-end mb-4">
                  <Link to='/login' className="text-decoration-none success">Login Now?</Link>
                </div>
                <ToastContainer />
                <AuthButton title='Login' />

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
