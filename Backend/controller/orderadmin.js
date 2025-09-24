import mongoose from "mongoose";
import user from "../models/user.model.js";
import orderModel from "../models/order.model.js";

export const allorders = async(req,res,next)=>{
    try {
        const order = await orderModel.find().populate('user','name email').populate("item.food","name price")
         res.status(200).json({success:true,message:"Fetch order successfully",data:order})
    } catch (error) {
        next(error)
    }
}