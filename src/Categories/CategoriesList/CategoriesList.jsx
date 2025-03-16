import axios from "axios";
import styles from "./CategoriesList.module.css";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
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
          {CategoriesList.map((category) => 
            <tr key={category.id}>
              <th scope="row">{category.id}</th>
              <td>{category.name}</td>
              <td>{category.creationDate}</td>
              <td></td>
            </tr>
            
          )}
        </tbody>
      </table>
    </>
  );
}

export default CategoriesList;
