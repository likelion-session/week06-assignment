import { useCallback, useEffect, useState } from 'react';
import api from '../api/axios';

function useTodos() {
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

  const createTodo = async (title) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('할 일을 입력해 주세요.');
      return false;
    }

    try {
      setError(null);
      await api.post('/todos', { title: trimmedTitle, description: '' });
      await fetchTodos();
      return true;
    } catch (e) {
      setError('추가에 실패했습니다.');
      return false;
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError(null);
      await api.delete(`/todos/${id}`);
      await fetchTodos();
    } catch (e) {
      setError('삭제에 실패했습니다.');
    }
  };

  const toggleTodo = async (id) => {
    try {
      setError(null);
      await api.patch(`/todos/${id}/toggle`);
      await fetchTodos();
    } catch (e) {
      setError('완료 상태 변경에 실패했습니다.');
    }
  };

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    deleteTodo,
    toggleTodo,
  };
}

export default useTodos;
