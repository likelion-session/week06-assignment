import './App.css';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, title, setTitle, loading, error, handleAdd, handleToggle, handleDelete } = useTodos();

  return (
    <div className="app-shell">
      <h1 className="app-title">Todo</h1>
      {loading && <p className="app-status">불러오는 중...</p>}
      {error && <p className="app-error">{error}</p>}
      <div className="todo-form">
        <input
          className="todo-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일"
        />
        <button className="todo-add-button" type="button" onClick={handleAdd}>추가</button>
      </div>
      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t.id} className="todo-item">
            <div className="todo-content">
              <span className={`todo-title ${t.completed ? 'completed' : ''}`}>
                {t.title}
              </span>
            </div>
            <div className="todo-actions">
              <button
                type="button"
                className={`todo-badge ${t.completed ? 'done' : 'pending'}`}
                onClick={() => handleToggle(t.id)}
              >
                {t.completed ? '완료' : '미완료'}
              </button>
              <button
                type="button"
                className="todo-delete-button"
                onClick={() => handleDelete(t.id)}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;