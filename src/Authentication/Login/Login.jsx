import styles from "./Login.module.css";
import logo from '../../assets/images/logo1.png';
import emailIcon from '../../assets/icons/email.svg';
import passwordIcon from '../../assets/icons/password.svg';
import showPassIcon from '../../assets/icons/showPass.svg';
import AuthButton from "../../Shared/AuthButton/AuthButton";
import { Link } from "react-router-dom";

function Login() {

  const showPass = () => {
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  return <>
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5 bg-white px-5 py-3 rounded-3">
            <div>
              <div className="logo-container text-center">
                <img className="w-50" src={logo} alt="food recipe" />
              </div>
              <div className="title my-3">
                <h3 className="h5">Log In</h3>
                <p className="text-muted">Welcome Back! Please enter your details</p>
              </div>
              <form className="loginForm">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={emailIcon} className="w-100" alt="email icon" />
                  </span>
                  <input type="email" className="form-control py-2 px-0" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <img src={passwordIcon} alt="password icon" />
                  </span>
                  <input type="password" id="password" className="form-control py-2 px-0" placeholder="Password" aria-label="password" aria-describedby="basic-addon2" />
                  <span className="input-group-text" id="basic-addon2">
                    <img onClick={showPass} src={showPassIcon} className="w-100 border-0 p-0 showPass" alt="show password icon" />
                  </span>
                </div>

                <div className="links d-flex justify-content-between mb-4">
                  <Link to='forget-pass' className="text-black text-decoration-none">Register Now?</Link>
                  <Link to='register' className="text-decoration-none success">Forgot Password?</Link>
                </div>

                <AuthButton title='Login' />

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default Login;
