const mongoose = require('mongoose');
require('dotenv').config();

async function checkConnection() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('Using connection string:', process.env.MONGODB_URL);
    
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Successfully connected to MongoDB');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Available collections:', collections.map(c => c.name));
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}

checkConnection();
