const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = "mongodb://localhost:27018/todoapp"; // Directly using your Docker MongoDB port

    try {
        await mongoose.connect(uri, {
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true,
            },
        });
        console.log('MongoDB Atlas connected via Mongoose');
    } catch (err) {
        console.error('Connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;