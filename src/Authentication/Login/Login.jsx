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

function Login() {

  const showPass = () => {
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  let {register, formState:{errors}, handleSubmit} = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await axiosInstance.post(`${USER_URLS.login}`, data);
      navigate('/dashboard');
      toast.success("Logged in successfully", {
        position: "top-right",
        theme: "light"
      });
      
    } catch (error) {
      toast.error(error.response.data.message,{
        theme: "light"
      });
      
    }
  }

  return <>
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-sm-11 col-md-7 col-lg-5 bg-white px-5 py-3 rounded-3">
            <div>
              <div className="logo-container text-center">
                <img className="w-50" src={logo} alt="food recipe" />
              </div>
              <div className="title my-3">
                <h3 className="h5">Log In</h3>
                <p className="text-muted">Welcome Back! Please enter your details</p>
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

                <div className="input-group my-2">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={passwordIcon} alt="password icon" />
                  </span>
                  <input {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: 'Password must be at least 8 characters and include at least one number and one special character (@, #, $, etc.).'
                    }
                  })}
                  type="password" id="password" className="form-control py-2 px-0" placeholder="Password" aria-label="password" aria-describedby="basic-addon2" />
                  <span className="input-group-text" id="basic-addon2">
                    <img onClick={showPass} src={showPassIcon} className="w-100 border-0 p-0 showPass" alt="show password icon" />
                  </span>
                </div>

                {errors.password&&<span className="bg-transparent text-danger mb-3">{errors.password.message}</span>}

                <div className="links d-flex justify-content-between mb-4">
                  <Link to='/register' className="text-black text-decoration-none">Register Now?</Link>
                  <Link to='/forget-password' className="text-decoration-none success">Forgot Password?</Link>
                </div>
                <ToastContainer />
                <AuthButton title='Login' />

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Login;
