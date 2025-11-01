import Product from "../models/productModel.js"
import cloudinary from "../utils/cloudinary.js";
import Cart from '../models/cartmodel.js'
import fs from 'fs'



const addProduct = async (req,res) => {
    
  try {
    const { title, description, price, stock, category } = req.body;
     
      const result = await cloudinary.uploader.upload(req.file.path, {
         folder:"ecommerce_products"
      });


        fs.unlinkSync(req.file.path);


        const product = await Product.create({
        title,
        description,
        price,
        stock,
        category,
        image: result.secure_url
     });

     console.log("product created:",product);
     
     
     res.status(200).json({
        message:"Product Created Successfully",
        product
    });
  } catch (error) {
    console.log("error creating product:", error);
    res.status(500).json({ message:"server error" })
  }


}


const getAllProducts = async (req,res) => {
  
   try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
   
}


const getProductDetail = async (req,res) => {
  const id = req.params.id
  
   try {
    const productDetail = await Product.findById({_id:id});
    res.status(200).json({
      success: true,
      productDetail,
    });

    // console.log(productDetail);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
   
  
}

const addtocart = async (req,res) => {

   try {
    const userId = req.user._id;
    const productId = req.params.id;

    

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

    if (itemIndex > -1) {
     cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }
  }

  await cart.save();
  res.status(200).json(cart);
   

   } catch (error) {
    console.log("cart problem:", error);
    
   }
}


const getCartItems = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId", "name price image"); // Only needed fields

    if (!cart) {
      return res.json({ items: [], totalPrice: 0 });
    }

    // const formattedItems = cart.items.map((item) => ({
    //   _id: item._id,
    //   productId: item.productId._id,
    //   name: item.productId.name,
    //   price: item.productId.price,
    //   image: item.productId.image,
    //   quantity: item.quantity,
    //   subtotal: item.quantity * item.productId.price,
    // }));

    const formattedItems = cart.items
  .filter(item => item.productId) // skip null products
  .map((item) => ({
    _id: item._id,
    productId: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    image: item.productId.image,
    quantity: item.quantity,
    subtotal: item.quantity * item.productId.price,
  }));


    const totalPrice = formattedItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    return res.json({
      items: formattedItems,
      totalPrice,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { productId, action } = req.body; // action: "inc" | "dec"
    
    const userId = req.user; // Assuming user is authenticated

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    
    const item = cart.items.find(item => item.productId.toString() === productId);

    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    
    if (action === "inc") {
      item.quantity += 1;
    } else if (action === "dec" && item.quantity > 1) {
      item.quantity -= 1;
    }


    await cart.save();

    res.json({ message: "Quantity updated", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}





export default {
    addProduct,
    getAllProducts,
    getProductDetail,
    addtocart,
    getCartItems,
    updateQuantity
}
