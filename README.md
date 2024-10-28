# Mickle Muckle (2024년 10월 23일 기준)

Mickle Muckle은 사용자들의 카드 소비를 분석하고 절약을 도와주는 핀테크 프로젝트입니다.

## 실행 방식

### 1. 프로젝트 클론

```bash
git clone https://github.com/Hyukjoo-Lee/mickle-muckle.git
```

### 2. `app-frontend` 폴더로 이동

```bash
cd app-frontend
```

- 현재까지는 백엔드가 연동되지 않았습니다.

### 3. Dependencies 설치

```bash
npm install
```

### 4. 프로젝트 실행

```bash
npm start
```

---

## 협업 방식

### 1. Main 브랜치에 '절대' 푸쉬하지 말 것

- Main 브랜치는 최근 검사된 프로젝트를 유지합니다.

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

- **작업 시작 전**: Main 브랜치에서 최신 코드를 `pull` 하여 로컬 브랜치의 main 브랜치에도 최신 상태를 유지합니다.

  ```bash
  git checkout main
  git pull origin main
  ```

- **최신 Main 브랜치 코드와 작업 브랜치 병합**: Main 브랜치에서의 변경 사항을 작업 중인 브랜치에 병합합니다.
  
   ```bash
   git checkout [작업 브랜치 이름]  # 작업 브랜치로 이동
   git merge main                  # main 브랜치의 변경 사항 병합
   ```
---
- **작업 완료 후**: Push 전에도 Main 브랜치에서 다시 한 번 코드를 `pull`하여 충돌을 방지합니다.

  ```bash
  git pull origin main
  ```

- Main 브랜치에서 최신 코드를 받은 후 **다시 작업 브랜치로 돌아가** 계속 작업합니다:

  ```bash
  git checkout [작업 브랜치 이름]
  ```

  예시:

  ```bash
  git checkout hj/로그인구현
  ```

### 4. Git 경로 설정 주의

- **git 작업은 반드시 `mickle-muckle` 폴더에서 진행해야 합니다.**
  - `../mickle-muckle/app-frontend # git` ❌
  - `../mickle-muckle # git` ✅

* 만약 상위 폴더(../mickle-muckle)가 이미 Git 저장소로 설정되어 있는데
* 그 내부 폴더(app-frontend)에서도 git init이나 git clone 같은 작업을 하면,
* app-frontend 를 새로운 저장소로 인식하기 때문에 동일한 저장소의 중복된 복사본이 생성될 수 있습니다.

### 5. 커밋 메시지 규칙

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
  - `Chore`: 기타 작업(리팩토링, 주석 추가 등)
  - `Docs`: 문서 수정

### 6. Pull Request (PR) 규칙

- 기능이나 페이지 구현이 완료되면 **Pull Request**를 생성하여 팀장이나 팀원에게 코드 리뷰를 요청합니다.
- 팀장은 코드 최종 리뷰 후 Main 브랜치로 병합합니다.
