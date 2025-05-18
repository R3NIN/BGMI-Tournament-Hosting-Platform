require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

// Load environment variables
const MONGODB_URI = process.env.MONGODB_URL;
if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URL is not defined in .env file');
  process.exit(1);
}

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

async function checkAndCreateAdmin() {
  let client;
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    
    // Create a new MongoClient
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 30000, // 30 seconds socket timeout
    });
    
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');
    
    const db = client.db();
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('📚 Collections in database:', collections.map(c => c.name));
    
    // Check if users collection exists
    const usersCollection = db.collection('users');
    
    // Check if admin exists
    console.log('🔍 Checking for existing admin user...');
    const existingAdmin = await usersCollection.findOne({ email: ADMIN_EMAIL });

    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists:');
      console.log({
        _id: existingAdmin._id,
        email: existingAdmin.email,
        accountType: existingAdmin.accountType,
        approved: existingAdmin.approved,
        createdAt: existingAdmin.createdAt,
      });
      return;
    }

    console.log('🆕 No admin user found. Creating new admin...');
    
    // Create a new admin user
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    
    // Start a session for transactions
    const session = client.startSession();
    session.startTransaction();
    
    try {
      console.log('👤 Creating admin profile...');
      // Create profile first
      const profilesCollection = db.collection('profiles');
      const profileResult = await profilesCollection.insertOne({
        firstName: 'Admin',
        lastName: 'User',
        dateOfBirth: new Date('1990-01-01'),
        about: 'System Administrator',
        contactNumber: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, { session });
      
      const profileId = profileResult.insertedId;
      
      console.log('👑 Creating admin user...');
      const now = new Date();
      const adminUser = {
        userName: 'admin',
        bgmi_id: 'ADMIN123',
        email: ADMIN_EMAIL,
        password: hashedPassword,
        accountType: 'Admin',
        approved: true,
        active: true,
        additionalDetails: profileId,
        createdAt: now,
        updatedAt: now,
      };
      
      await usersCollection.insertOne(adminUser, { session });
      
      // Commit the transaction
      await session.commitTransaction();
      
      console.log('✅ Admin user created successfully!');
      console.log({
        email: ADMIN_EMAIL,
        accountType: 'Admin',
        approved: true,
      });
      console.log('🔑 Login with:');
      console.log(`📧 Email: ${ADMIN_EMAIL}`);
      console.log(`🔑 Password: ${ADMIN_PASSWORD}`);
      
    } catch (error) {
      // If an error occurred, abort the transaction
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.name === 'MongoServerError') {
      console.error('MongoDB Server Error:', error);
    } else {
      console.error('Stack Trace:', error.stack);
    }
  } finally {
    // Close the connection if it was established
    if (client) {
      await client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }
}

// Run the function
checkAndCreateAdmin();
