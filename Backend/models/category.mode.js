import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  coverimage:{type:String,required:true},
  public_id: { type: String } 
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
