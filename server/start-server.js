const { MongoClient } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// MongoDB connection string with direct connection to primary (using legacy format)
const MONGODB_URI = 'mongodb://nitinvvv9:Vishal%401234@ac-tdugfyu-shard-00-00.otompul.mongodb.net:27017,ac-tdugfyu-shard-00-01.otompul.mongodb.net:27017,ac-tdugfyu-shard-00-02.otompul.mongodb.net:27017/bgmi-tournaments?ssl=true&replicaSet=atlas-73f452-shard-0&authSource=admin&retryWrites=true&w=majority';

// Log the connection attempt (without credentials for security)
const safeMongoUri = MONGODB_URI.replace(/(mongodb[+]srv:\/\/[^:]+:)[^@]+/, '$1*****');
console.log(`🔌 Attempting to connect to MongoDB: ${safeMongoUri}`);

// MongoDB connection options with legacy settings
const options = {
  // Basic connection settings
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 30000,
  connectTimeoutMS: 10000,
  
  // Write concern
  w: 'majority',
  
  // Retry settings
  retryWrites: true,
  
  // Authentication
  authSource: 'admin',
  
  // Use legacy SSL settings
  ssl: true,
  sslValidate: false, // Only for testing with self-signed certs
  checkServerIdentity: () => { return undefined; }, // Skip hostname validation
  
  // Use legacy URL parser
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
  // Connection pool settings
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 10000
};

async function testConnection() {
  const client = new MongoClient(MONGODB_URI, options);
  
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');
    
    // Get the database
    const db = client.db('bgmi-tournaments');
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name).join(', '));
    
    // Try to find a user
    const users = db.collection('users');
    const userCount = await users.countDocuments();
    console.log(`👥 Found ${userCount} users in the database`);
    
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
  } finally {
    // Close the connection
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run the test
testConnection().catch(console.error);
