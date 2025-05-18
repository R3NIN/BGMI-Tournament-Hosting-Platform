const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URI with retryWrites enabled
const uri = 'mongodb+srv://nitin:ronin03@cluster0.mju5kao.mongodb.net/bgmi-tournaments?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout
  socketTimeoutMS: 45000, // 45 seconds socket timeout
  connectTimeoutMS: 10000, // 10 seconds connection timeout
  ssl: true,
  tlsAllowInvalidCertificates: false,
  retryWrites: true,
  w: 'majority'
});

async function run() {
  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("bgmi-tournaments").command({ ping: 1 });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Get list of collections in the database
    const collections = await client.db("bgmi-tournaments").listCollections().toArray();
    console.log('📊 Available collections in bgmi-tournaments:');
    collections.forEach(collection => console.log(`- ${collection.name}`));
    
    // Get document count in users collection
    try {
      const userCount = await client.db("bgmi-tournaments").collection("users").countDocuments();
      console.log(`\n👥 Total users: ${userCount}`);
    } catch (error) {
      console.log('\nℹ️ Could not get user count (users collection might not exist)');
    }
    
  } catch (error) {
    console.error('❌ Error connecting to MongoDB Atlas:', error.message);
    
    if (error.message.includes('getaddrinfo ENOTFOUND')) {
      console.error('\n🔧 DNS Resolution Failed:');
      console.error('1. Check your internet connection');
      console.error('2. Try using a different network (e.g., mobile hotspot)');
      console.error('3. Contact your network administrator if on a corporate network');
      console.error('4. Check MongoDB Atlas status: https://status.cloud.mongodb.com/');
    } else if (error.message.includes('bad auth')) {
      console.error('\n🔑 Authentication Failed:');
      console.error('1. Check your MongoDB Atlas username and password');
      console.error('2. Verify the database name in the connection string');
      console.error('3. Check if your IP is whitelisted in MongoDB Atlas');
    } else if (error.message.includes('self-signed certificate')) {
      console.error('\n🔒 SSL Certificate Error:');
      console.error('1. Make sure your system time is correct');
      console.error('2. Try adding `tlsAllowInvalidCertificates: true` to the MongoClient options');
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// Run the function
run().catch(console.dir);
