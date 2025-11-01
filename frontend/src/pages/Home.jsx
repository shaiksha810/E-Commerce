import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../components/categorypages/productSlice";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

const Home = ({ category }) => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products || {});
  const { items = [], status = "idle", error = null } = productsState;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Category-wise filter (optional, e.g., show Electronics in carousel)
  const filteredProducts =
    category && category !== "All"
      ? Array.isArray(items)
        ? items.filter((p) => p.category === category)
        : []
      : Array.isArray(items)
      ? items
      : [];

  // Extract images from filtered products
  const slides = filteredProducts.map((p) => p.image); // assuming product has `image` field
  const [current, setCurrent] = useState(0);

  const nextSlide = React.useCallback(() => {
    setCurrent((prev) => (prev + 1) % (slides.length || 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + (slides.length || 1)) % (slides.length || 1)
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  if (slides.length === 0) return <p>No products to show</p>; // fallback

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-8">
      <h2 className="font-bold text-3xl text-center mt-4">
        Meet Our New Products
      </h2>

      <div className="relative w-[900px] max-w-full aspect-[16/9] flex items-center justify-center overflow-hidden rounded-2xl shadow-lg bg-gray-100">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-3 md:left-[-50px] text-3xl text-gray-700 hover:text-gray-900 transition-colors z-10"
        >
          <GrPrevious />
        </button>

        {/* Image */}
        <img
          src={slides[current]}
          alt={filteredProducts[current].name}
          key={current}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
        />

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-3 md:right-[-50px] text-3xl text-gray-700 hover:text-gray-900 transition-colors z-10"
        >
          <GrNext />
        </button>

        {/* Start Shopping Button */}
        <Link
          to="/all-category-products"
          className="absolute bottom-6 bg-red-600 text-white font-semibold px-7 py-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-20"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
};

export default Home;
