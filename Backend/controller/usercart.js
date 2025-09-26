import ApiError from "../utils/ApiError.js";
import UserSchema from "../models/user.model.js";
import FoodSchema from "../models/fooditem.model.js";

export const addcart = async (req, res, next) => {
  try {
    const { foodId, option, quantity } = req.body; 
    const userId = req.user._id;

    if (!foodId || !option || !quantity) {
      throw new ApiError(400, "All fields are required");
    }

    
    const user = await UserSchema.findById(userId).populate("cart.food");
    if (!user) {
      throw new ApiError(404, "User not found");
    }

   
    const food = await FoodSchema.findById(foodId);
    if (!food) {
      throw new ApiError(404, "Food item does not exist");
    }

    
    const itemPrice = option === "half" ? food.halfPrice : food.fullPrice;

   
    const existingItemIndex = user.cart.findIndex(
      (item) => item.food._id.toString() === foodId && item.option === option
    );

    if (existingItemIndex > -1) {
      user.cart[existingItemIndex].quantity += quantity;
      user.cart[existingItemIndex].totalPrice = itemPrice * user.cart[existingItemIndex].quantity;
    } else {
      user.cart.push({
        food: foodId,
        quantity,
        option,
        totalPrice: itemPrice * quantity, // store total for new item
      });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    next(error);
  }
};
