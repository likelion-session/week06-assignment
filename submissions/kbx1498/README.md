# 터미널 1- backend
cd submissions/kbx1498/backend
./mvnw spring-boot:run

# 터미널 2- frontend
cd submissions/kbx1498/frontend
npm install axios
npm start

체크리스트
[x] 1단계: 백엔드 CorsConfig.java 추가를 통한 http://localhost:3000 출처 허용 완료

[x] 1단계: 프론트엔드 src/api/axios.js 인스턴스 생성 및 baseURL 지정 완료

[x] 2단계: useState, useEffect 기반 GET /todos 목록 조회 및 화면 표시 완료

[x] 2단계: 입력창 및 버튼 연동을 통한 POST /todos 할 일 추가 완료

[x] 2단계: 로딩 상태(loading) 및 에러 처리(error) 메시지 UI 반영 완료

[x] 3단계: PATCH /todos/{id}/toggle 호출을 통한 완료 여부 토글 기능 구현 완료

[x] 3단계: DELETE /todos/{id} 호출을 통한 할 일 삭제 기능 구현 완료

[x] 4단계 (보너스): frontend/src/hooks/useTodos.js로 API 통신 로직 및 상태 관리 커스텀 훅 분리 완료

[ ] 5단계 (보너스): 응답 인터셉터 추가 (미구현)

# 오류 해결 방법
백엔드 실행 시 Cannot load driver class: org.postgresql.Driver 에러로 빌드 실패.

해결: backend/pom.xml에 
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        를 추가 

# 실행 화면 

![alt text](image.png)

![alt text](image-1.png)