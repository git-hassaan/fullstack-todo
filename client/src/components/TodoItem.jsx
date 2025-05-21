import { ListItem, ListItemText, IconButton, Checkbox, ListItemSecondaryAction } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteTodo, updateTodo } from '../services/api';

const TodoItem = ({ todo, todos, setTodos }) => {
  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id);
      setTodos(todos.filter((item) => item._id !== todo._id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async () => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      const { data } = await updateTodo(todo._id, updatedTodo);
      setTodos(todos.map((item) => (item._id === todo._id ? data : item)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ListItem>
      <Checkbox checked={todo.completed} onChange={handleToggle} />
      <ListItemText 
        primary={todo.title} 
        secondary={todo.description} 
        style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit">
          <Edit />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;