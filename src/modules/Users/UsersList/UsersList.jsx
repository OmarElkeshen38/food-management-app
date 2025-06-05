import React, { useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header'
import NoData from '../../Shared/Nodata/NoData'
import { baseURL, img_URL, privateAxiosInstance, Users_Urls } from '../../../Services/Urls/Urls'
import imag from "../../../assets/images/recipes_img (1).png"
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import Pagination from '../../Shared/Pagination/Pagination'
import { useNavigate, useOutletContext } from 'react-router-dom'
import FavoritesData from '../../Favorites/FavoritesData/FavoritesData'




export default function UsersList() {
  const [usersList, setUsersList] = useState([])
   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleteById, setDeleteById] = useState(null)
     const [isLoading, setIsLoading] = useState(true)
     const [arrayOfPages, setArrayOfPages] = useState([])
     const [nameValue, setNameValue] = useState("")
     const [countryValue, setCountryValue] = useState("")
     const [phoneValue, setPhoneValue] = useState("")
     const { saveLoginData } = useOutletContext();
  const loginData =saveLoginData()
  const navigate =useNavigate()
   const [selectedUser, setSelectedUser] = useState(null)
 
    let getAllUsers=async(pageSize,pageNumber,userName,country,phoneNumber)=>{
     try {
       let response =await privateAxiosInstance.get(Users_Urls.Get_Users,{
        params:{pageSize :pageSize,
          pageNumber :pageNumber,
          userName:userName,
          country :country,
          phoneNumber:phoneNumber  
         } 
        
       } )
       console.log(response);
       setUsersList(response?.data.data)
       setArrayOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_,index)=>index+1))
      //  console.log(response);
       
       
     } catch (error) {
       console.log(error)
     }
     finally{
       setIsLoading(false)
     }
    }
 
 
    let deleteUser=async(id)=>{
     try {
       let response =await privateAxiosInstance.delete(`${baseURL}users/${deleteById}`)
       getAllUsers()
        toast.success(response?.data.message||"Deleted Successfully")
       setShowDeleteConfirm(false)
 
     } catch (error) {
       console.log(error)
       toast.error(error.message||"Failed")

     }
    }
 
    let getNameValue=(e)=>{
      setNameValue(e.target.value)
      getAllUsers(3,1,e.target.value,countryValue,phoneValue)
      }
    let getCountryValue=(e)=>{
      setCountryValue(e.target.value)
      getAllUsers(3,1,nameValue,e.target.value,phoneValue)
      }
 
    let getPhoneValue=(e)=>{
      setPhoneValue(e.target.value)
      getAllUsers(3,1,nameValue,countryValue,e.target.value)
      }
 
      const handleView = (user) => {
        setSelectedUser(user);  
      }

    useEffect(()=>{
      {loginData.userGroup=="SystemUser"?navigate("/login"):getAllUsers(4,1)}}

      
     ,[]
    )
 
   return (
     <>
      <div className="content mx-3">
     <Header title={"Users List "} description={"You can now add your items that any user can order it from the Application and you can edit"} img={imag}/>
     
    <div className=' title d-flex justify-content-between p-4 mx-3'>
    <div className="description ">
       <h3>Users Table Details</h3>
       <span>You can check all details</span>
     </div>
    </div>
    <div className="searchSection container">
          <div className="row">
            
            <div className="col-md-4">
              <div className="input-group border-1 border rounded">
                <span className='input-group-text border-0 bg-transparent ' id='search-addon'>
                  <i className='fas fa-user'></i>
                </span>
                <input type="text" 
                className='form-control border-0 rounded p-2' 
                onChange={getNameValue} placeholder='Name'
                 aria-label='Search By Name' aria-describedby='search-addon'/>
              </div>
            </div>
            
            <div className="col-md-4">
            <div className="input-group border-1 border rounded">
                <span className='input-group-text border-0 bg-transparent ' id='search-addon'>
                  <i className='fas fa-earth-americas'></i>
                </span>
                <input type="text" 
                className='form-control border-0 rounded p-2' 
                onChange={getCountryValue} placeholder='Country'
                 aria-label='Search' aria-describedby='search-addon'/>
              </div>
            </div>
            
           
            <div className="col-md-4">
            <div className="input-group border-1 border rounded">
                <span className='input-group-text border-0 bg-transparent ' id='search-addon'>
                  <i className='fas fa-phone'></i>
                </span>
                <input type="text" 
                className='form-control border-0 rounded p-2' 
                 onChange={getPhoneValue} placeholder='Phone Number'
                 aria-label='Search' aria-describedby='search-addon'/>
              </div>
            </div>
           
          </div>
        </div>
    
     <div className="container-fluid my-5">
        <table className="table table-striped ">
   <thead>
     <tr>
       <th scope="col">#</th>
       <th scope="col">Name</th>
       <th scope="col">Image </th>
       <th scope="col">country </th>
       <th scope="col">Phone Number </th>
       <th scope="col">Role </th>
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
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  /> */}
    
  </tr>)):usersList&&usersList.length >0 ? usersList.map((user,idx)=>
      <tr key={idx}>
      <th scope="row">{user.id}</th>
      <td>{user.userName}</td>
      <td><img width={"50"} src={user.imagePath?`${img_URL}${user.imagePath}`:imag}alt="ٌ Recipe image" /></td>
      <td>{user.country}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.group.name}</td>
      
      <td className="dropdown">
      <i className="fa-solid fa-ellipsis" data-bs-toggle="dropdown"></i>
      <ul className="dropdown-menu">
      <li onClick={() => handleView(user)}> <i  className="fa-solid fa-hurricane  m-3 icon-color"></i>View</li>
      <li onClick={()=> {setShowDeleteConfirm(true);setDeleteById(user.id)}}> <i className="fa fa-trash m-3 icon-color " ></i> Delete</li>
     
     </ul>
     </td>
     
    </tr> 
   ): < NoData/> }
    
   </tbody>
 </table>
        </div>
        {showDeleteConfirm&&
        <DeleteConfirmation close={()=>setShowDeleteConfirm(false)} confirmDelete={deleteUser}/>
        }
        </div>
        <div className="d-flex justify-content-end pe-5">
        <Pagination arrayOfPages={arrayOfPages} PaginationFun ={getAllUsers}/>
        </div>
        {selectedUser&&(<FavoritesData selectedUser={selectedUser} closeModal={()=>setSelectedUser(null)}/>)}
     </>
   )
}
