const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Base URL for the API
const BASE_URL = 'http://localhost:4003';

async function testLogin() {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/login`, {
            email: 'testuser@example.com',
            password: 'Test@123'
        });
        
        console.log('Login Test:', response.data);
        return response.data.token;
    } catch (error) {
        console.error('Login Test Failed:', error.response?.data || error.message);
        return null;
    }
}

async function testSignup() {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/signup`, {
            userName: 'newtestuser',
            bgmi_id: '987654321',
            email: 'newtestuser@example.com',
            password: 'Test@123',
            confirmPassword: 'Test@123',
            accountType: 'User'
        });
        
        console.log('Signup Test:', response.data);
    } catch (error) {
        console.error('Signup Test Failed:', error.response?.data || error.message);
    }
}

async function testOTP() {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/sendotp`, {
            email: 'testuser@example.com'
        });
        
        console.log('OTP Test:', response.data);
    } catch (error) {
        console.error('OTP Test Failed:', error.response?.data || error.message);
    }
}

async function runTests() {
    console.log('Starting API Tests...');
    
    await testSignup();
    await testLogin();
    await testOTP();
}

runTests();
