// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
// Configuring dotenv to load environment variables from .env file
dotenv.config();


// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
  console.log('Auth middleware called:', req.originalUrl);
  console.log('Request headers:', req.headers);
  console.log('Request cookies:', req.cookies);
  
  try {
    // Extracting JWT from request cookies, body or header
    const token = req.cookies?.token ||
                req.body?.token ||
                (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''));

    console.log('Extracted token:', token ? 'Token exists' : 'No token found');

    // If JWT is missing, return 401 Unauthorized response
    if (!token) {
      console.log('No token found in request');
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication token is missing',
        error: 'MISSING_TOKEN'
      });
    }

    try {
      // Verifying the JWT using the secret key stored in environment variables
      console.log('Verifying JWT token...');
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decode);
      
      // Store the decoded JWT payload in the request object for further use
      req.user = decode;
      
      // Verify the user exists in the database
      const user = await User.findById(decode.id).select('-password');
      if (!user) {
        console.log('User not found in database');
        return res.status(401).json({
          success: false,
          message: 'User not found',
          error: 'USER_NOT_FOUND'
        });
      }
      
      // Add user to request object
      req.user = user.toObject();
      console.log('User authenticated:', { id: user._id, email: user.email, role: user.accountType });
      
      // If JWT is valid, move on to the next middleware or request handler
      return next();
      
    } catch (error) {
      console.error('JWT verification error:', error);
      
      // Handle different JWT errors
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Session expired. Please log in again.',
          error: 'TOKEN_EXPIRED'
        });
      }
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token',
          error: 'INVALID_TOKEN'
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
        error: 'AUTH_FAILED'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
exports.isUser = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "User") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for users",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isAdmin = async (req, res, next) => {
  // Allow access without authentication
  next();
};
exports.isTeam = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Team") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Team",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};