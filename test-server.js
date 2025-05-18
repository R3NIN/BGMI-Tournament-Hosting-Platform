const axios = require('axios');
require('dotenv').config();

async function testServer() {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:4001/api/v1';
  
  console.log(`🌐 Testing server connection to: ${baseUrl}`);
  
  try {
    // Test a simple health check or status endpoint
    const response = await axios.get(`${baseUrl}/auth/health`, {
      timeout: 5000 // 5 second timeout
    });
    
    console.log('✅ Server is running and responding');
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Error connecting to server:');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('No response received from server');
      console.log('Error message:', error.message);
    } else {
      // Something happened in setting up the request
      console.log('Error:', error.message);
    }
    return false;
  }
}

// Run the test
testServer().then(success => {
  process.exit(success ? 0 : 1);
});
