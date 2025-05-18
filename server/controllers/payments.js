const { instance } = require("../config/razorpay")
const crypto = require("crypto")
const User = require("../models/User")
const Payment = require("../models/Payment")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
require("dotenv").config()

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")

    if (razorpay_signature === expectedSignature) {
      // Update the payment status in the database
      const payment = await Payment.findOne({
        orderId: razorpay_order_id,
      })

      if (!payment) {
        return res.status(404).json({
          success: false,
          message: "Payment not found",
        })
      }

      // Update the payment status to success
      await Payment.findByIdAndUpdate(payment._id, {
        status: "success",
        paymentId: razorpay_payment_id,
      })

      // Get the user details
      const user = await User.findById(payment.userId)

      // Send payment success email
      await mailSender(
        user.email,
        "Payment Successful",
        paymentSuccessEmail(
          user.userName,
          "Payment",
          payment.amount
        )
      )

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { userId, amount, orderId, paymentId } = req.body

    if (!userId || !amount || !orderId || !paymentId) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment details",
      })
    }

    try {
      const paymentUser = await User.findById(userId)

      await mailSender(
        paymentUser.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${paymentUser.userName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )

      return res.status(200).json({
        success: true,
        message: "Payment success email sent successfully",
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
