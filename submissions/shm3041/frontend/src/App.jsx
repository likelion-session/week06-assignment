import { useEffect, useState } from 'react'
import api from './api/axios'
import './App.css'

// Todo 목록 조회, 추가, 완료 토글, 삭제 기능을 담당하는 메인 화면 컴포넌트
function App() {
  // 서버에서 받아온 Todo 목록 저장
  const [todos, setTodos] = useState([])

  // 입력창에 작성 중인 새 Todo 제목
  const [title, setTitle] = useState('')

  // 목록 조회 중인지 표시해서 로딩 문구와 버튼 상태에 사용
  const [loading, setLoading] = useState(false)

  // Todo 추가 요청 중인지 표시해서 중복 제출 방지
  const [saving, setSaving] = useState(false)

  // API 요청 실패 시 사용자에게 보여줄 에러 메시지
  const [error, setError] = useState('')

  // GET /todos 요청으로 전체 Todo 목록 다시 불러오기
  const fetchTodos = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.get('/todos')
      setTodos(Array.isArray(response.data) ? response.data : [])
    } catch {
      setError('목록을 불러오지 못했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 화면이 처음 렌더링될 때 Todo 목록 한 번 조회
  useEffect(() => {
    fetchTodos()
  }, [])

  // 입력된 제목으로 새 Todo를 생성한 뒤 목록 다시 조회
  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    setSaving(true)
    setError('')
    try {
      await api.post('/todos', { title: trimmedTitle, description: '' })
      setTitle('')
      await fetchTodos()
    } catch {
      setError('할 일을 추가하지 못했습니다.')
    } finally {
      setSaving(false)
    }
  }

  // 선택한 Todo의 완료 여부를 서버에서 토글한 뒤 목록 갱신
  const handleToggle = async (id) => {
    setError('')
    try {
      await api.patch(`/todos/${id}/toggle`)
      await fetchTodos()
    } catch {
      setError('완료 상태를 변경하지 못했습니다.')
    }
  }

  // 선택한 Todo를 삭제한 뒤 목록 다시 불러오기
  const handleDelete = async (id) => {
    setError('')
    try {
      await api.delete(`/todos/${id}`)
      await fetchTodos()
    } catch {
      setError('할 일을 삭제하지 못했습니다.')
    }
  }

  return (
    <main className="app-shell">
      <section className="todo-panel" aria-labelledby="page-title">
        <header className="todo-header">
          <div>
            <p className="eyebrow">Week 06 Assignment</p>
            <h1 id="page-title">Todo</h1>
          </div>
          {/* 현재 서버에 저장된 Todo 목록 수동 조회 */}
          <button type="button" className="refresh-button" onClick={fetchTodos} disabled={loading}>
            새로고침
          </button>
        </header>

        {/* 새 Todo 제목을 입력하고 POST /todos 요청을 보내는 폼 */}
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="할 일을 입력하세요"
            aria-label="할 일 제목"
          />
          <button type="submit" disabled={saving || !title.trim()}>
            {saving ? '추가 중' : '추가'}
          </button>
        </form>

        {/* 목록 조회 상태나 API 실패 메시지 표시 */}
        <div className="status-area" aria-live="polite">
          {loading && <p className="loading">불러오는 중...</p>}
          {error && <p className="error">{error}</p>}
        </div>

        {/* 서버에서 받은 Todo 목록 렌더링 */}
        <ul className="todo-list">
          {!loading && todos.length === 0 && (
            <li className="empty">아직 등록된 할 일이 없습니다.</li>
          )}
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              {/* PATCH /todos/{id}/toggle 요청으로 완료 상태 변경 */}
              <button
                type="button"
                className={`check-button ${todo.completed ? 'is-complete' : ''}`}
                onClick={() => handleToggle(todo.id)}
                aria-label={todo.completed ? '미완료로 변경' : '완료로 변경'}
              >
                {todo.completed ? '완료' : '대기'}
              </button>
              <span className={todo.completed ? 'completed title' : 'title'}>{todo.title}</span>
              {/* DELETE /todos/{id} 요청으로 Todo 삭제 */}
              <button type="button" className="delete-button" onClick={() => handleDelete(todo.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
