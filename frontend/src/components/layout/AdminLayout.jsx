import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaCog,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminLayout = () => {

    const navigation = useNavigate()
    
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 🧭 Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">🛍️ ECOM Admin</h2>
          <nav className="space-y-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 hover:text-blue-400"
            >
              <FaChartBar /> Dashboard
            </Link>
            <Link
              to="/admin/products"
              className="flex items-center gap-3 hover:text-blue-400"
            >
              <FaBoxOpen /> Products
            </Link>
            <Link
              to="/admin/add-product"
              className="flex items-center gap-3 hover:text-blue-400"
            >
              <FaPlus /> Add Product
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center gap-3 hover:text-blue-400"
            >
              <FaShoppingBag /> Orders
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center gap-3 hover:text-blue-400"
            >
              <FaUsers /> Users
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center gap-3 hover:text-blue-400"
            >
              <FaCog /> Settings
            </Link>
          </nav>
        </div>

        <button
         
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg mt-6"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* 🧩 Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
