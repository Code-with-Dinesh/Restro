import ApiError from "../utils/ApiError.js";
import cloudinary from "../cloudinary/claudinary.js";
import categoryMode from "../models/category.mode.js";
import fs from "fs";
import fooditemModel from "../models/fooditem.model.js";
// add category
export const addcategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || !req.file) {
      throw new ApiError(400, "All fields are required");
    }
    // upload the image on cloudinay
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "category",
    });
     console.log(result)
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      } else {
        console.log("Local file deleted:", req.file.path);
      }
    });
    // save categroy in db
    const category = await categoryMode.create({
      title,
      coverimage: result.secure_url,
      public_id:result.public_id,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const deletecategory = async(req,res,next)=>{
  try {
      const { id } = req.params;
      const category = await categoryMode.findById(id)
      console.log(category)
      if(!category){
        throw new ApiError(404,"Category not found")
      }
      console.log("public id",category.public_id)
      if(category.public_id){
         await cloudinary.uploader.destroy(category.public_id)
      }
      const deletecategory = await categoryMode.findByIdAndDelete(id)
      console.log(deletecategory)
      res.status(200).json({success:true,message:"Successfully delete the cateogry"})
  } catch (error) {
     next(error)
  }
}

export const additem = async (req, res, next) => {
  try {
    const { name, description, price, category, availabilty, options } =
      req.body;
    if (!name || !description || !price || !category || !req.file) {
      throw new ApiError(400, "All fields are required");
    }

    const categoryExist = await categoryMode.findById(category);

    if (!categoryExist) {
      throw new ApiError(400, "Category is not Exist for this product");
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "FoodItem",
    });

    
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log("Error while uploads the fooditem", err);
      } else {
        console.log("Local file deleted:", req.file.path);
      }
    });

    const fooditem = await fooditemModel.create({
      name,
      description,
      price,
      availabilty,
      image: result.secure_url,
      options,
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Product added successfully",
        data: fooditem,
      });
  } catch (error) {
    next(error);
  }
};
