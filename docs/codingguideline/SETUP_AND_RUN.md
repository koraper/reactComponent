# EduVerse 설치 및 실행 가이드

## 📋 시스템 요구사항

### 필수 소프트웨어
- **Node.js**: 20.0.0 이상 (React 19 지원)
- **npm**: 10.0.0 이상
- **Git**: 최신 버전

### 권장 사양
- **OS**: Windows 10/11, macOS 10.15+, Ubuntu 20.04+
- **RAM**: 8GB 이상 (16GB 권장)
- **디스크**: 3GB 이상 여유 공간

### 개발 도구 (선택)
- **VSCode**: 권장 에디터
  - ESLint 확장
  - Tailwind CSS IntelliSense
- **Chrome/Edge**: 개발자 도구 지원 브라우저
- **React Developer Tools**: 브라우저 확장
- **Redux DevTools**: Context API 디버깅용

---

## 🚀 설치 단계

### 1. 프로젝트 다운로드

```bash
# Git으로 클론
git clone https://github.com/your-repo/eduverse-fe.git
cd eduverse-fe

# 또는 ZIP 파일 다운로드 후 압축 해제
```

### 2. 의존성 설치

```bash
# npm을 사용한 설치
npm install

# 설치 중 문제 발생 시
npm install --legacy-peer-deps
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:

```env
# API 서버 설정
VITE_API_BASE_URL=http://localhost:8080/api

# Firebase 설정 (선택적)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 4. 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev

# 성공 메시지:
# VITE ready in XXX ms
# ➜  Local:   http://localhost:3001/
# ➜  Network: http://192.168.x.x:3001/
```

### 5. 브라우저 접속

브라우저에서 [http://localhost:3001](http://localhost:3001) 접속

---

## 🎯 실행 후 확인사항

### 정상 작동 체크리스트

✅ **랜딩 페이지 표시**
- 메인 페이지가 정상적으로 로드됨
- 이미지와 스타일이 올바르게 표시됨

✅ **라우팅 동작**
- `/login` 페이지 이동 가능
- `/register` 페이지 이동 가능
- 페이지 간 이동이 부드럽게 작동

✅ **개발자 도구 콘솔**
- 에러 메시지가 없음
- 경고가 최소화됨

✅ **다크모드 전환**
- 테마 전환 버튼이 작동함
- 다크/라이트 모드가 정상 적용됨

---

## 🛠️ 추가 개발 도구

### Storybook (컴포넌트 문서)

```bash
# Storybook 실행
npm run storybook

# 브라우저에서 자동 열림
# http://localhost:6006
```

Storybook에서 확인 가능한 것:
- 모든 공통 컴포넌트
- 컴포넌트 Props 문서
- 인터랙티브 테스트
- 접근성 검사

### 테스트 실행 (Vitest)

```bash
# 유닛 테스트
npm run test

# 테스트 UI 모드 (권장)
npm run test:ui

# 커버리지 리포트
npm run test:coverage

# 특정 파일 테스트
npm run test -- TaskCard.test.tsx
```

### 프로덕션 빌드

```bash
# 프로덕션 빌드 생성
npm run build

# 빌드 결과물 확인
ls -la dist/

# 빌드 미리보기
npm run preview
```

---

## 🐛 문제 해결

### 일반적인 문제들

#### 1. "Cannot find module" 에러

```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 2. 포트 3001이 이미 사용 중

```bash
# 다른 포트로 실행
npm run dev -- --port 3000

# 또는 vite.config.ts 수정
server: {
  port: 3000
}
```

#### 3. TypeScript 에러

```bash
# 타입 정의 재설치
npm install --save-dev @types/react @types/react-dom

# 타입 체크
npm run type-check
```

#### 4. API 연결 실패

**증상**: 로그인/API 호출 시 실패

**해결**:
1. 백엔드 서버 실행 확인
2. `.env` 파일의 `VITE_API_BASE_URL` 확인
3. CORS 설정 확인
4. 네트워크 탭에서 요청/응답 확인

#### 5. 이미지가 표시되지 않음

**해결**:
1. `public/static/images/` 폴더 확인
2. 이미지 경로가 `/public/static/images/`로 시작하는지 확인
3. 개발자 도구 Network 탭에서 404 에러 확인

#### 6. 다크모드가 작동하지 않음

**해결**:
1. `tailwind.config.js`의 `darkMode` 설정 확인
2. `ThemeContext` 프로바이더가 App.tsx에 있는지 확인
3. LocalStorage의 `theme` 값 확인

---

## 📊 성능 최적화

### 개발 환경 최적화

```bash
# Vite 캐시 정리
rm -rf node_modules/.vite

# 더 빠른 개발 서버
npm run dev -- --host
```

### 빌드 최적화

```bash
# 번들 크기 분석
npm run build -- --analyzer

# 압축된 빌드
npm run build -- --minify
```

---

## 🔍 디버깅 팁

### React Developer Tools

1. Chrome/Firefox 확장 설치
2. F12 → React 탭
3. 컴포넌트 트리 및 Props 확인
4. Context 값 실시간 모니터링

### VSCode 디버깅

`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug in Chrome",
      "url": "http://localhost:3001",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### 콘솔 디버깅

```tsx
// 개발 환경에서만 로그 출력
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

---

## 📚 추가 리소스

### 공식 문서
- [React 19 공식 문서](https://react.dev)
- [Vite 공식 문서](https://vitejs.dev)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [React Router v7](https://reactrouter.com)
- [TanStack Query (React Query)](https://tanstack.com/query)
- [Vitest 문서](https://vitest.dev)
- [Storybook 문서](https://storybook.js.org)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)

### 프로젝트 문서
- [README_MAIN.md](./README_MAIN.md) - 프로젝트 개요
- [QUICK_START.md](./QUICK_START.md) - 빠른 시작
- [FE_ARCHITECTURE_GUIDE.md](../codingguideline/FE_ARCHITECTURE_GUIDE.md) - 아키텍처 가이드
- [FE_CODING_GUIDELINES.md](../codingguideline/FE_CODING_GUIDELINES.md) - 코딩 가이드라인
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - 마이그레이션 정보
- [COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md) - 구현 현황

---

## 🆘 지원

### 이슈 보고
GitHub Issues에 다음 정보와 함께 보고:
- 에러 메시지 전문
- 재현 단계
- 브라우저/OS 정보
- 스크린샷 (가능한 경우)

### 커뮤니티
- Discord: [링크]
- Slack: [링크]
- 이메일: support@eduverse.com

---

**설치 완료! 개발을 시작하세요 🎉**