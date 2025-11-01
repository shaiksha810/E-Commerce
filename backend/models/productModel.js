import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }, 
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:String,
    },
    image:{
        type:String,
        required:true
    },
},

{ timestamps:true });

const Product = mongoose.model("productSchema", productSchema);

export default Product;