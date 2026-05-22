import { useState } from 'react';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, loading, error, addTodo, deleteTodo, toggleTodo } = useTodos();
  const [title, setTitle] = useState('');

  const handleAddClick = async () => {
    try {
      await addTodo(title);
      setTitle(''); 
    } catch (event) {
      console.error('Failed to add todo:', event);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Todo</h1>
      {loading && <p>불러오는 중…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <div>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="할 일" />
        <button type="button" onClick={handleAddClick}>추가</button>
      </div>
      
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.title} {t.completed ? '✓' : ''}
            <button onClick={() => toggleTodo(t.id)}>
              {t.completed ? '미완료' : '완료'}
            </button>
            <button onClick={() => deleteTodo(t.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;