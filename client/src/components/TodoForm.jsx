import { useState } from 'react';
import { Paper, TextField, Button } from '@mui/material';
import { createTodo } from '../services/api';

const TodoForm = ({ todos, setTodos }) => {
  const [todoData, setTodoData] = useState({ title: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(todoData)
      const { data } = await createTodo(todoData);
      setTodos([...todos, data]);
      setTodoData({ title: '', description: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper style={{ padding: '16px' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={todoData.title}
          onChange={(e) => setTodoData({ ...todoData, title: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          rows={4}
          style={{ marginTop: '16px' }}
          value={todoData.description}
          onChange={(e) => setTodoData({ ...todoData, description: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Add Todo
        </Button>
      </form>
    </Paper>
  );
};

export default TodoForm;