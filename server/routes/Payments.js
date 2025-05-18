// Import the required modules
const express = require("express")
const router = express.Router()
const {
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/payments")
const { auth, isUser } = require("../middleware/auth")

router.post("/verifyPayment", auth, isUser, verifyPayment)
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isUser,
  sendPaymentSuccessEmail
)
// router.post("/verifySignature", verifySignature)

module.exports = router