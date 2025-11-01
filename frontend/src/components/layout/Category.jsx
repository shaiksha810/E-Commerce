import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <div className=" flex justify-center items-center gap-6 py-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05),0_4px_6px_-1px_rgba(0,0,0,0.05)]">

      <NavLink
        to="/all-category-products"
        className={({ isActive }) =>
          `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-gray-900 text-white border border-gray-900"
              : "text-gray-600 hover:text-gray-900 hover:border-gray-400 border border-transparent"
          }`
        }
      >
        All
      </NavLink>

      <NavLink
        to="/electronics"
        className={({ isActive }) =>
          `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-gray-900 text-white border border-gray-900"
              : "text-gray-600 hover:text-gray-900 hover:border-gray-400 border border-transparent"
          }`
        }
      >
        Electronics
      </NavLink>

      <NavLink
        to="/furnitures"
        className={({ isActive }) =>
          `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-gray-900 text-white border border-gray-900"
              : "text-gray-600 hover:text-gray-900 hover:border-gray-400 border border-transparent"
          }`
        }
      >
        Furniture
      </NavLink>

      <NavLink
        to="/home&kitchen"
        className={({ isActive }) =>
          `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-gray-900 text-white border border-gray-900"
              : "text-gray-600 hover:text-gray-900 hover:border-gray-400 border border-transparent"
          }`
        }
      >
        Home & Kitchen
      </NavLink>

      <NavLink
        to="/fashion"
        className={({ isActive }) =>
          `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-gray-900 text-white border border-gray-900"
              : "text-gray-600 hover:text-gray-900 hover:border-gray-400 border border-transparent"
          }`
        }
      >
        Fashion
      </NavLink>

    </div>
  );
};

export default Category;
