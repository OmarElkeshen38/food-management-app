import { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import axios from 'axios';
import NoData from '../../Shared/NoData/NoData';
import recipesHeaderImg from '../../assets/images/recipesHeaderImg.png';

function RecipesList() {

  const [recipesData, setRecipesData] = useState([]);

  let getAllRecipes = async () => {
    try {
      let response = await axios.get("https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1", {
        headers: {Authorization: `${localStorage.getItem('token')}`},
      });
      setRecipesData(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllRecipes();
  }, []);


  return (
    <>
      <Header img={recipesHeaderImg} title="Recipes Items" desc="You can now add your items that any user can order it from the Application and you can edit" />
      <div className="title mt-4 d-flex align-items-center justify-content-between">
        <div className="caption">
          <h3>Recipe Table Details</h3>
          <p>You can check all details</p>
        </div>
        <div className="button">
          <button className="btn btn-success">Add New Item</button>
        </div>
      </div>

      <div className="py-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {recipesData.length > 0 ? recipesData.map((recipe) => 
              <tr key={recipe.id}>
                <th scope="row">{recipe.id}</th>
                <td>{recipe.name}</td>
                <td>{recipe.creationDate}</td>
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
  )
}

export default RecipesList
