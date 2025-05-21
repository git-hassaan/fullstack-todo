import axios from 'axios';

// For development using proxy
const baseURL = '/api/todos';


const API = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to log requests
API.interceptors.request.use(config => {
    console.log('Request:', config.url);
    return config;
});

// Add response interceptor to log errors
API.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.status, error.message);
        return Promise.reject(error);
    }
);

export const fetchTodos = () => API.get('/');
export const createTodo = (newTodo) => API.post('/', newTodo);
export const updateTodo = (id, updatedTodo) => API.patch(`/${id}`, updatedTodo);
export const deleteTodo = (id) => API.delete(`/${id}`);