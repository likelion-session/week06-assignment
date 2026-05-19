# 6주차 과제 — React와 Spring Boot Todo API 연동

풀스택 개발 강의 (React + Java Spring Boot) **6주차** 과제입니다.  
**이번 주는 별도 강의 없이 과제만 진행**합니다. 아래 문서만으로 따라할 수 있도록 작성되어 있습니다.

이 저장소는 **과제 안내 전용**이며, 수강생은 **Fork 후 Pull Request**로 제출합니다.

---

## 📌 제출 방식 (PR)

1. 이 저장소 상단 **Fork** → 본인 계정으로 복사  
2. Fork한 저장소를 로컬에 `git clone`  
3. 브랜치 생성: `git checkout -b week06/본인GitHub아이디`  
4. 아래 **제출 폴더 규칙**에 맞게 파일 추가 후 커밋·푸시  
5. **원본 저장소(`likelion-session/week06-assignment`)** 로 **Pull Request** 생성  
6. PR 제목 예: `[6주차] 홍길동 (GitHub: username)`

자세한 단계는 [SUBMISSION.md](./SUBMISSION.md)를 참고하세요.

---

## 📁 제출 폴더 규칙 — **한 프로젝트만** 제출

이번 과제는 **백엔드·프론트를 따로 두지 않고**, 5주차 Spring Boot 프로젝트 **하나** 안에서 모두 완료·제출합니다.

```
submissions/
└── {본인GitHub아이디}/
    ├── README.md                 # 이름, 실행 방법(아래 단일 프로젝트 기준), 스크린샷
    └── todo-app/                 # 프로젝트 폴더명은 자유 (예: todo-fullstack)
        ├── pom.xml               # Spring Boot (5주차 그대로 + CorsConfig)
        ├── src/                  # Java 소스
        ├── frontend/             # 이 안에 create-react-app (React + Axios)
        │   ├── package.json
        │   └── src/
        └── screenshots/          # (선택) Network·화면 캡처
```

- 폴더명 `{본인GitHub아이디}`는 **반드시 GitHub 사용자명**과 동일합니다.  
- **`submissions/아이디/backend/` + `frontend/` 처럼 나눠 제출하지 마세요.** 반드시 위처럼 **루트 1개 + 그 안의 `frontend/`** 구조입니다.  
- 5주차 프로젝트를 복사한 뒤, **같은 폴더 트리**에 `frontend/`만 추가하면 됩니다.  
- **`frontend/node_modules/`** 는 커밋하지 않습니다.

---

## ✅ 과제 내용

문제 전문·환경 설정·복붙 코드·배점은 **[ASSIGNMENT.md](./ASSIGNMENT.md)** 를 참고하세요.

| 단계 | 요약 | 배점 |
|------|------|------|
| 1 | CORS + Axios 설정 | 20 |
| 2 | 목록 조회 + 추가 | 40 |
| 3 | 삭제 또는 완료 토글 | 25 |
| 공통 | 로딩/에러 UI | 10 |
| 공통 | README·제출 정리 | 5 |

**총점 100점** — 4~5단계(커스텀 훅·인터셉터)는 **선택(보너스)** 입니다.

---

## 📅 마감

- 강의에서 안내하는 **마감일시**를 따릅니다.

---

## ❓ 문의

강의 채널 또는 이 저장소 **Issues**로 문의하세요.  
막히면 **어느 체크포인트(A~E)에서 멈췄는지**, **브라우저 Console/Network 스크린샷**, **Spring Boot 터미널 마지막 20줄**을 함께 올려 주세요.

---

## 📚 참고

- [React 공식 문서](https://react.dev/)
- [Axios 문서](https://axios-http.com/)
- [Spring CORS](https://docs.spring.io/spring-framework/reference/web/webmvc-cors.html)
- 강의 저장소 `week06/materials.md` (치트시트, 있으면)
