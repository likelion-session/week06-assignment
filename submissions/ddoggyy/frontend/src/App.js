import { useEffect, useState } from 'react';
import useTodos from './hooks/useTodos';

function App() {
  const [title, setTitle] = useState('');
  const { todos, fetchTodos, createTodo, deleteTodo, toggleTodo, loading, error } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;
    await createTodo(title.trim(), '');
    setTitle('');
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Todo</h1>
      {loading && <p>불러오는 중…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="할 일" />
        <button type="button" onClick={handleAdd}>추가</button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.title} {t.completed ? '✓' : ''}
            <button type="button" onClick={() => toggleTodo(t.id)} style={{ marginLeft: 8 }}>
              완료토글
            </button>
            <button type="button" onClick={() => deleteTodo(t.id)} style={{ marginLeft: 8 }}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;