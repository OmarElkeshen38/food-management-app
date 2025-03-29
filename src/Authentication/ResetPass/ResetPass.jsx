import logo from '../../assets/images/logo1.png';
import passwordIcon from '../../assets/icons/password.svg';
import showPassIcon from '../../assets/icons/showPass.svg';
import mailIcon from '../../assets/icons/emailIcon.svg';
import AuthButton from "../../Shared/AuthButton/AuthButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { USERS_URLS } from '../../services/urls/urls.js';
import { publicAxiosInstance } from '../../services/urls/urls.js';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../services/Validation/Validation.js';

function ResetPass() {

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
      let response = await publicAxiosInstance.post(`${USERS_URLS.reset_pass}`, data);
      navigate('/login');
      console.log(response);
      
      toast.success("Password reset successfully", {
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
          <div className="col-sm-11 col-md-7 col-lg-5 bg-white px-5 py-3 rounded-3">
            <div>
              <div className="logo-container text-center">
                <img className="w-50" src={logo} alt="food recipe" />
              </div>
              <div className="title my-3">
                <h3 className="h5">Reset Password</h3>
                <p className="text-muted">Please Enter Your Otp  or Check Your Inbox</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
                <div className="input-group mb-1">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={mailIcon} className="w-100" alt="email icon" />
                  </span>
                  <input {...register('email', EMAIL_VALIDATION)}
                  type="email" className="form-control py-2 px-0" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" />
                </div>
                {errors.email&&<span className="bg-transparent text-danger">{errors.email.message}</span>}

                <div className="input-group my-3">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={passwordIcon} alt="otp icon" />
                  </span>
                  <input {...register('seed', {
                    required: 'Otp is required',
                    pattern: {
                      value: /^[A-Za-z0-9]{4,8}$/,
                      message: 'OTP must be 4 to 8 characters long and contain only letters and numbers.'
                    }
                  })}
                  type="text" id="seed" className="form-control py-2 px-0" placeholder="OTP" aria-label="seed" aria-describedby="basic-addon2" />
                </div>
                {errors.seed&&<span className="bg-transparent text-danger mb-3">{errors.seed.message}</span>}

                <div className="input-group my-2">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={passwordIcon} alt="password icon" />
                  </span>
                  <input {...register('password', PASSWORD_VALIDATION)}
                  type="password" id="password" className="form-control py-2 px-0" placeholder="New Password" aria-label="password" aria-describedby="basic-addon2" />
                  <span className="input-group-text" id="basic-addon2">
                    <img onClick={showPass} src={showPassIcon} className="w-100 border-0 p-0 showPass" alt="show password icon" />
                  </span>
                </div>
                {errors.password&&<span className="bg-transparent text-danger mb-3">{errors.password.message}</span>}

                <div className="input-group my-3">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={passwordIcon} alt="confirm password icon" />
                  </span>
                  <input {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    pattern: {
                      value: /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: 'Passwords do not match. Please enter the same password.'
                    }
                  })}
                  type="password" id="confirmPassword" className="form-control py-2 px-0" placeholder="Confirm New Password" aria-label="confirmPassword" aria-describedby="basic-addon2" />
                  <span className="input-group-text" id="basic-addon2">
                    <img onClick={showConfPass} src={showPassIcon} className="w-100 border-0 p-0 showPass" alt="show password icon" />
                  </span>
                </div>
                {errors.confirmPassword&&<span className="bg-transparent text-danger mb-3">{errors.confirmPassword.message}</span>}

                <div className="links d-flex justify-content-end mb-4">
                  <Link to='/login' className="text-decoration-none success">Login Now?</Link>
                </div>
                <ToastContainer />
                <AuthButton title='Reset Password' />

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPass
