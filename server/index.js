// Importing necessary modules and packages
const express = require("express");
const path = require('path');
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/Profile");
const registrationRoutes = require("./routes/Registration");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const adminTournamentsRoute = require("./routes/AdminTournaments");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Loading environment variables from .env file
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3002'
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false); // Allow requests without credentials
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};

// Apply CORS middleware
app.use(cors(corsOptions));

// File upload middleware
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  abortOnLimit: true,
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors
    });
  }

  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    return res.status(502).json({
      success: false,
      message: 'Network Error: Unable to connect to the server'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', req.headers);
  console.log('Cookies:', req.cookies);
  next();
});

// Database connection
const startServer = async () => {
  try {
    console.log('🌐 Attempting to connect to MongoDB...');
    
    // Connect to MongoDB with retry logic
    const maxRetries = 3;
    let retryCount = 0;
    let db;
    
    while (retryCount < maxRetries) {
      try {
        db = await database.connect();
        console.log('✅ Database connection established successfully');
        break;
      } catch (dbError) {
        retryCount++;
        console.error(`❌ Database connection attempt ${retryCount} failed:`, dbError.message);
        
        if (retryCount === maxRetries) {
          console.error('❌ Max retry attempts reached. Please check your MongoDB connection and try again.');
          throw dbError;
        }
        
        // Wait for 2 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(`🔄 Retrying database connection (${retryCount + 1}/${maxRetries})...`);
      }
    }
    
    // Cloudinary connection
    try {
      console.log('☁️  Connecting to Cloudinary...');
      cloudinaryConnect();
      console.log('✅ Cloudinary connected successfully');
    } catch (cloudinaryError) {
      console.error('⚠️  Cloudinary connection warning:', cloudinaryError.message);
      console.log('⚠️  Continuing without Cloudinary...');
    }
    
    // Routes
    app.use("/api/v1/auth", userRoutes);
    app.use("/api/v1/profile", profileRoutes);
    app.use("/api/v1/course", registrationRoutes);
    app.use("/api/v1/payment", paymentRoutes);
    app.use("/api/v1/contact", contactUsRoute);
    // Remove auth middleware from admin routes
    app.use("/api/v1/admin/tournaments", adminTournamentsRoute);
    
    // Default route
    app.get("/", (req, res) => {
      return res.json({
        success: true,
        message: 'Your server is up and running...',
        database: db.databaseName,
      });
    });
    
    // Serve React app for all non-API GET routes (SPA fallback)
    app.get(/^\/((?!api\/).)*$/, (req, res) => {
      res.sendFile(path.join(__dirname, "../public", "index.html"));
    });

    // Catch-all 404 handler for unknown API routes
    app.use((req, res, next) => {
      res.status(404).json({ success: false, message: "API endpoint not found" });
    });

    // Start the server on the specified PORT from environment variable
    const PORT = process.env.PORT || 4003;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API Base URL: http://localhost:${PORT}/api/v1`);
    });
    
    // Handle server errors
    app.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();