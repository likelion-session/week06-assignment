# 6주차 과제 문제 전문 (React ↔ Spring Boot 연동)

**이번 주는 강의 없이 과제만 진행합니다.**  
아래 순서대로 따라 하면 됩니다. 제출은 [SUBMISSION.md](./SUBMISSION.md)를 따릅니다.

---

## 제출 (GitHub 조직)

- **과제 저장소**: [likelion-session/week06-assignment](https://github.com/likelion-session/week06-assignment)  
- **방식**: 저장소를 **Fork**한 뒤 `submissions/본인GitHub아이디/`에 코드를 넣고 **Pull Request**로 제출합니다.

### 과제 통과 최소선

1. 백엔드에 **CORS** 설정 (`http://localhost:3000` 허용)  
2. React에서 **목록 조회(GET)** + **추가(POST)**  
3. **삭제(DELETE)** 또는 **완료 토글(PATCH)** 중 **하나 이상**  
4. 로딩/에러 문구가 화면에 보임  
5. README에 실행 방법 + Network 탭 캡처 설명  

토글 API가 없는 5주차 프로젝트라면 **삭제만** 구현해도 3번은 충족됩니다.

---

## 0. 사전 준비 — 백엔드 API

5주차에서 만든 **Spring Boot Todo API**가 로컬에서 동작해야 합니다.

| 기능 | Method | URL |
|------|--------|-----|
| 목록 조회 | GET | `http://localhost:8080/api/todos` |
| 생성 | POST | `http://localhost:8080/api/todos` |
| 삭제 | DELETE | `http://localhost:8080/api/todos/{id}` |
| 완료 토글 | PATCH | `http://localhost:8080/api/todos/{id}/toggle` |

### 체크포인트 A — 백엔드 단독 확인

```bash
cd {5주차_프로젝트_폴더}
./mvnw spring-boot:run
```

Postman 또는 브라우저에서:

- `GET http://localhost:8080/api/todos` → JSON 배열(또는 `[]`)이 보이면 OK  

**React를 고치기 전에** 반드시 이 단계를 통과하세요.

---

## 0-1. Node.js 설치 (처음 하는 경우)

1. [https://nodejs.org](https://nodejs.org) → **LTS** 다운로드·설치  
2. 터미널에서 확인:

```bash
node -v    # v20.x 등
npm -v     # 10.x 등
```

설치 후 **터미널을 한 번 닫았다가 다시** 열어 주세요.

---

## 전체 따라하기 순서

| 순서 | 해야 할 일 | 확인 방법 |
|------|------------|-----------|
| 1 | 백엔드 실행 | Postman `GET /api/todos` 성공 |
| 2 | CORS 설정 추가 | React 출처 `http://localhost:3000` 허용 |
| 3 | React 프로젝트 생성 | `npm start`로 화면 열림 |
| 4 | Axios 설치 | `package.json`에 `axios` 존재 |
| 5 | `src/api/axios.js` 작성 | `baseURL`이 `http://localhost:8080/api` |
| 6 | `App.js`에 목록 조회 | 새로고침 시 GET 요청 |
| 7 | 추가 기능 | 버튼 클릭 시 POST 요청 |
| 8 | 삭제 또는 토글 | DELETE 또는 PATCH 요청 |
| 9 | 로딩/에러 문구 | 실패 시 화면에 메시지 |
| 10 | Network 탭 캡처 | URL·Status가 보이게 저장 |

### 중간 체크포인트

- **A**: 백엔드 `GET /api/todos` 성공  
- **B**: React `http://localhost:3000` 열림  
- **C**: Network에서 `GET /api/todos` 확인  
- **D**: 추가 후 `POST /api/todos` 확인  
- **E**: `DELETE` 또는 `PATCH .../toggle` 확인  

---

## 1단계: CORS와 Axios 설정 (필수, 20점)

### 목표

React(`localhost:3000`)에서 Spring Boot(`localhost:8080`) API를 호출할 수 있게 만든다.

### 1-1. Spring Boot — `CorsConfig.java`

패키지 경로는 본인 프로젝트에 맞게 조정합니다 (예: `com.likelion.todoapi.config`).

```java
package com.likelion.todoapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
```

**저장 후 Spring Boot를 반드시 재시작**합니다.

> Vite 등으로 프론트가 `http://localhost:5173`이면 `allowedOrigins`에 해당 주소도 추가하세요.

### 1-2. React 프로젝트 생성

```bash
npx create-react-app todo-front
cd todo-front
npm install axios
npm start
```

브라우저에 `http://localhost:3000` 이 열리면 **체크포인트 B** 통과.

### 1-3. `src/api/axios.js`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export default api;
```

`baseURL` 끝에 `/api`가 있으면, 호출은 `api.get('/todos')`처럼 **앞에 `/api`를 붙이지 않습니다.**

### 1단계 제출물

- `backend/.../CorsConfig.java` (또는 전체 백엔드 프로젝트)  
- `frontend/src/api/axios.js`  
- README에 실행 명령

### 실패하면 먼저 볼 것

| 증상 | 확인 |
|------|------|
| CORS 에러 (브라우저 Console) | `CorsConfig` 추가 후 **백엔드 재실행**, origin이 `http://localhost:3000`인지 |
| Network Error | Spring Boot가 켜져 있는지, 포트 8080인지 |
| 404 | `baseURL`이 `http://localhost:8080/api` 인지 |

---

## 2단계: Todo 목록 조회와 추가 (필수, 40점)

### 목표

브라우저에서 목록을 보고, 입력 후 추가 버튼으로 Todo를 생성한다.

### 요구사항

- 페이지 로드 시 `GET /todos` → 목록을 화면에 표시 (`useState`, `useEffect`)  
- 입력창 + 추가 버튼 → `POST /todos` body 예: `{ "title": "...", "description": "" }`  
- 성공 후 목록 다시 불러오기  
- `loading` / `error` 상태로 “불러오는 중…”, “오류가 발생했습니다” 등 표시  

### `App.js` 예시 골격

```javascript
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
      await api.post('/todos', { title: title.trim(), description: '' });
      setTitle('');
      await fetchTodos();
    } catch (e) {
      setError('추가에 실패했습니다.');
    }
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
          <li key={t.id}>{t.title} {t.completed ? '✓' : ''}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

> 위 코드는 **참고용**입니다. 그대로 복사해도 되고, 스타일은 자유입니다.

### 2단계 제출물

- 목록 + 새 Todo가 보이는 **화면 캡처**  
- Chrome DevTools → **Network** 탭에서 `GET`/`POST`와 **Status 200/201** 캡처  

---

## 3단계: 삭제 또는 완료 토글 (필수, 25점)

**아래 중 하나 이상** 구현합니다.

### A. 삭제

```javascript
await api.delete(`/todos/${id}`);
await fetchTodos();
```

각 항목 옆 **삭제** 버튼.

### B. 완료 토글

```javascript
await api.patch(`/todos/${id}/toggle`);
await fetchTodos();
```

각 항목 옆 **완료/미완료** 버튼. (5주차 API에 toggle이 있을 때)

### 3단계 제출물

- 삭제 또는 토글 동작 **화면 캡처**  
- Network에서 `DELETE`(204 등) 또는 `PATCH` 확인  

---

## 4단계: 커스텀 훅 분리 (선택, 보너스)

API 로직을 `src/hooks/useTodos.js`로 옮깁니다.

- `fetchTodos`, `createTodo`, `deleteTodo`, `toggleTodo` (구현한 것만)  
- `loading`, `error` 반환  

---

## 5단계: Axios 인터셉터 (선택, 보너스)

`axios.js`에 응답 인터셉터로 에러 로그를 남기고, README에 **Network Error / CORS / 404** 중 겪은 것과 해결법을 1개 이상 적습니다.

```javascript
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      console.error('서버 연결 실패 또는 CORS/네트워크 오류');
    } else {
      console.error('HTTP', err.response.status, err.response.data);
    }
    return Promise.reject(err);
  }
);
```

---

## 평가 기준

| 항목 | 배점 | 평가 |
|------|------|------|
| 1단계 CORS/Axios | 20 | CORS 설정, `baseURL`, 백엔드·프론트 동시 실행 |
| 2단계 조회/추가 | 40 | GET 목록, POST 추가, 목록 갱신 |
| 3단계 삭제/토글 | 25 | DELETE 또는 PATCH 중 하나 이상 |
| 로딩/에러 UI | 10 | 사용자에게 보이는 메시지 |
| README/제출 | 5 | 실행 명령, 캡처, `node_modules` 미포함 |

**총점 100점** — 4~5단계는 추가 점수용(강사 재량).

---

## README에 꼭 적을 내용 (`submissions/아이디/README.md`)

```bash
# 백엔드 (backend 폴더 또는 5주차 프로젝트 경로)
./mvnw spring-boot:run

