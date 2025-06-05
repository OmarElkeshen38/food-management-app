import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header'
import NoData from '../../Shared/Nodata/NoData'
import { baseURL, Categories_Urls, privateAxiosInstance } from '../../../Services/Urls/Urls'
import imag from "../../../assets/images/recipes_img (1).png"
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import CategoryData from '../CategoryData/CategoryData'
import Pagination from '../../Shared/Pagination/Pagination'
import { useNavigate, useOutletContext } from 'react-router-dom'


export default function CategoriesList() {

 
  const [categoriesList, setCategoriesList] = useState([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [editCategory, setEditCategory] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [arrayOfPages, setArrayOfPages] = useState([])
  const [nameValue, setNameValue] = useState("")
  const { saveLoginData } = useOutletContext();
  const loginData =saveLoginData()
  const navigate =useNavigate()
    
  

   let getAllCategories=async(pageSize,pageNumber,name)=>{
    try {
      let response =await privateAxiosInstance.get(Categories_Urls.Get_Category,{
        params:{pageSize :pageSize,pageNumber :pageNumber,name:name } 
      })
      setCategoriesList(response?.data.data)
      setArrayOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_,index)=>index+1))
      console.log(response);
      
      
    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoading(false)
    }
   }


   let deleteCategory=async()=>{
    try {
      let response =await privateAxiosInstance.delete(`${baseURL}category/${categoryId}`)
      // setCategoriesList(response?.data.data)
      getAllCategories()
      toast.success(response?.data.message||"Deleted Successfully")
      setShowDeleteConfirm(false)

    } catch (error) {
      console.log(error)
    }
   }

   let getNameValue=(e)=>{
    setNameValue(e.target.value)
    getAllCategories(3,1,e.target.value)
  
    }

   useEffect(()=>{
    {loginData.userGroup=="SystemUser"?navigate("/login"): getAllCategories(4,1)}
   }
    ,[]
   )

  return (
    <>
    <div className="content mx-3">
    <Header title={"Categories item"} description={"You can now add your items that any user can order it from the Application and you can edit"} img={imag}/>
   <div className=' title d-flex justify-content-between p-4 mx-3'>
   <div className="description ">
      <h3>Categories Table Details</h3>
      <span>You can check all details</span>
    </div>
    <button onClick={()=>{setShowAddCategory(true)}} className='btn mt-3 p-3 btn-color text-white'>Add New Category</button>
   </div>
  
   <div className="searchSection container-fluid">
          <div className="row justify-content-center">
            {/* search input */}
            <div className="col-md-9">
              <div className="input-group border-1 border rounded ">
                <span className='input-group-text border-0 bg-transparent p-3 ' id='search-addon'>
                  <i className='fas fa-search'></i>
                </span>
                <input type="text" className='form-control border-0 rounded p-2' onChange={getNameValue} placeholder='Search' aria-label='Search' aria-describedby='search-addon'/>
              </div>
            </div>
           
            </div>
          </div>
       


    <div className="container-fluid my-5">
       <table className="table table-striped ">
  <thead >
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Creation Date</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {isLoading?(( <tr  className=" d-flex  align-items-center justify-content-center text-center ">
    <td className='fs-1'>
      Loading....
     </td>
     {/* <ColorRing
     visible={true}
     height="80"
     width="80"
     ariaLabel="color-ring-loading"
     wrapperStyle={{}}
     wrapperClassName="color-ring-wrapper"
     colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
     /> */}
     
     </tr>)):categoriesList&&categoriesList.length >0 ? categoriesList.map((category,idx)=>
     <tr key={idx}>
     <th scope="row">{category.id}</th>
     <td>{category.name}</td>
     <td>{category.creationDate}</td>
     
     <td className="dropdown">
     <i className="fa-solid fa-ellipsis" data-bs-toggle="dropdown"></i>
     <ul className="dropdown-menu">
     <li onClick={()=>{setEditCategory(category.name);setShowAddCategory(true); setCategoryId(category.id)}}><i className="fa fa-edit m-3 icon-color"></i>Edit</li>
     <li onClick={()=> {setShowDeleteConfirm(true);setCategoryId(category.id)}}> <i className="fa fa-trash m-3 icon-color " ></i> Delete</li>
    </ul>
    </td>
    
   </tr> 
  ): < NoData/> }
   
  </tbody>
  {showAddCategory&&<CategoryData editCategory={editCategory} categoryId={categoryId} getAllCategories={getAllCategories} setCategoryId={setCategoryId} closeMadel={()=>setShowAddCategory(false)}/>}
   
</table>
       </div>
       {showDeleteConfirm&&
       <DeleteConfirmation close={()=>setShowDeleteConfirm(false)} confirmDelete={deleteCategory}/>
       }
        <div className="d-flex justify-content-end pe-5">
       <Pagination arrayOfPages={arrayOfPages} PaginationFun ={getAllCategories}/>
       </div>
       </div>
       
    </>
  )
}


