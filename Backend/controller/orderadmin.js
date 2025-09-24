import mongoose from "mongoose";
import orderModel from "../models/order.model.js";
import ApiError from "../utils/ApiError.js";

export const allorders = async(req,res,next)=>{
    try {
        const order = await orderModel.find().populate('user','name email').populate("item.food","name price")
         res.status(200).json({success:true,message:"Fetch order successfully",data:order})
    } catch (error) {
        next(error)
    }
}

export const updatorderstatus = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const {status} = req.body;
          console.log("Looking for order with ID:", id); // debug
        const validateStatus = ["pending", "confirmed", "delivered", "canceled"];
        if(!validateStatus.includes(status)){
            throw new ApiError(400,"Invalid status value")
        }
        
        const order = await orderModel.findById(id)
        console.log(order)
        if(!order){
            throw new ApiError(400,"Order not found")
        }
        order.status = status;
        await order.save()
        res.status(200).json({success:true,message:'Update order status successfully'})
    } catch (error) {
        next(error)
    }
}