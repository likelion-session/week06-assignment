import { useTodos } from './hooks/useTodos';

function App() {
  const {
    todos,
    title,
    setTitle,
    loading,
    error,
    handleAdd,
    handleToggle,
    handleDelete
  } = useTodos();

  return (
    <div>
      <h1>Todo List</h1>

      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="할 일 입력" 
        />
        <button type="button" onClick={handleAdd}>추가</button>
      </div>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span 
              onClick={() => handleToggle(t.id)}
              style={{ textDecoration: t.completed ? 'line-through' : 'none' }}
            >
              {t.title} {t.completed ? '✓' : ''}
            </span>
            <button type="button" onClick={() => handleDelete(t.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;