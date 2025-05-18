const mongoose = require('mongoose');
require('dotenv').config();

async function checkUser() {
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Successfully connected to MongoDB');

    // Import the User model
    const User = require('./server/models/User');
    
    // Check if user exists
    const user = await User.findOne({ email: 'nitinvvv9@gmail.com' });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ User found:');
    console.log({
      userName: user.userName,
      email: user.email,
      accountType: user.accountType,
      approved: user.approved,
      active: user.active
    });
    
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
}

checkUser();
