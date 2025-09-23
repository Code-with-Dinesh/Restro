import user from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const newUser = await user.create({
      name,      
      email,
      password,   
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Error while registering user:", error);
    next(error); // pass error to global error handler
  }
};
