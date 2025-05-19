const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);

mongoose.connect('mongodb://localhost:27017/todoDB')
    .then(() => {
        console.log('MongoDB connected');
        app.listen(3001, () => console.log('Server running on port 3001'));
    })
    .catch(err => console.error(err));
