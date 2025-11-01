import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Render = ({ product }) => {
    axios.get()
  return (
    <div>
      <div
        className="p-2 rounded flex flex-col justify-center items-center gap-2"
      >
        <Link to={`/productdetails/${product._id}`}>
          <img
            src={product.image}
            alt="products"
            className="w-[200px] h-[250px] rounded-2xl"
          />
        </Link>
        <h2 className="font-semibold">{product.title}</h2>
        <p className="text-green-600 font-medium">
          <span className="text-gray-700">Price: </span>Rs.{product.price}
        </p>
      </div>
    </div>
  );
};

export default Render;
