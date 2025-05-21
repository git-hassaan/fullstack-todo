const express = require('express');
const cors = require('cors');
const todoRoutes = require('./src/routes/todoRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes); // This mounts your todo routes

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));