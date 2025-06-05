import React, { useEffect, useState } from 'react'
import { baseURL, FAVS_URLS, img_URL, privateAxiosInstance } from '../../../Services/Urls/Urls'
import imag from "../../../assets/images/recipes_img (1).png"
import recipeImag from "../../../assets/images/smile.jpeg"
import Header from '../../Shared/Header/Header'
import NoData from '../../Shared/Nodata/NoData'
import { useNavigate, useOutletContext } from 'react-router-dom'
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'

export default function FavoritesList() {
  const [favsList, setFavsList] = useState([])
   const [isLoading, setIsLoading] = useState(true)
   const { saveLoginData } = useOutletContext();
  const loginData =saveLoginData()
  const navigate =useNavigate()
   const [deleteById, setDeleteById] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  let getFavesList=async()=>{
    try {
      let response =await privateAxiosInstance.get(FAVS_URLS.Get_Favs)
     setFavsList(response?.data?.data)
     console.log(response?.data?.data);
     
    } catch (error) {
      console.log(error)
    } finally{
      setIsLoading(false)
    }
    
   }

  let deleteFavesList=async()=>{
    try {
      let response =await privateAxiosInstance.delete(`${baseURL}userRecipe/${deleteById}`)
      toast.success(response?.data.message||"Deleted Successfully")
      getFavesList()
      setShowDeleteConfirm(false)
     
    } catch (error) {
      console.log(error)
    } 
    
   }

   useEffect(()=>{
    {loginData.userGroup!="SystemUser"?navigate("/login"):getFavesList()}
   
   },[])
  return (
    <>
     <div className="content mx-3">
    <Header title={"Favorite items"} description={"You can now add your items that any user can order it from the Application and you can edit"} img={imag}/>
   <div className="fav-content mt-5">
   <div className="row">
    {isLoading?((
      
           <div  className=" d-flex  align-items-center justify-content-center text-center ">
       
       <p className='fs-1'>
      Loading....
     </p>
       
        </div>)):favsList&&favsList.length >0 ? favsList.map((favRecipe,idx)=>
           <div key={idx} className="col-md-4">
           <div class="card rounded-3 position-relative">
         <img className='w-100 rounded-3 favImg' src={favRecipe.recipe.imagePath?`${img_URL}${favRecipe.recipe.imagePath}`:recipeImag} alt="Recipe Image" />
    <div class="card-body">
      <h5 class="card-title">{favRecipe.recipe.name}</h5>
      <p class="card-text">{favRecipe.recipe.description}</p>
      <p class="card-text">{favRecipe.recipe.price} EG</p>
     </div>
     <span onClick={()=>{setShowDeleteConfirm(true), setDeleteById(favRecipe.id)}} className="heart  position-absolute  bg-white p-2"><i className="fa-solid fa-heart fs-5 "></i></span>
    
</div>
           </div>
         ):<NoData/>}
          
          </div>
    
   </div>
    </div>
     {showDeleteConfirm&&( <DeleteConfirmation close={()=>setShowDeleteConfirm(false)} confirmDelete={deleteFavesList}/>)}
    </>
  )
}
