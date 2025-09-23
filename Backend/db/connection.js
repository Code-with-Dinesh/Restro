import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected successfully");
    
  
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

  } catch (error) {
    console.error("Error in MongoDB connection:", error.message);
    process.exit(1);
  }
};

export default connectDb;
