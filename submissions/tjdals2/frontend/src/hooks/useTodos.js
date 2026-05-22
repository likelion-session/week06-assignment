import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

export const useTodos =() => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (title) => {
    if (!title.trim()) return;
    try {
      await api.post('/todos', { title: title.trim(), description: '' });
      await fetchTodos();
    } catch (event) {
      setError('추가에 실패했습니다.');
      throw event; 
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      await fetchTodos();
    } catch (event) {
      setError('삭제에 실패했습니다.');
    }
  };

  const toggleTodo = async (id) => {
    try {
      await api.patch(`/todos/${id}/toggle`);
      await fetchTodos();
    } catch (event) {
      setError('업데이트에 실패했습니다.');
    }
  };

  return { todos, loading, error, addTodo, deleteTodo, toggleTodo };
};

