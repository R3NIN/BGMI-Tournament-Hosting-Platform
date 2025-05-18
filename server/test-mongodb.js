const { MongoClient } = require('mongodb');

// Connection URI with credentials
const uri = 'mongodb+srv://nitinvvv9:Vishal%401234@cluster0.otompul.mongodb.net/bgmi-tournaments?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 10000,
  connectTimeoutMS: 5000,
  w: 'majority',
  retryWrites: true,
  authSource: 'admin',
  tls: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('✅ Connected successfully to MongoDB');
    
    // Get the database
    const db = client.db('bgmi-tournaments');
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('📊 Collections:', collections.map(c => c.name).join(', '));
    
    // Try to find a user
    const users = db.collection('users');
    const userCount = await users.countDocuments();
    console.log(`👥 Found ${userCount} users in the database`);
    
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run the test
run().catch(console.dir);
