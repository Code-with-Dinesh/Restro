import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  image: String,
  availability: { type: Boolean, default: true },
  options: { half: Number, full: Number } 
}, { timestamps: true });

export default mongoose.model("FoodItem", foodItemSchema);
