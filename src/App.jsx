import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import ForgetPass from "./modules/Authentication/componants/ForgetPass/ForgetPass";
import Login from "./modules/Authentication/componants/Login/Login";
import Register from "./modules/Authentication/componants/Register/Register";
import ResetPass from "./modules/Authentication/componants/ResetPass/ResetPass";
import VerfiyAccount from "./modules/Authentication/componants/VerfiyAccount/VerfiyAccount";
import Dashboard from "./modules/Dashboard/components/Dashboard/Dashboard";
import RecipesData from "./modules/Recipes/components/RecipesData/RecipesData";
import RecipesList from "./modules/Recipes/components/RecipesList/RecipesList";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";
import CategoriseList from "./modules/categorise/components/CategoriseList/CategoriseList";
import FavList from "./modules/favourites/componants/FavList/FavList";
import UserList from "./modules/users/components/UserList/UserList";

function App() {

const [loginData, setLoginData] = useState(null);

const saveUserData=()=>{
  const incodeing=localStorage.getItem('token');
  const decoding=jwtDecode(incodeing);
  setLoginData(decoding);
  // console.log(loginData);

}

useEffect(() => {
  if (localStorage.getItem('token')) {
    saveUserData()
  }
  
}, []);


  const routes = createBrowserRouter(
    [
      { 
        path:"",
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true ,element:<Login saveUserData={saveUserData}/>},
          {path:'login',element:<Login saveUserData={saveUserData} />},
          {path:'register',element:<Register/>},
          {path:'verify-account',element:<VerfiyAccount/>},
          {path:'forget-pass',element:<ForgetPass/>},
          {path:'reset-pass',element:<ResetPass/>},
        ]
        
      },
      {
        path:'dashboard',
        element:<ProtectedRoute loginData={loginData}><MasterLayout loginData={loginData} /></ProtectedRoute> ,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Dashboard loginData={loginData}/>},
          {path:'',element:<Dashboard loginData={loginData} />},
          {path:'recipes',element:<RecipesList/>},
          {path:'recipe-data',element:<RecipesData/>},
          {path:'categories',element:<CategoriseList/>},
          {path:'users',element:<UserList/>},
          {path:'favorites',element:<FavList/>},
        ]

      }
    ]
  )

  return(
    <>
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App;
