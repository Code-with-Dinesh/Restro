import mongoose from "mongoose";

const cartschema = mongoose.Schema({
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'FoodItem'
    },
    quantity:{
        type:Number,
        default:1
    },
    options:{
        type:String,
        enum: ["half", "full"], default: "full"
    }
})


export default cartschema;