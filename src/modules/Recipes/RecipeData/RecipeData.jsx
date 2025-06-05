import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Categories_Urls, privateAxiosInstance, Recipes_Urls, Tags_Urls } from '../../../Services/Urls/Urls'
import { toast } from 'react-toastify'



export default function RecipeData() {
 
    let{register,formState:{errors ,isSubmitting},handleSubmit,setValue}=useForm()
    const [categories, setCategories] = useState([])
      const [tags, setTags] = useState([])
      let navigate =useNavigate()

     let onSubmit=async(data)=>{
      let formData= new FormData()
      
      for(let key in data){
        if(key==="recipeImage"){
          {formData.append(key,data?.[key]?.[0])}

        }else
        {formData.append(key,data[key])}
      }

            try {
               if (recipeId){
                          let response =await privateAxiosInstance.put(`${Recipes_Urls.Update_Recipes}/${recipeId}`,data )
                          toast.success( response.data.message ||"Edited Successfuly")
                          navigate("/dashboard/recipes")
                        } else
              {let response =await privateAxiosInstance.post(`${Recipes_Urls.Add_Recipes}`,formData )
              // console.log(response)
              // console.log(data)
              navigate("/dashboard/recipes")
              
              toast.success(response.data.message ||"Added Successfuly")}
              }
             
             catch (error) {
              console.log(error)
              toast.error("Error occurred while saving data")
            }
           
           }
  let parms =useParams()
  const recipeId =parms.recipeId

    let getAllCategories=async()=>{
         try {
           let response =await privateAxiosInstance.get(Categories_Urls.Get_Category)
           setCategories(response?.data.data)
          //  console.log(response);
         } catch (error) {
           console.log(error)
         }
        
        }
      let getAllTags=async()=>{
         try {
           let response =await privateAxiosInstance.get(Tags_Urls.Get_Tags)
           setTags(response?.data)
          //  console.log(response);
           
           
         } catch (error) {
           console.log(error)
         }
        
        }

         useEffect(()=>{
            getAllCategories()
            getAllTags()
            if(recipeId && recipeId !== "new-recipe"){
              const getRecipe=  async ()=>{
                  let response =await privateAxiosInstance.get(`${Recipes_Urls.Get_Recipes}/${recipeId}`);
                  console.log(response);
                  const recipe = response?.data
                  setValue("name",recipe?.name)
                  setValue("tagId",recipe?.tag?.id)
                  setValue("price",recipe?.price)
                  setValue("categoriesIds",recipe?.category[0]?.nam)
                  setValue("description",recipe?.description)
                  setValue("recipeImage",recipe?.recipeImage)
                  }
              getRecipe()
            }
          }
         
               ,[setValue,recipeId]
              )

  return (
    <div className="content  mx-2">
    <div className="header_recipe m-3 p-3 rounded-3">
      <div className="row d-flex justify-content-between">
        <div className='col-md-10'>
        <h3> {recipeId?"Edit":"Fill"} the <span className='fs-3 text-success'>Recipes !</span></h3>
        <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
        </div>
        <div className='col-md-2'>
        <Link to="/dashboard/recipes" className='btn btn-color text-white mt-3 p-3'>All Recipes <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
         </div>
    </div>
    <div className="form mx-5 ">
    <form onSubmit={handleSubmit(onSubmit)} >
    <div className="w-75 card-form p-2  mx-auto align-items-center justify-content-center">
       
              <input {...register("name" , { required: "The name field is required."}) } 
               type='text' className="form-control input-group-text mt-5 mb-2 p-3 " placeholder=" Recipe Name" aria-label="Username" aria-describedby="basic-addon1"/>
                 {errors.name && <span className="text-danger">{errors.name.message}</span>}
                 <div className="form-control  border-0 mb-0 px-2 py-2">
            <select className="form-select input-group-text mb-2 p-3" aria-label="Default select example"  {...register("tagId" , { required: "The Tag  field is required."}) } >
             <option defaultValue>Tags</option>
             {tags?.map(({id,name})=>(
              <option key={id} value={id} >{name}</option>
             ))}
            </select>
            </div>         
                  <input {...register("price" , { required: "The price  field is required."}) }
                    type='text' className="form-control input-group-text mt-3  mb-2 p-3 " placeholder=" Recipe price "  aria-describedby="basic-addon1"/>
                {errors.price  && <span className="text-danger">{errors.price .message}</span>}
                <div className="form-control  border-0 mb-2">
             <select className="form-select input-group-text p-3  "  aria-label="Default select example"  {...register("categoriesIds" , { required: "The Categories  field is required."}) } >
              <option selected>Category</option>
               {categories?.map(({id,name})=>(
              <option key={id} value={id}>{name}</option>
             ))}
           </select>
            </div>
             <textarea {...register("description" , { required: "The description  field is required."}) }  type='text'
              className="form-control input-group-text mb-2  mb-3 " placeholder="  description " aria-label="Username" aria-describedby="basic-addon1"/>
               {errors.description  && <span className="text-danger">{errors.description.message}</span>}

            <div className="add-img rounded-4 text-center w-100" >
               <div className="form-inputs mb-3" role='button'>
              <input {...register("recipeImage" ) } 
               type='file' className="py-5 mt-5 mb-3 "
               placeholder="  recipeImage " aria-label="recipeImage"
               aria-describedby="basic-addon1"/>
            </div>
          </div>
               {errors.recipeImage  && <span className="text-danger">{errors.recipeImage.message}</span>}
               <div className="d-flex form-btn justify-content-end gap-5 btn_groub ">
              <Link to="/dashboard/recipes" className=' p-5 cancel rounded-2 py-2 my-2 '> Cancel </Link>
               <button  disabled={isSubmitting}  className=' p-5 btnn rounded-2 py-2 my-2 '> {isSubmitting?"Saving...":"Save "} </button>
               
              </div>
              </div>

             
    </form>
    </div>
  </div>
  )
}
