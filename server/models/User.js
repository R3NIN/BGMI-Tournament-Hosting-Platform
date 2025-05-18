// Import the Mongoose library
const mongoose = require("mongoose")

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    bgmi_id: {
        type: String,
        required: true,
        trim: true
    },
    paymentId: {
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ["Admin", "User", "Team"],
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    approved: {
        type: Boolean,
        default: true
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    registrations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registration"
    }],

    wallet: {
        type: Number
    },
    token: {
        type: String
    },
    resetPasswordExpires: {
      type: Date,
    },

    image: {
      type: String,
    },

    // Add timestamps for when the document is created and last modified
  },
  { timestamps: true }
)

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("User", userSchema)