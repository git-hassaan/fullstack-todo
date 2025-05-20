const Todo = require('../models/Todo');

// Get all todos (with filtering/pagination)
const getTodos = async (req, res, next) => {
    try {
        const { completed, limit = 10, page = 1 } = req.query;
        const query = {};

        if (completed) query.completed = completed === 'true';

        const todos = await Todo.find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (err) {
        next(err);
    }
};

// Create todo (with validation)
const createTodo = async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).json({
                success: false,
                error: "Title is required"
            });
        }

        const newTodo = await Todo.create({
            ...req.body,
            user: req.user.id // From auth middleware
        });

        res.status(201).json({
            success: true,
            data: newTodo
        });
    } catch (err) {
        next(err);
    }
};

// Update todo (with existence check)
const updateTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id // Ensure user owns the todo
            },
            req.body,
            { new: true, runValidators: true }
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                error: "Todo not found"
            });
        }

        res.json({
            success: true,
            data: todo
        });
    } catch (err) {
        next(err);
    }
};

// Delete todo (soft delete option)
const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id // Ownership check
        });

        if (!todo) {
            return res.status(404).json({
                success: false,
                error: "Todo not found"
            });
        }

        // For soft delete: await Todo.findByIdAndUpdate(req.params.id, { deleted: true });

        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };