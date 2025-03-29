import axios from "axios";
import recipesHeaderImg from '../../assets/images/recipesHeaderImg.png';
import { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import NoData from "../../Shared/NoData/NoData";
import noDataImg from '../../assets/images/noDataImg.svg';

function CategoriesList() {

  const [CategoriesList, setCategoriesList] = useState([]);

  let getAllCategories = async () => {
    try {
      let response = await axios.get("https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1", {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });
      setCategoriesList(response.data.data);

    } catch (error) {
      console.log(error);
    }
  }

  let deleteCategory = async (id) => {
    try {
      let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${id}`, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });
      getAllCategories();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Header img={recipesHeaderImg} title="Categories Item" desc="You can now add your items that any user can order it from the Application and you can edit" />
      <div className="title mt-4 px-4 d-flex align-items-center justify-content-between">
        <div className="caption">
          <h3>Categories Table Details</h3>
          <p>You can check all details</p>
        </div>
        <div className="button">
          <button className="btn btn-success">Add New Category</button>
        </div>
      </div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <div className="img w-50 mx-auto">
                  <img className="w-100" src={noDataImg} alt="no data" />
                </div>
                <h5 className="my-3">Delete This Item ?</h5>
                <p className="m-0 p-0">are you sure you want to delete this item ? if you are sure just click on delete it</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Delete this item</button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">creation date</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {CategoriesList.length > 0 ? CategoriesList.map((category) =>
              <tr key={category.id}>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>{category.creationDate}</td>
                <td>
                  {/* <i className="fa-solid fa-trash text-danger mx-2" onClick={() => deleteCategory(category.id)}></i> */}
                  <i className="fa-solid fa-trash text-danger mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                  <i className="fa-solid fa-edit text-warning"></i>
                </td>
              </tr>
            ) : <NoData />}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CategoriesList;
