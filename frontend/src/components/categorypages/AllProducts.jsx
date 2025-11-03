import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productSlice.js";
import Render from "../UI/Render.jsx";
import { useSearch } from "../../context/ContextSearch.jsx";

const AllProducts = ({ category }) => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products || {});
  const { items = [], status = "idle", error = null } = productsState;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Category-wise filter

  const { searchTerm } = useSearch();
  //  console.log(searchTerm);

  // 🔹 Step 2: Filter by search term (if user types something)
  let filteredProducts = [];
  if (searchTerm && searchTerm.trim() !== "") {
    filteredProducts = Array.isArray(items)
      ? items.filter((p) =>
          p.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  } else {
    filteredProducts =
      category && category !== "All"
        ? Array.isArray(items)
          ? items.filter((p) => p.category === category)
          : []
        : Array.isArray(items)
        ? items
        : [];
  }

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-4 gap-6 mt-4">
        {filteredProducts.map((product) => (
          <Render key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
