import axios from "axios";
import recipesHeaderImg from '../../assets/images/recipesHeaderImg.png';
import { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import NoData from "../../Shared/NoData/NoData";

function CategoriesList() {

  const [CategoriesList, setCategoriesList] = useState([]);

  let getAllCategories = async () => {
    try {
      let response = await axios.get("https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1", {
        headers: {Authorization: `${localStorage.getItem('token')}`},
      });
      setCategoriesList(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  let deleteCategory = async (id) => {
    try {
      let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${id}`, {
        headers: {Authorization: `${localStorage.getItem('token')}`},
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
                <i className="fa-solid fa-trash text-danger mx-2" onClick={()=>deleteCategory(category.id)}></i>
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
