import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, AppBar, Box, Grow, Paper, Typography } from '@mui/material';
import { fetchTodos } from './services/api';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import About from './pages/About';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data } = await fetchTodos();
        console.log("getTodos data: ", data)
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTodos();
  }, []);

  return (
    <Router>
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        {/* Header */}
        <Box sx={{
          width: '100%',
          py: 2,
          textAlign: 'center',
          backgroundColor: 'primary.main',
          color: 'white'
        }}>
          <Typography variant="h4" fontWeight="bold">
            TODO APP
          </Typography>
        </Box>

        {/* Main Content - Stretchable Container */}
        <Container maxWidth={false} sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          px: 2,
          width: '100%',
          maxWidth: '1200px'
        }}>
          <Grow in>
            <Paper elevation={3} sx={{
              width: '100%',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 4,
              gap: 4,
              minHeight: '400px'
            }}>
              <Routes>
                <Route path="/" element={
                  <>
                    <TodoForm todos={todos} setTodos={setTodos} />
                    <TodoList todos={todos} setTodos={setTodos} />
                  </>
                } />
                <Route path="/about" element={<About />} />
              </Routes>
            </Paper>
          </Grow>
        </Container>
      </Box>
    </Router>
  );
}

export default App;