const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require('../mail/templates/passwordUpdate');
const Profile = require('../models/Profile');
const Wallet = require('../models/Wallet');
require('dotenv').config();

// Signup Controller for Registering USers

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password requirements: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;

exports.signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const {
      userName,
      bgmi_id,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
    } = req.body;

    // Check if All Required Details are provided
    const requiredFields = [
      { field: userName, name: 'Username' },
      { field: bgmi_id, name: 'BGMI ID' },
      { field: email, name: 'Email' },
      { field: password, name: 'Password' },
      { field: confirmPassword, name: 'Confirm Password' },
      { field: accountType, name: 'Account Type' }
    ];

    const missingFields = requiredFields
      .filter(field => !field.field)
      .map(field => field.name);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `The following fields are required: ${missingFields.join(', ')}`,
      });
    }


    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address',
      });
    }

    // Validate password strength
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
      });
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      })
    }

    // Check if user with same email or BGMI ID already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email },
        { bgmi_id }
      ]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists. Please sign in instead.',
        });
      }
      if (existingUser.bgmi_id === bgmi_id) {
        return res.status(400).json({
          success: false,
          message: 'This BGMI ID is already registered. Please use a different BGMI ID.',
        });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user
    const approved = accountType === 'Team' ? false : true;

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create the Additional Profile For User
      const profileDetails = await Profile.create([{
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: contactNumber || null,
      }], { session });

      const user = await User.create([{
        userName,
        bgmi_id,
        email,
        contactNumber: contactNumber || null,
        password: hashedPassword,
        accountType,
        approved,
        additionalDetails: profileDetails[0]._id,
        wallet: 0,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(userName)}`,
      }], { session });

      // Create a wallet for the user
      await Wallet.create([{
        user: user[0]._id,
        balance: 0,
        transactions: []
      }], { session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Generate JWT token
      const token = jwt.sign(
        { email: user[0].email, id: user[0]._id, accountType: user[0].accountType },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      // Return success response
      const userResponse = user[0].toObject();
      delete userResponse.password;

      return res.status(201).json({
        success: true,
        data: {
          user: userResponse,
          token
        },
        message: 'User registered successfully',
      });
    } catch (error) {
      // If any error occurs, abort the transaction
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Signup Error:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const message = field === 'email' 
        ? 'This email is already registered.' 
        : field === 'bgmi_id' 
          ? 'This BGMI ID is already in use.' 
          : 'This value is already in use.';
      
      return res.status(409).json({
        success: false,
        message,
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages,
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: 'An error occurred during registration. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}

// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    console.log('Login request received:', { email: req.body.email });
    
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      console.log('Missing credentials:', { email: !!email, password: '***' });
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // Find user with provided email and populate additional details
    console.log('Looking up user with email:', email);
    const user = await User.findOne({ email })
      .populate('additionalDetails')
      .select('+password'); // Explicitly select password field

    // If user not found with provided email
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password', // Generic message for security
      });
    }
    
    console.log('User found:', { 
      id: user._id, 
      accountType: user.accountType,
      approved: user.approved 
    });

    // Check if user is approved (if account type is Team)
    if (user.accountType === 'Team' && !user.approved) {
      return res.status(403).json({
        success: false,
        message: 'Your account is pending approval. Please contact support.',
      });
    }

    // Compare provided password with hashed password
    console.log('Comparing passwords...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', user._id);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password', // Generic message for security
      });
    }
    console.log('Password is valid');

    // Generate JWT token with user details
    console.log('Generating JWT token...');
    const token = jwt.sign(
      { 
        email: user.email,  // Required for isAdmin middleware
        id: user._id, 
        accountType: user.accountType,
        approved: user.approved,
        role: user.accountType // Add role for backward compatibility
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    );
    console.log('JWT token generated');

    // Update user's last login time
    console.log('Updating last login time...');
    user.lastLogin = new Date();
    try {
      await user.save();
      console.log('Last login time updated');
    } catch (saveError) {
      console.error('Error updating last login time:', saveError);
      // Continue with login even if this fails
    }

    // Create user response object without sensitive data
    console.log('Preparing user response...');
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.token;
    console.log('User response prepared');

    // Set cookie with secure flags
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    };

    // Set cookie and send response
    res.cookie('token', token, cookieOptions).status(200).json({
      success: true,
      data: {
        token,
        user: userResponse
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login Error:', error);
    
    // Handle specific errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message,
      });
    }

    // Handle JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(500).json({
        success: false,
        message: 'Error generating authentication token',
      });
    }

    // Default error response
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
// Import sendVerificationEmail from OTP model
const { sendVerificationEmail } = require("../models/OTP");
// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);

    // Send OTP email
    try {
      await sendVerificationEmail(email, otp);
    } catch (emailError) {
      console.log("Error sending OTP email:", emailError);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email",
        error: emailError.message,
      });
    }

    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}


// Controller for Changing Password
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.userName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}