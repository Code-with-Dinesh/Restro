import ApiError from "../utils/ApiError.js";
import cloudinary from "../cloudinary/claudinary.js";
import categoryMode from "../models/category.mode.js";
import fs from "fs";
import fooditemModel from "../models/fooditem.model.js";
import fooditem from "../models/fooditem.model.js";
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

//get category
export const getcategory = async (req, res, next) => {
  try {
    const allcategories = await categoryMode.find();

    if (allcategories.length === 0) {
      throw new ApiError(404, "No categories found");
    }

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: allcategories,
    });
  } catch (error) {
    next(error);
  }
};


export const deletecategory = async(req,res,next)=>{
  try {
      const { id } = req.params;
      const category = await categoryMode.findById(id)

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


export const getfooditem = async(req,res,next)=>{
  try {
     const allfoods = await fooditem.find()
     if(allfoods.length == 0){
      throw new ApiError(404,"No food items available")
     }
     res.status(200).json({success:true,message:"Item fetched successfully",data:allfoods})
  } catch (error) {
     next(error)
  }
}

// single product api
export const singlefooditem =  async(req,res,next)=>{
  try {
      const {id} = req.params;
      if(!id){
        throw new ApiError(400,"Id is required")
      }
      const food = await fooditemModel.findById(id)
      if(!food){
        throw new ApiError(404,"Food is not  Found ")
      }
      res.status(200).json({success:true,message:'fetch item successfullly',data:food})
  } catch (error) {
    next(err)
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
      public_id:result.public_id,
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

export const deleteitem = async(req,res,next)=>{
  try {
      const {id} = req.params;
      if(!id){
        throw new ApiError(400,"Id is required")
      }
      const fooditem = await fooditemModel.findById(id)
      if(!fooditem){
        throw new ApiError(404,"Fooditem not found")
      }
      if(fooditem.public_id){
        await cloudinary.uploader.destroy(fooditem.public_id)
      }
       await fooditemModel.findByIdAndDelete(id)
          res.status(200).json({
          success: true,
          message: "Food item deleted successfully",
    });
  } catch (error) {
     next(error)
  }
}

export const updateitem = async (req, res, next) => {
  try {
    const { name, description, price, category, availability, options } = req.body;
    const { id } = req.params;

    const fooditem = await fooditemModel.findById(id);
    if (!fooditem) {
      throw new ApiError(404, "No food item found");
    }

    // Update fields
    if (name) fooditem.name = name;
    if (description) fooditem.description = description;
    if (price) fooditem.price = price;
    if (category) fooditem.category = category;
    if (availability !== undefined) fooditem.availability = availability;
    if (options) fooditem.options = typeof options === "string" ? JSON.parse(options) : options;

    // Upload new image if file provided
    if (req.file) {
      // Delete old image from Cloudinary
      if (fooditem.public_id) {
        await cloudinary.uploader.destroy(fooditem.public_id);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "foodItems",
      });

      fooditem.image = result.secure_url;
      fooditem.public_id = result.public_id;
    }

     fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log("Error while uploads the fooditem", err);
      } else {
        console.log("Local file deleted:", req.file.path);
      }
    });

    await fooditem.save();

    res.status(200).json({ success: true, message: "Food item updated successfully", fooditem });
  } catch (error) {
    next(error);
  }
};

