# Mickle Muckle (2024년 12월 19일 기준)

Mickle Muckle은 사용자들의 카드 소비를 분석하고 절약을 도와주는 핀테크 프로젝트입니다.

## 실행 방식

### 1. 프로젝트 클론

```bash
git clone https://github.com/Hyukjoo-Lee/mickle-muckle.git
```

### 2. .env 파일 설정

.env.example 파일의 값을 적절히 채운 후에 .example 확장자를 제거하여 .env 파일로 변경합니다.

#### 프론트엔드 환경변수 설정 (app-frontend/.env.example)

- **`REACT_EDITOR`**: 기본값은 `code`로 설정되어 있습니다. 사용하고자 하는 에디터로 변경 가능합니다.  
  (예: VSCode를 사용하는 경우 기본값 유지)
- **`REACT_APP_API_URL`**: 기본값은 `http://localhost:8080`으로 설정되어 있습니다. 필요에 따라 백엔드 서버의 포트 번호를 수정합니다.

#### 백엔드 환경변수 설정 (app-backend/src/main/resources/.env.example)

```env
  SERVER_PORT=8080

  ORACLE_DB_URL=URL
  ORACLE_DB_USERNAME=USERNAME
  ORACLE_DB_PASSWORD=PASSWORD
```

- **`SERVER_PORT`**: 프론트엔드와 통신할 서버의 포트 번호를 입력합니다.  
  (예: `8080` 또는 원하는 포트 번호)
- **`ORACLE_DB_URL`**: 오라클 데이터베이스의 URL을 입력합니다.  
- **`ORACLE_DB_USERNAME`**: 오라클 데이터베이스 사용자 이름을 입력합니다.
- **`ORACLE_DB_PASSWORD`**: 오라클 데이터베이스 비밀번호를 입력합니다.

### 3. `app-frontend` 폴더로 이동

```bash
cd app-frontend
```

### 4. Dependencies 설치

```bash
npm install
```

### 5. 프로젝트 실행

```bash
npm start
```

---

## 협업 방식

### 1. main 브랜치에 '절대' 푸쉬하지 말 것

- main 브랜치는 최근 검사된 프로젝트를 유지합니다.

### 2. 기능별 브랜치 작업

- 각 기능이나 페이지 구현 시 별도의 브랜치를 생성하여 작업합니다.
- 브랜치 네이밍 규칙은 `[이름]/[기능명]` 형식으로 사용합니다 (띄어쓰기 안됨 '-'로 처리)
  - 예시)
  - `hj/로그인구현`
  - `je/로그인-실패처리`
  - `jh/이메일-회원가입`
  - `cr/카드목록-불러오기`
  - `hk/업종별-소비차트구현`
  - `mk/커뮤니티-글등록구현`

### 3. 작업 전후 코드 업데이트

---

### 목적: 이 과정을 반복하면 **작업하고 있는(로컬) 브랜치가 항상 최신 상태를 유지**하므로, 나중에 메인 브랜치와 병합할 때 충돌이 적어집니다.

이 예시는 CommonComponent을 만드는 중인 `hj/CommonComponent생성`이라는 브랜치에서 작업한다고 가정합니다.

1. **작업 전 - 최신 코드 가져오기**

   먼저, 메인 브랜치의 최신 내용을 가져옵니다. 메인 브랜치로 이동한 후 최신 상태로 업데이트합니다.

   ```bash
   git checkout main  # 메인 브랜치로 이동
   git pull origin main  # 원격 저장소에서 최신 코드 가져오기
   ```

2. **작업 브랜치로 이동해서 최신 코드 병합하기**

   이제 작업 브랜치로 돌아와, 메인 브랜치에서 가져온 최신 코드를 병합합니다.

   ```bash
   git checkout hj/CommonComponent생성  # 작업 브랜치로 이동
   git merge main  # 메인 브랜치에서 가져온 최신 코드 병합
   ```

3. **작업 진행**

   병합된 상태에서 작업을 진행하고 완료합니다.

4. **작업 후 작업 내용 원격 저장소에 commit & push**

   ```bash
   git commit -m "커밋메시지"
   git push
   ```

---

### 4. 커밋 메시지 규칙

- 명확하고 일관된 커밋 메시지를 작성합니다:
  ```bash
  git commit -m "[커밋 메시지]"
  예시) git commit -m "Add: 버튼 컴포넌트 추가"
  ```
- 커밋 메시지 형식:
  - `Setting`: 환경 설정 또는 초기 설정 관련 변경
  - `Add`: 새로운 파일 추가
  - `Feat`: 새로운 기능 추가
  - `Refactor`: 코드 리팩토링
  - `Test`: 테스트 코드, 리팩토링 테스트 코드 추가
  - `Comment`: 주석 추가 및 변경
  - `Rename`: 파일 또는 폴더명 수정
  - `Remove`: 파일 또는 폴더 삭제
  - `Update`: 기능 보완
  - `Move`: 파일이나 코드 이동
  - `Fix`: 버그 수정
  - `Docs`: 문서 수정
