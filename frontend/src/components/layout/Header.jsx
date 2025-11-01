import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useSearch } from "../../context/ContextSearch";


const Header = () => {

  
  const { setSearchTerm } = useSearch();
  

  return (
    <>
      <nav className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-black">
          ECOM.
        </Link>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-md px-3 py-1 w-1/3 text-sm mb-1"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          aria-label="Search products"
        />

        {/* Links */}
        <div className="flex items-center gap-5 font-bold justify-center mb-2">
          <Link
            to="/auth/register"
            className="text-gray-700 hover:text-blue-600"
          >
            Signup
          </Link>
          <Link to="/auth/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link
            to="/user/cart"
            className="text-gray-700 hover:text-blue-600 text-2xl"
          >
            <FaShoppingCart />
          </Link>
          <Link
            to="/user/profile"
            className="text-gray-700 hover:text-blue-600 text-3xl mt-1"
          >
            <MdAccountCircle />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
