import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      food: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
      quantity: Number,
      option: String 
    }
  ],
  totalPrice: Number,
  status: { type: String, enum: ["pending", "confirmed", "preparing", "delivered", "canceled"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
