import ApiError from "../utils/ApiError.js";
import UserSchema from "../models/user.model.js";
import FoodSchema from "../models/fooditem.model.js";

export const addcart = async (req, res, next) => {
  try {
    const { foodId, option, quantity } = req.body; // request data
    const userId = req.user._id;

    // Validate input
    if (!foodId || !option || !quantity) {
      throw new ApiError(400, "All fields are required");
    }

    // Find user
    const user = await UserSchema.findById(userId).populate("cart.food");
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Find food item
    const food = await FoodSchema.findById(foodId);
    if (!food) {
      throw new ApiError(404, "Food item does not exist");
    }

    // Get price from options object
    const itemPrice = option === "half" ? food.options.half : food.options.full;

    // Check if the item already exists in cart with same option
    const existingItemIndex = user.cart.findIndex(
      (item) => item.food._id.toString() === foodId && item.option === option
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity & totalPrice
      user.cart[existingItemIndex].quantity += quantity;
      user.cart[existingItemIndex].totalPrice = itemPrice * user.cart[existingItemIndex].quantity;
    } else {
      // Add new item to cart
      user.cart.push({
        food: foodId,
        quantity,
        option,
        totalPrice: itemPrice * quantity
      });
    }

    // Save user document
    await user.save();

    // Send updated cart
    res.status(200).json(user.cart);

  } catch (error) {
    next(error);
  }
};
