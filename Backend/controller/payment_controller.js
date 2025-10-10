import Razorpay from 'razorpay'
import ApiError from '../utils/ApiError.js'
import paymentmodel from '../models/payment.model.js'
const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_ID,
    key_secret:process.env.RAZORPAY_SECREAT
})

export const createorder = async(req,res)=>{
    try {
        const {amount,orderId} = req.body;
        console.log('amount and orderId is ',amount,orderId)
        const userId = req.user;
        if(!amount || !orderId){
            throw new ApiError(400,'Amount and orderId is Required')
        }
        const options = {
            amount:amount*100,
            currency:"INR",
            receipt: `receipt_${orderId}`
        }
        const order  = await razorpayInstance.orders.create(options)
        console.log("orderdetails",order)
        const payment = await paymentmodel.create({
            userId,
            orderId,
            razorpay_orderId: order.id,
            amount,
            status:'created'
        })
        console.log("payment model ",payment)
        res.status(201).json({success:true,message:"Order Created successfully",
            orderId:order.id,
            amount:order.amount,
            currency: order.currency,
            paymentId: payment._id
        })
    } catch (error) {
        console.log(`Error while create the order ${error.message}`)
         res.status(500).json({ success: false, message: error.message });
    }
}