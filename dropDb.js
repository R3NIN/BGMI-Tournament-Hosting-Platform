// Script to drop the MongoDB database defined in your .env file
require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URL;

if (!uri) {
  console.error('MONGODB_URL not found in .env');
  process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await mongoose.connection.dropDatabase();
    console.log('Database dropped successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error dropping database:', err);
    process.exit(1);
  });
