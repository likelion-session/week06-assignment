import { useState } from 'react';
import api from '../api/axios';

function useTodos() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchTodos = async () => {
    setLoading(true);
    setError(null);

    try {
        const res = await api.get('/todos');
        setTodos(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
        setError('목록을 불러오지 못했습니다.');
        } finally {
        setLoading(false);
        }
    };

const createTodo = async (title, description = '') => {
    setLoading(true);
    setError(null);

    try {
        await api.post('/todos', { title, description });
        await fetchTodos();
    } catch (e) {
        setError('추가에 실패했습니다.');
    } finally {
        setLoading(false);
    }
};

const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);

    try {
        await api.delete(`/todos/${id}`);
        await fetchTodos();
    } catch (e) {
        setError('삭제에 실패했습니다.');
    } finally {
        setLoading(false);
    }
};

const toggleTodo = async (id) => {
    setLoading(true);
    setError(null);

    try {
        await api.patch(`/todos/${id}/toggle`);
        await fetchTodos();
    } catch (e) {
        setError('상태 변경에 실패했습니다.');
    } finally {
        setLoading(false);
    }
};

return {
    todos,
    fetchTodos,
    createTodo,
    deleteTodo,
    toggleTodo,
    loading,
    error,
    };
}

export default useTodos;