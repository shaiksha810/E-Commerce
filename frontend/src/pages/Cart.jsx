import axios from "axios";
import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const getCartItems = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/mycart", {
        withCredentials: true,
      });
      setCart(res.data.items);
      // console.log(res.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

 const updateQuantity = async (productId, action) => {
  try {
    await axios.put(
      "http://localhost:8000/api/update-quantity",
      { productId, action },
      { withCredentials: true }
    );
    getCartItems(); // refresh cart
  } catch (error) {
    console.log(error);
  }
};


  

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-8 text-gray-700">CART</h1>

      {/* Header Row */}
      <div className="grid grid-cols-6 text-sm font-medium text-gray-500 border-b pb-3">
        <p className="col-span-3">CART ITEMS</p>
        <p className="text-center">PRICE</p>
        <p className="text-center">QUANTITY</p>
        <p className="text-right">SUBTOTAL</p>
      </div>

      {/* Items */}
      {
      cart.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-6 items-center py-5 border-b"
        >
          {/* Product */}
          <div className="flex items-center gap-4 col-span-3">
            <img
              src={item.image || "https://via.placeholder.com/80"}
              alt={item.title}
              className="w-20 h-20 object-cover border rounded-md"
            />
            <div>
              <p className="font-semibold text-gray-800">{item.title}</p>
            </div>
          </div>

          {/* Price */}
          <p className="text-center font-medium text-gray-700">₹{item.price}</p>

          {/* Quantity */}
          <div className="flex justify-center items-center gap-2">
            <button className="border px-2 rounded"  onClick={() => updateQuantity(item.productId, "dec")}>-</button>
            <input
              type="text"
              value={item.quantity || 1}
              readOnly
              className="w-10 text-center border rounded"
            />
            <button  onClick={() => updateQuantity(item.productId, "inc")} className="border px-2 rounded">
              +
            </button>
          </div>

          {/* Subtotal */}
          <p className="text-right font-medium text-gray-700">
            ₹{item.price * (item.quantity || 1)}
          </p>
        </div>
      ))}

     
    </div>
  );
};

export default Cart;
