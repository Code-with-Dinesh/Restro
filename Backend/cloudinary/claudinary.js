import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()

console.log()
cloudinary.config({
  cloud_name: "dw1h2rdtn",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINAY_SECRET,
});

export default cloudinary;
