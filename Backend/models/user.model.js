import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre("save",async function(next){
    if (this.isModified("password")) {
    this.password =  bcrypt.hash(this.password, 10);
  }
  next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const user = mongoose.model("user", userSchema);

module.exports = user;
