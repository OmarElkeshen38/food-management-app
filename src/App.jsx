import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/Shared/AuthLayout/AuthLayout'
import Login from './modules/Authentication/Login/Login.jsx'
import ForgetPass from './modules/Authentication/Forget-pass/ForgetPass'
import Register from './modules/Authentication/Register/Register'
import ResetPass from './modules/Authentication/Reset-pass/ResetPass'
import RecipesList from './modules/Recipes/RecipesList/RecipesList.jsx'
// import RecipeData from './modules/Recipes/RecipeData/RecipeData'
import Dashboard from './modules/Dashboard/Dashboard'
import MasterLayout from './modules/Shared/MasterLayout/MasterLayout'
import NotFound from './modules/Shared/NotFound/NotFound'
import CategoriesList from './modules/Categories/CategoriesList/CategoriesList'
import CategoryData from './modules/Categories/CategoryData/CategoryData'
import UsersList from './modules/Users/UsersList/UsersList'
import VerifyAccount from './modules/Authentication/Verify-account/VerifyAccount.jsx'
import { Bounce, ToastContainer } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './modules/Shared/ProtectedRoute/ProtectedRoute.jsx'
import RecipeData from './modules/Recipes/RecipeData/RecipeData.jsx'
import FavoritesList from './modules/Favorites/FavoritesList/FavoritesList.jsx'
import './App.css'




function App() {
 

  let saveLoginData=()=>{
    let token =localStorage.getItem("token");
    return token ?jwtDecode(token):null;
  }

  
  

  const routes=createHashRouter([{
    path:"", 
    element:<AuthLayout/>,
    errorElement:<NotFound/>,
    children:[
      {index:true, element:<Login saveLoginData= {saveLoginData}/>},
      {path:"login", element:<Login saveLoginData= {saveLoginData}/>},
      {path:"forget-password", element:<ForgetPass/>},
      {path:"register", element:<Register/>},
      {path:"reset-password", element:<ResetPass/>},
      {path:"verify-account", element:<VerifyAccount/>},
      // {path:"change-password", element:<ChangePass/>},
    ]
  },

  {
    path:"/dashboard",
    element: <ProtectedRoute>  <MasterLayout saveLoginData={saveLoginData}/></ProtectedRoute>,
    errorElement:<NotFound/>,
    children:[
      {index:true, element:<Dashboard/>},
      {path:"recipes", element:<RecipesList/>},
      {path:"recipes/new-recipe", element:<RecipeData/>},
      {path:"recipes/:recipeId", element:<RecipeData/>},
      {path:"favorites", element:<FavoritesList/>},
      {path:"categories", element:<CategoriesList/>},
      {path:"category-data", element:<CategoryData/>},
      {path:"users", element:<UsersList/>},
    ]
  }

])

  return (
    <>
   
    <RouterProvider router={routes}></RouterProvider>
    

    <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick={false}
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  transition={Bounce}/>
    
    </>
  )
}

export default App
