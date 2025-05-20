require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db'); // Updated with .js extension
const todoRoutes = require('./src/routes/todoRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));