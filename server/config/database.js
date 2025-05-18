const { MongoClient } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Use the connection string from environment variables or default to a standard connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://nitin:ronin03@bgmi.z3n2h6d.mongodb.net/?retryWrites=true&w=majority&appName=bgmi';
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URL or MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Parse the connection string to extract the database name
const getDbName = (uri) => {
  try {
    const url = new URL(uri);
    const dbName = url.pathname.replace(/^\/+/, '');
    if (!dbName) {
      console.warn('⚠️  No database name specified in connection string, using default: bgmi-tournaments');
      return 'bgmi-tournaments';
    }
    return dbName;
  } catch (e) {
    console.warn('⚠️  Could not parse MongoDB URI, using default database name: bgmi-tournaments');
    return 'bgmi-tournaments';
  }
};

const dbName = getDbName(MONGODB_URI);

// Log the connection attempt (without credentials for security)
const safeMongoUri = MONGODB_URI.replace(/(mongodb\+srv:\/\/[^:]+:)[^@]+/, '$1*****');
console.log(`🔌 Attempting to connect to MongoDB: ${safeMongoUri}`);
console.log(`💾 Using database: ${dbName}`);

// MongoDB connection options
const options = {
  // Connection settings
  serverSelectionTimeoutMS: 30000, // Increased timeout for server selection
  socketTimeoutMS: 60000, // Increased socket timeout
  connectTimeoutMS: 30000, // Increased connection timeout
  maxPoolSize: 10, // Maximum number of connections in the pool
  minPoolSize: 1, // Minimum number of connections in the pool
  maxIdleTimeMS: 10000, // How long a connection can be idle before being removed
  
  // Write concern
  w: 'majority',
  wtimeoutMS: 5000, // Increased write concern timeout
  
  // Retry settings
  retryWrites: true,
  retryReads: true,
  
  // TLS/SSL settings
  tls: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true,
  
  // Authentication
  authSource: 'admin',
  
  // Monitoring
  heartbeatFrequencyMS: 10000,
  monitorCommands: true,
  
  // Direct connection
  directConnection: false
};

// Create a new MongoClient with enhanced error handling
let client;
try {
  console.log('🌐 Creating MongoDB client with options:', JSON.stringify({
    ...options,
    // Don't log sensitive info
    authSource: options.authSource,
    tls: options.tls,
    tlsAllowInvalidCertificates: options.tlsAllowInvalidCertificates,
    tlsAllowInvalidHostnames: options.tlsAllowInvalidHostnames
  }, null, 2));
  
  client = new MongoClient(MONGODB_URI, options);
  
  // Add error listeners
  client.on('serverOpening', (event) => {
    console.log('MongoDB server opening:', event);
  });
  
  client.on('serverClosed', (event) => {
    console.log('MongoDB server closed:', event);
  });
  
  client.on('serverHeartbeatFailed', (event) => {
    console.error('MongoDB server heartbeat failed:', event);
  });
  
} catch (error) {
  console.error('❌ Failed to create MongoDB client:', error);
  process.exit(1);
}

// Database connection state
let isConnected = false;
let db = null;

/**
 * Connect to the MongoDB database with retry logic
 * @returns {Promise<Object>} Database instance
 */
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

const connectDB = async (retryCount = 0) => {
  if (isConnected && db) {
    console.log('✅ Using existing database connection');
    return db;
  }

  try {
    console.log(`🌐 Attempting to connect to MongoDB (Attempt ${retryCount + 1}/${MAX_RETRIES})...`);
    console.log(`🔌 Connecting to database: ${dbName}`);
    
    // Connect to MongoDB
    await client.connect();
    
    // Get the specified database
    db = client.db(dbName);
    
    // Verify the connection by running a simple command
    await db.command({ ping: 1 });
    
    // Set connection state
    isConnected = true;
    
    console.log('✅ Database connection established successfully');
    
    // Set up event listeners
    client.on('serverOpening', () => {
      console.log('🔄 MongoDB server reconnected');
      isConnected = true;
    });
    
    client.on('serverClosed', () => {
      console.warn('⚠️  MongoDB server closed');
      isConnected = false;
    });
    
    client.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      isConnected = false;
    });
    
    // Log available collections
    try {
      const collections = await db.listCollections().toArray();
      console.log(`📊 Available collections: ${collections.map(c => c.name).join(', ')}`);
    } catch (collectionError) {
      console.warn('⚠️ Could not list collections:', collectionError.message);
    }
    
    return db;
  } catch (error) {
    console.error(`❌ Failed to connect to MongoDB (Attempt ${retryCount + 1}/${MAX_RETRIES}):`, error.message);
    
    // Close the connection if it was partially opened
    if (client) {
      await client.close().catch(console.error);
    }
    
    isConnected = false;
    db = null;
    
    // Retry logic
    if (retryCount < MAX_RETRIES - 1) {
      console.log(`⏳ Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return connectDB(retryCount + 1);
    }
    
    // Final error after all retries
    console.error('❌ All connection attempts failed');
    console.error('Connection string:', safeMongoUri);
    
    if (error.code === 'ETIMEDOUT') {
      console.error('Error: Connection timed out. Please check your internet connection and try again.');
    } else if (error.code === 'ENOTFOUND') {
      console.error('Error: Could not resolve the hostname. Please check your MongoDB connection string.');
    } else if (error.code === 'MONGODB_ERROR') {
      console.error('Error: MongoDB server error. Please check your MongoDB server logs.');
    } else {
      console.error('Error details:', error);
    }
    
    throw new Error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts: ${error.message}`);
  }
};

// Handle application termination
const cleanup = async () => {
  if (client) {
    try {
      await client.close();
      console.log('✅ MongoDB connection closed gracefully');
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
    } finally {
      process.exit(0);
    }
  }
};

// Handle different types of process termination
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

// Export the database connection function and the client
module.exports = {
  connect: connectDB,
  getClient: () => client,
  getDb: () => db,
  isConnected: () => isConnected,
  close: cleanup,
};