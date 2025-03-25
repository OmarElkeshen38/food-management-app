import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useState } from 'react';
import navbarImg from '../../assets/images/navbarImg.png';

function Navbar({ loginData }) {

  const [showChangePassword, setShowChangePassword] = useState(false)

  const navigate = useNavigate()


  return (
    <>
      <nav className={`navbar navbar-expand-lg ${styles.navBg}`}>
        <div className="container-fluid mx-3">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-aut w-100 mb-2 d-flex gap-3 justify-content-between align-items-center mb-lg-0 ">
              <div className="d-flex w-75 justify-content-between align-items-center">
                <div className={`${styles.serchInput} w-100`}>
                  <i className="fa-solid fa-search me-2"></i>
                  <input type="text" className='w-75' placeholder="Search Here" />
                </div>
              </div>
              <div className="d-flex gap-3">
                <li className="nav-item d-flex align-items-center">
                  <img className={styles.imgNav} src={navbarImg} alt="profile image" />
                  <a className="nav-link active" aria-current="page">{loginData?.userName}</a>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item "><i className="fa-solid fa-user"></i> Profile</a></li>
                    <li><a onClick={() => setShowChangePassword(true)} className="dropdown-item" ><i className="fa-solid fa-lock-open"></i> ChangePassword</a></li>
                    <li><a onClick={() => navigate("/login")} className="dropdown-item" ><i className="fa-solid fa-right-from-bracket"  ></i> LogOut </a></li>
                  </ul>
                </li>
                <li className="nav-link">
                  <i className="fa-solid fa-bell"></i>
                </li>
              </div>

            </ul>

          </div>
        </div>
      </nav>

      {/* {showChangePassword && (<ChangePass closeModal={() => setShowChangePassword(false)} />)} */}

    </>
  )
}

export default Navbar
