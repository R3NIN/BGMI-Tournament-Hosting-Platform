const { connect, isConnected, getDb } = require('./server/config/database');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing database connection...');
  
  try {
    // Try to connect to the database
    await connect();
    const db = getDb();
    
    if (db && isConnected()) {
      console.log('✅ Successfully connected to MongoDB!');
      
      // Test a simple query
      const collections = await db.listCollections().toArray();
      console.log('📋 Available collections:');
      collections.forEach(collection => console.log(`- ${collection.name}`));
      
      // Check if users collection exists
      const usersExist = collections.some(c => c.name === 'users');
      console.log(usersExist ? '👤 Users collection exists' : '⚠️ Users collection not found');
      
      // Get server status
      const status = await db.command({ serverStatus: 1 });
      console.log(`\n🖥️  MongoDB Server Info:`);
      console.log(`- Version: ${status.version}`);
      console.log(`- Host: ${status.host}`);
      console.log(`- Uptime: ${Math.floor(status.uptime / 60)} minutes`);
    } else {
      console.error('❌ Failed to connect to MongoDB');
    }
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    if (error.message.includes('bad auth')) {
      console.error('🔑 Authentication failed. Please check your database credentials.');
    } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
      console.error('🌐 Network error. Please check your internet connection and MongoDB host.');
    } else if (error.message.includes('MongoNetworkError')) {
      console.error('🔌 Network error. Please check if MongoDB is running and accessible.');
    }
  } finally {
    // Close the connection
    process.exit(0);
  }
}

testConnection();
