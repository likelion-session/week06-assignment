# Pull Request 제출 가이드

## 1. Fork

1. [likelion-session/week06-assignment](https://github.com/likelion-session/week06-assignment) 저장소 페이지에서 **Fork** 클릭  
2. Owner: 본인 계정, Repository name: 기본값 유지 권장 (`week06-assignment`)

## 2. Clone & 브랜치

```bash
git clone https://github.com/본인아이디/week06-assignment.git
cd week06-assignment
git checkout -b week06/본인GitHub아이디
```

## 3. 과제 작성

- `submissions/본인GitHub아이디/` 폴더를 만들고 [README.md](./README.md)의 구조에 맞게 추가  
- **다른 사람 폴더는 수정하지 않습니다.**

```bash
mkdir -p submissions/본인GitHub아이디/backend submissions/본인GitHub아이디/frontend
# backend/ = 5주차 Spring Boot, frontend/ = React
# 코드 작성 후
git add submissions/본인GitHub아이디
git commit -m "feat: 6주차 과제 제출 (본인이름)"
git push -u origin week06/본인GitHub아이디
```

## 4. Pull Request 생성

1. GitHub에서 Fork한 저장소 페이지로 이동  
2. **Compare & pull request** 또는 **New pull request**  
3. **base repository**: `likelion-session/week06-assignment` · **base**: `main`  
4. **head repository**: 본인 Fork · **compare**: `week06/본인GitHub아이디`  
5. 제목: `[6주차] 이름 (GitHub: 아이디)`  
6. 본문: PR 템플릿을 채움  
7. **Create pull request**

## 5. 수정 요청이 온 경우

강사/조교 리뷰 후 수정이 필요하면 PR에 코멘트가 달립니다. 같은 브랜치에 추가 커밋 후 `git push` 하면 PR에 자동 반영됩니다.

## 주의

- `main` 브랜치에 직접 푸시하지 마세요 (Fork 저장소에서 작업).  
- 원본 저장소에 **쓰기 권한이 없어도** Fork → PR 방식이면 제출 가능합니다.  
- **`node_modules/`**, **`.env`**, DB 비밀번호가 들어간 설정 파일은 올리지 마세요.**
