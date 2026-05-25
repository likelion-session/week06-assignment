import { useEffect, useState } from 'react';
import useTodos from './hooks/useTodos';

function App() {
  const { todos, loading, error, fetchTodos, handleAdd, handleDelete } = useTodos();
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const onSubmit = async () => {
    if (!title.trim()) return;
    await handleAdd(title);
    setTitle('');
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Todo</h1>
      {loading && <p>불러오는 중…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="할 일" />
        <button type="button" onClick={onSubmit}>추가</button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.title}
            <button type="button" onClick={() => handleDelete(t.id)} style={{ marginLeft: 8 }}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;