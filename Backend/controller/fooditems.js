import ApiError from "../utils/ApiError.js";
import cloudinary from "../cloudinary/claudinary.js";
import categoryMode from "../models/category.mode.js";
import fs from 'fs'
import fooditemModel from "../models/fooditem.model.js";
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

export const additem = async(req,res,next)=>{
    try {
        const {name,description,price,category,availabilty,options} = req.body;
        if(!name || !description || !price || !category || !req.file){
            throw new ApiError(400,"All fields are required")
        }
        
        const categoryExist = await categoryMode.findById(category)
        console.log(categoryExist)
        if(!categoryExist){
            throw new ApiError(400,"Category is not Exist for this product")
        }
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:"FoodItem"
        })
        
        console.log(result)
        fs.unlink(req.file.path,(err)=>{
            if(err){
                console.log("Error while uploads the fooditem",err)
            }
            else{
                console.log("Local file deleted:", req.file.path);
            }
        })

        const fooditem = await fooditemModel.create({name,description,price,availabilty,image:result.secure_url,options})
        res.status(201).json({success:true,message:"Product added successfully",data:fooditem})
    } catch (error) {
         next(error)
    }
}