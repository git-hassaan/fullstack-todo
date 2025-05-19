const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
};

const createTodo = async (req, res) => {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
};

const updateTodo = async (req, res) => {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

const deleteTodo = async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).end();
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
