import { Paper, List, Typography } from '@mui/material';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos }) => {
  return (
    <Paper elevation={0}>
      <Typography style={{ padding: 10, fontSize: 20 }}>Items:</Typography>
      <List>
        {Array.isArray(todos) && todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;