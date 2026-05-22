import { useState } from 'react';
import './App.css';
import useTodos from './hooks/useTodos';

function App() {
  const { todos, loading, error, createTodo, deleteTodo, toggleTodo } = useTodos();
  const [title, setTitle] = useState('');

  const handleAdd = async (event) => {
    event.preventDefault();

    const created = await createTodo(title);
    if (created) {
      setTitle('');
    }
  };

  return (
    <main className="app">
      <section className="todo-panel">
        <div className="todo-header">
          <p className="eyebrow">Week 06 Assignment</p>
          <h1>Todo</h1>
          <p className="description">Spring Boot API와 React Axios 연결 확인용 Todo 목록입니다.</p>
        </div>

        <form className="todo-form" onSubmit={handleAdd}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="할 일"
            aria-label="할 일"
          />
          <button type="submit">추가</button>
        </form>

        {loading && <p className="status">불러오는 중...</p>}
        {error && <p className="status error">{error}</p>}

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className="todo-content">
                <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
                {todo.completed && <strong>완료</strong>}
              </div>
              <div className="todo-actions">
                <button type="button" onClick={() => toggleTodo(todo.id)}>
                  {todo.completed ? '미완료' : '완료'}
                </button>
                <button type="button" className="danger" onClick={() => deleteTodo(todo.id)}>
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>

        {!loading && todos.length === 0 && <p className="empty">아직 등록된 Todo가 없습니다.</p>}
      </section>
    </main>
  );
}

export default App;
