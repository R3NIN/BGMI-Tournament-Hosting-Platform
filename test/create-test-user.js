const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../server/models/User');
require('dotenv').config();

async function createTestUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');

        // Test user data
        const testUserData = {
            userName: 'testuser',
            bgmi_id: '123456789',
            email: 'testuser@example.com',
            password: 'Test@123',
            accountType: 'User',
            active: true,
            approved: true
        };

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(testUserData.password, saltRounds);
        testUserData.password = hashedPassword;

        // Create test user
        const testUser = new User(testUserData);
        await testUser.save();

        console.log('Test user created successfully');
        console.log('User ID:', testUser._id);

        // Close connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating test user:', error);
        process.exit(1);
    }
}

createTestUser();
