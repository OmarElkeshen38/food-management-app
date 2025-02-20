import React from "react";
import "./App.css";
import Login from "./Authentication/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./Shared/AuthLayout/AuthLayout";
import Register from "./Authentication/Register/Register";
import ForgetPass from "./Authentication/ForgetPass/ForgetPass";
import ResetPass from "./Authentication/ResetPass/ResetPass";
import VerifyAccount from "./Authentication/VerifyAccount/VerifyAccount";
import NotFound from "./Shared/NotFound/NotFound";
import MainLayout from "./Shared/MainLayout/MainLayout";
import Dashboard from "./Dashboard/Dashboard";
import RecipesList from "./Recipes/RecipesList/RecipesList";
import RecipeData from "./Recipes/RecipeData/RecipeData";
import CategoriesList from "./Categories/CategoriesList/CategoriesList";
import CategoryData from "./Categories/CategoryData/CategoryData";
import UsersList from "./Users/UsersList/UsersList";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },
    {
      path: "/dashboard",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "home", element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipe-data", element: <RecipeData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "category", element: <CategoryData /> },
        { path: "users", element: <UsersList /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
