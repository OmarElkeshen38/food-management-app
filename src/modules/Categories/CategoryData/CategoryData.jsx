
import React from 'react'
import { Categories_Urls, privateAxiosInstance } from '../../../Services/Urls/Urls'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'


export default function CategoryData({closeMadel,getAllCategories,categoryId,setCategoryId,editCategory}) {
  let{register,formState:{errors ,isSubmitting},handleSubmit,setValue}=useForm()


  React.useEffect(() => {
    if (categoryId) {
      setValue("name", editCategory)
    }
  }, [editCategory, setValue])
  
     let onSubmit=async(data)=>{
        try {
          if (categoryId){
            let response =await privateAxiosInstance.put(`${Categories_Urls.Update_Category}/${categoryId}`,data )
            setCategoryId(null)
            toast.success( response.data.message ||"Edited Successfuly")
          }else{
          let response =await privateAxiosInstance.post(`${Categories_Urls.Add_Category}`,data )
          // console.log(response)
          // console.log(data)
          toast.success(response.data.message ||"Added Successfuly")
          }
          getAllCategories()
          closeMadel()
        } catch (error) {
          console.log(error)
          toast.error("Error occurred while saving data")
        }
       
       }
  return (
    <>

    <div className='modal  d-flex align-items-center justify-content-center row '>
             <div className=' bg-white rounded-2 position-relative col-md-5 p-2 px-5 pb-5 pt-3'>
             <div className="title d-flex justify-content-between  mb-5 ">
                     <h3 className='h5'> {categoryId?"Update Category":"Add Category"}</h3>
                     <i className="fa-regular fa-circle-xmark fs-3 text-danger " onClick={()=>{setCategoryId(null);closeMadel(true)} }></i>
                    </div>
                          <form onSubmit={handleSubmit(onSubmit)} >
                                 <input {...register("name" , { required: "The name field is required."}) }  type='text' className="form-control input-group-text mt-5 mb-3 " placeholder=" Caregory Name" aria-label="Username" aria-describedby="basic-addon1"/>
                                 {errors.name && <span className="text-danger">{errors.name.message}</span>}
                            <button  disabled={isSubmitting}  className='position-absolute end-0 bottom-0 p-4  btnn rounded-2 py-2 my-2 '> {isSubmitting?"Saving...":"Save "} </button>
                          </form>
                    </div>
         
             </div>
 
    
    </>
  )
}