# 프론트엔드 (frontend 폴더)
npm install
npm start
```

추가:

- 백엔드: `http://localhost:8080`  
- 프론트: `http://localhost:3000`  
- 구현한 기능 체크리스트 (GET, POST, DELETE/PATCH)  
- 막혔던 오류와 해결 방법 1개 이상  
- Network 탭에서 확인한 요청 목록  

---

## 디버깅 순서 (강의 없이도 이 순서만 지키기)

1. Postman `GET http://localhost:8080/api/todos`  
2. React `npm start` → 3000 포트  
3. F12 → **Network** → 요청 URL이 `http://localhost:8080/api/todos` 인지  
4. **Status**: 200/201/204면 성공, 404면 URL, 500이면 Spring 로그  
5. Console에 CORS 문구가 있으면 `CorsConfig` + 백엔드 재시작  

### Status Code 빠른 해석

| Status | 의미 |
|--------|------|
| 200 | 조회 성공 |
| 201 | 생성 성공 |
| 204 | 삭제 성공 |
| 400 | POST body 문제 (`title` 확인) |
| 404 | URL/`baseURL` 오류 |
| 500 | Spring Boot 터미널 로그 확인 |

---

## 제출 주의

- `node_modules/` 커밋 금지  
- DB 비밀번호·`.env` 커밋 금지  
- 스크린샷은 **실제 동작 화면**이어야 함  
- PR 제목: `[6주차] 이름 (GitHub: 아이디)`

---

## 팁

- **백엔드가 안 되면 프론트를 고치지 마세요** — 체크포인트 A부터.  
- 버튼 연타 방지: `disabled={loading}` 사용.  
- 질문할 때: 체크포인트(A~E), Console, Network, Spring 로그 20줄을 함께 보내 주세요.
