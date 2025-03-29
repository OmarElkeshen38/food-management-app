import styles from "./Header.module.css";

function Header({title, desc, img}) {
  return (
    <>
      <div className={`container-fluid ${styles.header}`}>
        <div className={`row rounded-4 ${styles.headerContent}`}>
          <div className="col-md-8 d-flex align-items-center">
            <div className="content text-white m-4">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="img w-50 m-auto">
              <img className="w-100" src={img} alt="header image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
