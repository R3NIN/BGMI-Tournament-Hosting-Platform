const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", async () => {
    console.log("Connected to MongoDB");
    
    try {
        // Drop the Tournament collection
        await mongoose.connection.db.dropCollection("tournaments");
        console.log("Tournament collection dropped successfully");
    } catch (error) {
        console.error("Error dropping collection:", error);
    }

    // Close the connection
    mongoose.connection.close();
});
