import styles from "./Login.module.css";
import logo from '../../assets/images/logo1.png';

function Login() {
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
              <form>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">@</span>
                  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default Login;
