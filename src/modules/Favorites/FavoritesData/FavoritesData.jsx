import React from 'react'
import { FAVS_URLS, img_URL, privateAxiosInstance } from '../../../Services/Urls/Urls'
import { toast } from 'react-toastify'
import imag from "../../../assets/images/smile.jpeg"
import avatarImag from "../../../assets/images/avatarImg.jpg"

import { useOutletContext } from 'react-router-dom';


export default function FavoritesData({closeModal,selected,selectedUser}) {


  const { saveLoginData } = useOutletContext();
  const loginData =saveLoginData()
  let addFavesList=async(id)=>{
      try {
        let response =await privateAxiosInstance.post(FAVS_URLS.ADD_Favs,{"recipeId":id})
        console.log(response);
        
       toast.success(response?.data.message||"Add Successfully")
       closeModal()
       
      } catch (error) {
        console.log(error)
      }
    }

  
  return (
    <>


<div role="dialog" aria-modal="true" className="fade modal show" tabindex="-1" style={{display: "block"}}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
          <div className="modal-header justify-content-space-between">
        <h5 className="modal-title" > {selected?"Recipe Details":"User Details"} </h5>
        
        <button  onClick={closeModal}  type="button" className="btn text-danger" data-bs-dismiss="modal" aria-label="Close">
          <i className="fa-regular fa-circle-xmark position-absolute top-0 end-0 fs-3 p-3  "></i>
        </button>
      </div>
          <div className="modal-body text-center">
            {selected? <div> <img  className='text-center w-75'  src={selected.imagePath?`${img_URL}${selected.imagePath}`:imag} alt="Recipe Image" />
              <div className="text-start mt-3 modal-detail px-3">
                <h6>  <span className='fw-bold' >Name: </span>{selected.name}</h6>
                <h6>  <span className='fw-bold' >Description: </span>{selected.description}</h6>
                <h6>  <span className='fw-bold' >Category: </span>{selected.category[0].name}</h6>
                <h6>  <span className='fw-bold' >Tag: </span>{selected.tag.name}</h6>
                <h6>  <span className='fw-bold' >Price: </span>{selected.price} EGP</h6>
                  
                  </div></div>:<div> <img  className='text-center  user-image'  src={selectedUser.imagePath?`${img_URL}${selectedUser.imagePath}`:avatarImag} alt="Recipe Image" />
              <div className="text-start mt-3 modal-detail px-3">
                <h6>  <span className='fw-bold' >ID: </span>{selectedUser.id}</h6>
                <h6>  <span className='fw-bold' >Name: </span>{selectedUser.userName}</h6>
                 <h6>  <span className='fw-bold' >Phone Number: </span>{selectedUser.phoneNumber}</h6>
                <h6>  <span className='fw-bold' >Email: </span>{selectedUser.email}</h6>
                <h6>  <span className='fw-bold' >Roll: </span>{selectedUser.group.name}</h6>
                  </div></div>}
         
                  </div>
                  <div  className="modal-footer ">
                  {loginData.userGroup=="SystemUser"?<button onClick={()=>{addFavesList(selected.id)}}  type="button" className="btn btn-danger btnn">Add To Favorite</button>:""}
                  </div>
                  </div>
                  </div>
                  </div>


        
          {/* <div className='modal  d-flex align-items-center justify-content-center'>
            <div className=' bg-white p-3 rounded-2 position-relative '>
              <div className="px-5">
              <div className="d-flex">
              <h2 className='me-5'>Recipe Details</h2>
              <i onClick={closeModal} className="fa-regular fa-circle-xmark position-absolute end-0 fs-3 p-1 text-danger"></i>
              </div>
              <div className="content text-center">
             <img width={"100"}  src={selected.imagePath?`${img_URL}${selected.imagePath}`:imag} alt="" />
              <h3>{selected.name}</h3>
              </div>
              <0div className="content mb-3 ">
              <p><span className='fw-bold'>Description</span> : {selected.description}</p>
              <p><span className='fw-bold'>Tag</span> : {selected.tag.name}</p>
              <p> <span className='fw-bold'>Category</span> : {selected.category[0].name}</p>
              <p><span className='fw-bold'>Price</span> : {selected.price} EG</p>
              </0div>
              </div>
              <button onClick={()=>{addFavesList(selected.id)}} className='position-absolute btnn end-0 bottom-0 m-3 rounded-2 px-3 py-2 ' >Favorite</button>
            </div>
        
            </div>  */}
    </>
  )
}

