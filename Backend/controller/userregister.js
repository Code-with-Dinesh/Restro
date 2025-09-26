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
        email: newUser.email,
        role:newUser.role
      }
    });

  } catch (error) {
    console.error("Error while registering user:", error);
    next(error); 
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const existencuser = await user.findOne({ email });
    if (!existencuser) throw new ApiError(400, "This email does not exist");

    const isPasswordValid = await existencuser.comparePassword(password);
    if (!isPasswordValid) throw new ApiError(400, "Invalid credentials");

    
    const accessToken = await existencuser.generateAccessToken();
    const refreshToken = await existencuser.generateRefreshToken();

   
    const accessTokenOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, 
    };

    const refreshTokenOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    };

    
    res
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, refreshTokenOptions)
      .status(200)
      .json({
        success: true,
        message: "You are successfully logged in",
        role:existencuser.role
      });

  } catch (err) {
    next(err);
  }
};


export const logout =  async(req,res,next)=>{
   try {
     const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  };
  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);

  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
   } catch (error) {
      
      next(error)
   }
}
