import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productSchema",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    }
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
