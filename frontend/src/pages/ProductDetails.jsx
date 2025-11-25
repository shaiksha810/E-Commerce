import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsCartFill, BsFillCartCheckFill } from "react-icons/bs";

const API_URL = import.meta.env.VITE_API_URL;



const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(<BsCartFill />);

  const fetchProductsDetails = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/productDetails/${id}`
      );
      // try common response shapes and set state
      const data =
        response?.data?.products ?? response?.data?.productDetail ?? null;
      setProduct(data);
    //   console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      setProduct(null);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductsDetails();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleCart = async (id) => {
    setCart(< BsFillCartCheckFill className="text-[24px] text-gray-700 font-bold"/>);
    setTimeout(() => {
      setCart(<BsCartFill />);
    }, 2000);

    try {
    const res = await axios.post(
      `${API_URL}/api/addtocart/${id}`,
      {},  // ← empty body
      {
        withCredentials: true, // ← cookie now goes automatically
      }
    );

    console.log(res.data);
  } catch (error) {
    console.log(error.response.data.message);
    alert(error.response.data.message)
  }
  };


  // removed unintended auto-add-to-cart effect that caused Hooks to be called conditionally
  

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-10">
      {/* Left Section - Image + Buttons */}
      <div className="flex flex-col items-center gap-5">
        <img
          src={product.image}
          alt={product.title}
          className="w-[300px] h-[350px] object-cover rounded-xl shadow-md"
        />

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => handleCart(product._id)}
            className="bg-yellow-500 text-2xl text-white px-5 py-2 rounded-lg hover:bg-yellow-800 transition cursor-pointer"
          >
            {/* <BsCartFill /> */}
            {cart}
          </button>
          <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-800 transition cursor-pointer">
            Buy Now
          </button>
        </div>
      </div>

      {/* Right Section - Product Info */}
      <div className="flex flex-col justify-start gap-3">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-500 text-lg capitalize">{product.category}</p>

        <p className="text-green-600 font-semibold text-2xl">
          Rs. {product.price}
        </p>

        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        <p className="text-sm text-gray-500 font-medium">
          In Stock: {product.stock}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
