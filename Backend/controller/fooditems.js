import ApiError from "../utils/ApiError.js";
import cloudinary from "../cloudinary/claudinary.js";
import categoryMode from "../models/category.mode.js";
import fs from 'fs'
// add category
export const addcategory = async(req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || ! req.file) {
      throw new ApiError(400, "All fields are required");
    }
    // upload the image on cloudinay
    const result = await cloudinary.uploader.upload(req.file.path,{
        folder:'category'
    })
    

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      } else {
        console.log("Local file deleted:", req.file.path);
      }
    });
    // save categroy in db
    const category = await categoryMode.create({title,coverimage:result.secure_url})

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });


  } catch (error) {
    next(error);
  }
};
