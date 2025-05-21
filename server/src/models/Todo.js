const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }
}, { timestamps: true });

// Create and export the Todo model
const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;