import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import FoodItem from "../models/fooditem.model.js";

export const addcart = async (req, res, next) => {
  try {
    const { foodId, options, quantity } = req.body; 
    const userId = req.user;

    if (!foodId || !options || !quantity) {
      throw new ApiError(400, "All fields are required");
    }

    
    const user = await User.findById(userId).populate("cart.food");
    if (!user) throw new ApiError(404, "User not found");

    
    const food = await FoodItem.findById(foodId);
    if (!food) throw new ApiError(404, "Food item does not exist");
    
    console.log(food)
    
    const itemPrice = options === "half" ? food.options?.half : food.options?.full;
    
    if (typeof itemPrice !== "number") {
      throw new ApiError(400, "Invalid option or price not available");
    }

    
    const existingItemIndex = user.cart.findIndex(
      (item) => item.food._id.toString() === foodId && item.options === options
    );
     
    if (existingItemIndex > -1) {
      
       const existingItem = user.cart[existingItemIndex];
       existingItem.quantity += Number(quantity); 

       existingItem.totalPrice = itemPrice * existingItem.quantity;
    } else {
      // Add new item
      user.cart.push({
        food: foodId,
        quantity,
        options,
        totalPrice: itemPrice * quantity
      });
    }

    await user.save();

    res.status(200).json(user.cart);

  } catch (error) {
    next(error);
  }
};

export const getcart = async(req,res,next)=>{
  try {
      const userId = req.user._id;
     const cartitem = await User.findById(userId).populate({path:'cart.food',select:'name price image'}).select("-password")
     if(!cartitem){
      throw new ApiError(404,"user not found")
     }
     res.status(200).json({success:true,message:"Fetching the cart item successfully",data:cartitem})
  } catch (error) {
    next(error)
  }
}
