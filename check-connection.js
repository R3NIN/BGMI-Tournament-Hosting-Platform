const mongoose = require('mongoose');
require('dotenv').config();

async function checkConnection() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('Using connection string:', process.env.MONGODB_URL);
    
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    
    console.log('✅ Successfully connected to MongoDB');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Available collections:', collections.map(c => c.name));
    
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
    return true;
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    return false;
  }
}

// Run the check
checkConnection().then(success => {
  process.exit(success ? 0 : 1);
});
