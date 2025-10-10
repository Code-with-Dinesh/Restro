import Razorpay from "razorpay";
import ApiError from "../utils/ApiError.js";
import paymentmodel from "../models/payment.model.js";
import crypto from "crypto";
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECREAT,
});

export const createorder = async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const userId = req.user;
    if (!amount || !orderId) {
      throw new ApiError(400, "Amount and orderId is Required");
    }
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${orderId}`,
    };
    const order = await razorpayInstance.orders.create(options);
    const payment = await paymentmodel.create({
      userId,
      orderId,
      razorpay_orderId: order.id,
      amount,
      status: "created",
    });
    res.status(201).json({
      success: true,
      message: "Order Created successfully",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment._id,
      key: process.env.RAZORPAY_ID,
    });
  } catch (error) {
    console.log(`Error while create the order ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifypayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentId,
    } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required Razorpay fields" });
    }
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("this is my body", body);
    const expectedSignature = crypto
      .createHmac("sha256", process.env.process.env.RAZORPAY_SECREAT)
      .update(body.toString())
      .digest("hex");
    console.log("this is your exprected sinature", expectedSignature);
    if (expectedSignature === razorpay_signature) {
      const paymentverify = await paymentmodel.findByIdAndUpdate(paymentId, {
        razorpay_payment_id,
        razorpay_signature,
        status: "paid",
      });
      console.log("paymentmodel", paymentverify);
      return res
        .status(200)
        .json({ success: true, message: "Pyment verify successfully" });
    } else {
      await paymentmodel.findByIdAndUpdate(paymentId, {
        status: "failed",
      });
      return res
        .status(500)
        .json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log("Error while verify the order ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
