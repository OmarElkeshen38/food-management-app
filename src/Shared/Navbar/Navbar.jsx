import styles from './Navbar.module.css';

function Navbar({ loginData }) {
  console.log(loginData);
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <a className="nav-link">{loginData?.userName} <span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
