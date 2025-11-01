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
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
