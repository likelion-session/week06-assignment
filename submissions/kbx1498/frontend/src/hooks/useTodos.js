import { useState, useCallback } from 'react';
import api from '../api/axios';

const useTodos = () => {
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

  const handleAdd = async (title) => {
    if (!title.trim()) return;
    try {
      await api.post('/todos', { title: title.trim(), description: '' });
      await fetchTodos();
    } catch (e) {
      setError('추가에 실패했습니다.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      await fetchTodos();
    } catch (e) {
      setError('삭제에 실패했습니다.');
    }
  };

  return { todos, loading, error, fetchTodos, handleAdd, handleDelete };
};

export default useTodos;