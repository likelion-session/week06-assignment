import { useEffect, useState } from 'react';
import api from './api/axios';

function App() {
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
      await api.post('/todos', {
        title: title.trim(),
        description: '',
      });

      setTitle('');
      await fetchTodos();
    } catch (e) {
      setError('추가에 실패했습니다.');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Todo</h1>

      {loading && <p>불러오는 중...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일"
        />
        <button type="button" onClick={handleAdd}>
          추가
        </button>
      </div>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.title} {t.completed ? '✓' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;