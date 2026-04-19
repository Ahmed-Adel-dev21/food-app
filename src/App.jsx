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
import CategoriseList from "./modules/categorise/components/CategoriseList/CategoriseList";
import FavList from "./modules/favourites/componants/FavList/FavList";
import UserList from "./modules/users/components/UserList/UserList";
import { HashRouter } from 'react-router-dom';

function App() {
  const routes = createBrowserRouter(
    [
      { 
        path:"",
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true ,element:<Login/>},
          {path:'login',element:<Login/>},
          {path:'register',element:<Register/>},
          {path:'verify-account',element:<VerfiyAccount/>},
          {path:'forget-pass',element:<ForgetPass/>},
          {path:'reset-pass',element:<ResetPass/>},
        ]
        
      },
      {
        path:'dashboard',
        element:<MasterLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Dashboard/>},
          {path:'',element:<Dashboard/>},
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
