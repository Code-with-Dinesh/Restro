import mongoose from 'mongoose'

const paymentSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'order'
    },
    razorpay_orderId:{
        type:String,
        required:true
    },
    razorpay_paymentId:{
        type:String,
        
    },
    razorpay_signature: {
    type: String,
  },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["paid","created","failed"],
        default:"created"
    },
    createdAt: {
    type: Date,
    default: Date.now,
  },
})

const payment = mongoose.model('payment',paymentSchema)
export default payment;