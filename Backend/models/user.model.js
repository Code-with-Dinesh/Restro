import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import cartschema from "./cartSchema.js";


const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }],
    cart:[cartschema],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre("save",async function(next){
    if (this.isModified("password")) {
    this.password = await  bcrypt.hash(this.password, 10);
  }
  next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = (async function() {
   return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email
    },process.env.ACCESS_TOKEN_KEY,{expiresIn:"1d"})
})

userSchema.methods.generateRefreshToken = (async function(){
    return jwt.sign({
        _id:this._id,

    },process.env.REFRESG_TOKEN_KEY,{expiresIn:"7d"})
})

const user = mongoose.model("user", userSchema);

export default user
