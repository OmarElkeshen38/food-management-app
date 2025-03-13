import styles from "./Header.module.css";

function Header({title, desc, img}) {
  return (
    <>
      <div className="container-fluid">
        <div className="row p-5 rounded-4 bg-dark">
          <div className="col-md-8">
            <div className="caption bg-info">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="img-container bg-danger">
              <h2>soraa</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
