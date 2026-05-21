import { useEffect, useState } from 'react';
import api from '../api/axios';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
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

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      await api.post('/todos', { title: title.trim(), description: '' });
      setTitle('');
      await fetchTodos();
    } catch (e) {
      setError('추가에 실패했습니다.');
    }
  };

  const handleToggle = async (id) => {
    try {
      await api.patch(`/todos/${id}/toggle`);
      await fetchTodos();
    } catch (e) {
      setError('완료 상태를 변경하지 못했습니다.');
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

  return {
    todos,
    title,
    setTitle,
    loading,
    error,
    fetchTodos,
    handleAdd,
    handleToggle,
    handleDelete,
  };
}
