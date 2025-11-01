import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Category from "./Category";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Category />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
