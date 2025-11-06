import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import AppLayout from "./components/layout/AppLayout";
import Profile from "./pages/Profile";
import AllProducts from "./components/categorypages/AllProducts";
import Electronics from "./components/categorypages/Electronics";
import Furniture from "./components/categorypages/Furniture";
import HomeKitchen from "./components/categorypages/HomeKitchen";
import Fashion from "./components/categorypages/Fashion";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./admin-pages/AddProduct";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./admin-pages/Dashboard";
import Products from "./admin-pages/Products";
import Orders from "./admin-pages/Orders";
import Users from "./admin-pages/Users";
import Settings from "./admin-pages/Settings";



const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/user/cart",
        element: <Cart />,
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
      {
        path: "/all-category-products",
        element: <AllProducts />,
      },
      {
        path: "/electronics",
        element: <Electronics />,
      },
      {
        path: "/furnitures",
        element: <Furniture />,
      },
      {
        path: "/Home&Kitchen",
        element: <HomeKitchen />,
      },
      {
        path: "/fashion",
        element: <Fashion />,
      },
      {
        path: "/productdetails/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children:[
      {
        path:"add-product",
        element:<AddProduct />
      },
      {
        path:"dashboard",
        element:<Dashboard />
      },
      {
        path:"products",
        element:<Products />
      },
      {
        path:"orders",
        element:<Orders />
      },
      {
        path:"users",
        element:<Users />
      },
      {
        path:"settings",
        element:<Settings />
      },      
    ]
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
