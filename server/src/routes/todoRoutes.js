const express = require('express');
const router = express.Router();
const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController');

// Routes
router.route('/')
    .get(getTodos)          // GET /api/todos
    .post(createTodo);      // POST /api/todos

router.route('/:id')
    .put(updateTodo)        // PUT /api/todos/:id
    .delete(deleteTodo);    // DELETE /api/todos/:id

module.exports = router;