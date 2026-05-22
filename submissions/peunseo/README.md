# week06 Todo Assignment

## 구현 기능 체크리스트

- [x] Spring Boot Todo API
- [x] CORS 설정: `http://localhost:3000` 허용
- [x] React Todo 목록 조회: `GET /api/todos`
- [x] Todo 추가: `POST /api/todos`
- [x] Todo 삭제: `DELETE /api/todos/{id}`
- [x] Todo 완료 토글: `PATCH /api/todos/{id}/toggle`
- [x] 로딩/에러 문구 표시
- [x] 커스텀 훅 분리: `frontend/src/hooks/useTodos.js`
- [x] Axios 응답 인터셉터 에러 로그 처리

## 실행 방법

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Windows cmd에서는 아래 명령으로 실행할 수 있습니다.

```bash
mvnw.cmd spring-boot:run
```

백엔드 주소: `http://localhost:8080`

확인:

```bash
curl http://localhost:8080/api/todos
```

### Frontend

```bash
cd frontend
npm install
npm start
```

프론트엔드 주소: `http://localhost:3000`

## API

- `GET /api/todos`: Todo 목록 조회
- `POST /api/todos`: Todo 생성
- `DELETE /api/todos/{id}`: Todo 삭제
- `PATCH /api/todos/{id}/toggle`: 완료 상태 토글

## Network 탭 확인 요청

- `GET http://localhost:8080/api/todos` - `200 OK`
- `POST http://localhost:8080/api/todos` - `201 Created`
- `PATCH http://localhost:8080/api/todos/{id}/toggle` - `200 OK`

## 스크린샷

- `screenshots/01_frontend_todo_added.png`: Todo 목록과 새 Todo 표시 화면
- `screenshots/02_network_get_todos_200.png`: Network `GET /api/todos` 200 확인
- `screenshots/03_network_post_todos_201.png`: Network `POST /api/todos` 201 확인
- `screenshots/04_toggle_completed_screen.png`: Todo 완료 토글 동작 화면
- `screenshots/05_network_patch_toggle_200.png`: Network `PATCH /api/todos/{id}/toggle` 200 확인

## 에러 해결 기록

- `Network Error`: Spring Boot 서버가 켜져 있지 않으면 React에서 API 요청이 실패한다. `backend` 폴더에서 `mvnw.cmd spring-boot:run`으로 8080 서버를 먼저 실행해 해결한다.
- `CORS`: React는 `http://localhost:3000`, Spring Boot는 `http://localhost:8080`을 사용하므로 출처가 다르다. `CorsConfig.java`에서 `/api/**`에 대해 `http://localhost:3000` origin을 허용해 해결한다.
- `404`: Axios `baseURL`에 이미 `/api`가 포함되어 있으므로 요청은 `api.get('/todos')`처럼 작성한다. `api.get('/api/todos')`처럼 쓰면 잘못된 경로가 될 수 있다.
