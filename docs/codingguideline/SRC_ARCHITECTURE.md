# EduVerse src 폴더 구조 및 파일 관계 분석

## 📋 목차
1. [전체 구조 개요](#전체-구조-개요)
2. [폴더별 역할과 책임](#폴더별-역할과-책임)
3. [데이터 흐름 (Data Flow)](#데이터-흐름-data-flow)
4. [의존성 관계 (Dependency Graph)](#의존성-관계-dependency-graph)
5. [주요 파일 간 상호작용](#주요-파일-간-상호작용)
6. [Feature 모듈 구조](#feature-모듈-구조)
7. [상태 관리 아키텍처](#상태-관리-아키텍처)
8. [API 통신 레이어](#api-통신-레이어)
9. [라우팅 구조](#라우팅-구조)

---

## 전체 구조 개요

```
src/
├── api/                      # API 통신 계층 (Axios 클라이언트 및 인터셉터)
│   ├── client/              # Axios 클라이언트 설정
│   ├── interceptors/        # 요청/응답 인터셉터
│   └── types/               # API 타입 정의
├── assets/                   # 정적 리소스 (이미지, 폰트 등)
├── components/              # 재사용 가능한 컴포넌트
│   ├── common/             # 공통 UI 컴포넌트 (Button, Input 등)
│   ├── layout/             # 레이아웃 컴포넌트 (Header, Sidebar 등)
│   ├── Dashboard/          # 대시보드 전용 컴포넌트
│   ├── Modals/             # 공통 모달 컴포넌트
│   └── types/              # 컴포넌트 타입 정의
├── config/                  # 설정 파일
│   ├── app.config.ts       # 앱 설정
│   └── firebase.config.ts  # Firebase 설정
├── constants/               # 상수 정의
│   ├── api.ts             # API 관련 상수
│   ├── app.ts             # 앱 관련 상수
│   ├── routes.ts          # 라우트 상수
│   └── storage.ts         # Storage 관련 상수
├── contexts/                # React Context API (전역 상태 관리)
│   ├── AppContext.tsx     # 앱 전역 상태
│   ├── AuthContext.tsx    # 인증 상태
│   ├── ThemeContext.tsx   # 테마 상태
│   └── FontContext.tsx    # 폰트 상태
├── features/                # Feature 기반 모듈 (도메인별 기능)
│   ├── auth/              # 인증 기능
│   ├── learning/          # 학습 기능
│   ├── task/              # Task 기능
│   ├── lecture/           # 강의 기능
│   ├── curriculum/        # 커리큘럼 기능
│   ├── class/             # 클래스 기능
│   ├── student/           # 학생 기능
│   ├── professor/         # 교수 기능
│   ├── editor/            # 코드 에디터 기능
│   └── storage/           # 스토리지 기능
├── hooks/                   # Custom React Hooks
│   ├── useAuth.ts         # 인증 관련 Hook
│   ├── useLearning.ts     # 학습 관련 Hook
│   └── ...
├── pages/                   # 페이지 컴포넌트 (라우트별)
│   ├── auth/              # 인증 페이지 (로그인, 회원가입 등)
│   ├── student/           # 학생 페이지
│   ├── professor/         # 교수 페이지
│   ├── admin/             # 관리자 페이지
│   ├── landing/           # 랜딩 페이지
│   ├── settings/          # 설정 페이지
│   └── progress/          # 진행 상황 페이지
├── routes/                  # 라우트 설정
│   └── index.tsx          # 라우트 정의
├── services/                # 서비스 계층 (비즈니스 로직)
│   ├── api.ts            # API 서비스
│   ├── firebase.ts       # Firebase 서비스
│   ├── errorLogger.ts    # 에러 로깅 서비스
│   └── professor/        # 교수 관련 서비스
├── stories/                 # Storybook 스토리
│   ├── Dashboard/
│   ├── Modals/
│   └── assets/
├── test/                    # 테스트 관련 파일
│   ├── setup.ts          # 테스트 설정
│   └── utils/            # 테스트 유틸리티
├── types/                   # 전역 타입 정의
│   ├── app.types.ts      # 앱 타입
│   ├── user.types.ts     # 사용자 타입
│   ├── learning.types.ts # 학습 타입
│   └── api/              # API 타입
├── utils/                   # 유틸리티 함수
│   └── __tests__/        # 유틸리티 테스트
├── App.tsx                  # 메인 앱 컴포넌트
├── main.tsx                 # 앱 진입점
└── index.css                # 글로벌 스타일
```

---

## 폴더별 역할과 책임

### 1. `/api` - API 통신 계층

**역할**: 백엔드 서버와의 HTTP 통신 담당

**주요 파일**:
- `client/axiosClient.ts`: Axios 인스턴스 설정 (baseURL, timeout, headers)
- `interceptors/authInterceptor.ts`: 요청/응답 인터셉터 (토큰 주입, 리프레시, 에러 처리)
- `types/`: API 요청/응답 타입 정의

**책임**:
- HTTP 클라이언트 설정 및 관리
- 인증 토큰 자동 주입
- 토큰 만료 시 자동 갱신
- API 에러 통합 처리
- 응답 데이터 정규화

**사용 예시**:
```typescript
import axiosClient from '@/api/client/axiosClient';

const response = await axiosClient.get('/users');
const result = await axiosClient.post('/login', { email, password });
```

---

### 2. `/components` - 재사용 가능한 UI 컴포넌트

**역할**: 프로젝트 전역에서 재사용되는 UI 컴포넌트 제공

**하위 폴더**:
- `common/`: Button, Input, Card, Badge 등 기본 UI 컴포넌트
- `layout/`: Header, Sidebar, Footer 등 레이아웃 컴포넌트
- `Dashboard/`: 대시보드 전용 컴포넌트 (StatsCard, ChartWidget 등)
- `Modals/`: 공통 모달 컴포넌트 (IntroModals, UtilityModals)
- `types/`: 컴포넌트 Props 타입 정의

**특징**:
- **재사용성**: 여러 페이지/기능에서 공통으로 사용
- **순수성**: 비즈니스 로직 없이 Props로만 동작
- **Storybook 문서화**: 모든 공통 컴포넌트는 Storybook 스토리 보유

**의존성**:
- ✅ `types/` (타입 정의)
- ✅ `contexts/` (테마, 폰트 등 전역 상태)
- ❌ `pages/`, `features/` (의존하지 않음)

---

### 3. `/config` - 설정 파일

**역할**: 환경별 설정 및 외부 서비스 설정 관리

**주요 파일**:
- `app.config.ts`: 앱 전역 설정 (앱 이름, 버전, 기본값 등)
- `firebase.config.ts`: Firebase 프로젝트 설정

**특징**:
- 환경 변수 (`import.meta.env`) 사용
- 타입 안전성 보장
- 개발/프로덕션 환경 분리

---

### 4. `/constants` - 상수 정의

**역할**: 매직 넘버/문자열 제거, 중앙 집중식 상수 관리

**주요 파일**:
- `api.ts`: API 엔드포인트, timeout 등
- `app.ts`: 앱 관련 상수 (기본 설정값, 제한값 등)
- `routes.ts`: 라우트 경로 상수
- `storage.ts`: LocalStorage/SessionStorage 키

**사용 예시**:
```typescript
import { API_BASE_URL, API_TIMEOUT } from '@/constants/api';
import { ROUTES } from '@/constants/routes';

// 라우팅
navigate(ROUTES.STUDENT.DASHBOARD);

// API 설정
axios.create({ baseURL: API_BASE_URL, timeout: API_TIMEOUT });
```

---

### 5. `/contexts` - 전역 상태 관리 (Context API)

**역할**: 앱 전역에서 공유되는 상태 관리

**주요 Context**:

#### 1. **AppContext** (`AppContext.tsx`)
- **상태**: weekData, currentWeek, currentCycleIndex, currentModalType, syntaxDb, classes, monacoEditor 등
- **역할**: 학습 진행 상태, 모달 제어, 에디터 인스턴스 관리
- **사용처**: 학습 플로우 전반

#### 2. **AuthContext** (`AuthContext.tsx`)
- **상태**: user, token, isLoading
- **역할**: 로그인/로그아웃, 사용자 정보 관리
- **기능**:
  - `login(email, password)`: 로그인 처리
  - `logout()`: 로그아웃 처리
  - `updateUser(user)`: 사용자 정보 업데이트
  - 토큰 자동 복원 (localStorage)

#### 3. **ThemeContext** (`ThemeContext.tsx`)
- **상태**: theme (light/dark)
- **역할**: 다크모드 전환
- **기능**: `toggleTheme()`

#### 4. **FontContext** (`FontContext.tsx`)
- **상태**: fontSize, fontFamily
- **역할**: 폰트 설정 관리

**특징**:
- Reducer 패턴 사용 (`useReducer`)
- Custom Hook 제공 (`useApp`, `useAuth`, `useTheme`, `useFont`)
- Type-safe 상태 관리

**사용 예시**:
```typescript
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';

const { state, dispatch, setModalType } = useApp();
const { user, login, logout } = useAuth();
```

---

### 6. `/features` - Feature 기반 모듈

**역할**: 도메인별 기능을 독립적인 모듈로 구성

**구조** (각 feature 공통):
```
features/auth/
├── components/          # Feature 전용 컴포넌트
├── hooks/              # Feature 전용 Hook
├── services/           # Feature 전용 서비스 (API 호출 등)
├── types/              # Feature 전용 타입
├── utils/              # Feature 전용 유틸리티
└── index.ts            # Public API (Export)
```

#### 주요 Feature 모듈:

**1. `auth/` - 인증 기능**
- **Hooks**: `useAuth`, `useEmailVerification`, `useUserProfile`
- **Services**: `authService` (login, register, getUserProfile)
- **Components**: `EmailVerificationModal`, `TermsAgreementSection`

**2. `learning/` - 학습 기능**
- **Services**: `learningService` (getScenario, getSyntaxDatabase)
- **Components**:
  - `LearningContent`, `LearningHeader`
  - `LessonList`, `LessonFilterBar`
  - `CurriculumSidebar`
  - `CodeEditor`, `ExecutionPanel`
- **Types**: `lesson.types`, `curriculum.types`, `CodeEditor.types`
- **Utils**: `lessonFilters`

**3. `task/` - Task 기능**
- **Components**: `TaskModal`, `BriefingModal`, `FeedbackModal`
- **Types**: `TaskModals.types`

**4. `lecture/` - 강의 기능**
- **Components**: `LectureReflectionModals`
- **Exports**: `LectureModal`, `ReflectionModal`

**5. `curriculum/` - 커리큘럼 기능**
- **Hooks**: `useCurriculum`
- **Services**: `curriculumService`, `scenarioService`

**6. `class/` - 클래스 기능**
- **Hooks**: `useClass`, `useClassManagement`
- **Services**: `classService`

**7. `professor/` - 교수 기능**
- **Components**:
  - `create-class/` (Step1, Step2, Step3)
  - `curriculum-detail/`
  - 각종 모달 (CreateClassModal, EditClassModal, DeleteClassModal, QrCodeModal 등)
- **Types**: 각 컴포넌트별 타입

**8. `student/` - 학생 기능**
- **Hooks**: `useStudent`
- **Services**: `studentService`

**9. `editor/` - 코드 에디터**
- **Components**: `CodeEditor` (Monaco Editor 래핑)
- **Types**: `CodeEditor.types`

**10. `storage/` - 스토리지 기능**
- **Services**: `storageService`

**Feature 모듈 특징**:
- **캡슐화**: 각 feature는 독립적으로 동작
- **명확한 Public API**: `index.ts`에서 필요한 것만 export
- **응집도**: 관련 기능을 하나의 폴더에 모음
- **재사용성**: 다른 feature나 page에서 import하여 사용

**의존성 규칙**:
```
features/ → api/client, contexts/, types/
features/ ← pages/ (pages는 features를 사용)
features/ ↔ features/ (feature 간 상호 import 가능하지만 최소화)
```

---

### 7. `/hooks` - Custom React Hooks

**역할**: 재사용 가능한 로직을 Hook으로 추상화

**주요 Hooks**:

#### `useAuth.ts` (features/auth/hooks 아님, 글로벌 Hook)
- **위치**: `src/hooks/useAuth.ts`
- **역할**: AuthContext의 편의 래퍼
- **반환**: `{ user, token, login, logout, ... }`

#### `useLearning.ts`
- **위치**: `src/hooks/useLearning.ts`
- **역할**: 학습 시나리오 로드, 진행 상황 저장
- **기능**:
  - `loadScenario(week, cycleIndex)`: 시나리오 데이터 로드
  - `loadSyntaxDb()`: Python 문법 DB 로드
  - `saveStudyProgress(week, cycle)`: 진행 상황 저장
  - `savePause(view, code)`: 일시정지 상태 저장
  - `clearPause()`: 일시정지 상태 삭제
- **의존성**:
  - `AppContext` (상태 관리)
  - `learningService` (API 호출)
  - `firebase` (진행 상황 저장)

**특징**:
- Feature Hook vs 글로벌 Hook 구분
  - Feature Hook: `features/*/hooks/` (해당 feature에서만 사용)
  - 글로벌 Hook: `src/hooks/` (여러 곳에서 재사용)

---

### 8. `/pages` - 페이지 컴포넌트

**역할**: 라우트별 페이지 컴포넌트 (View Layer)

**구조**:
```
pages/
├── auth/               # 인증 페이지
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── StudentSignupPage.tsx
│   └── VerifyEmailPage.tsx
├── student/            # 학생 페이지
│   ├── StudentDashboard.tsx
│   ├── LearningPage.tsx
│   ├── StudentStudyPage.tsx
│   └── QnaPage.tsx
├── professor/          # 교수 페이지
│   ├── ProfessorDashboardPage.tsx
│   ├── ClassManagementPage.tsx
│   ├── CreateClassPage.tsx
│   ├── ClassDetailPage.tsx
│   └── StudentsPage.tsx
├── admin/              # 관리자 페이지
│   ├── AdminDashboardPage.tsx
│   ├── UserManagementPage.tsx
│   ├── ClassManagementPage.tsx
│   ├── CurriculumManagementPage.tsx
│   ├── CreateCurriculumPage.tsx
│   ├── CurriculumDetailPage.tsx
│   ├── EditCurriculumPage.tsx
│   ├── SystemSettingsPage.tsx
│   ├── AdminAnalyticsPage.tsx
│   └── AdminLogsPage.tsx
├── landing/            # 랜딩 페이지
│   └── LandingPage.tsx
├── settings/           # 설정 페이지
│   └── SettingsPage.tsx
└── progress/           # 진행 상황 페이지
    └── ProgressPage.tsx
```

**책임**:
- 라우트 연결 (React Router)
- Feature 컴포넌트/Hook 조합
- 페이지 레벨 상태 관리 (useState)
- 레이아웃 구성
- 인증 가드 (필요 시)

**특징**:
- Lazy Loading: `App.tsx`에서 `lazy()`로 동적 import
- Feature 조합: 여러 feature를 조합하여 페이지 구성

**예시**:
```typescript
// StudentDashboard.tsx
import { useAuth } from '@/contexts/AuthContext';
import { useClass } from '@/features/class';
import { DashboardLayout } from '@/components/layout';
import { ClassCard } from '@/features/class/components';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { classes } = useClass();

  return (
    <DashboardLayout>
      {classes.map(cls => <ClassCard key={cls.id} class={cls} />)}
    </DashboardLayout>
  );
}
```

---

### 9. `/routes` - 라우트 설정

**역할**: React Router 라우트 정의

**주요 파일**:
- `index.tsx`: 모든 라우트 정의

**특징**:
- Lazy Loading 지원
- 중첩 라우트 지원
- Protected Route (인증 필요 페이지)

---

### 10. `/services` - 서비스 계층

**역할**: 비즈니스 로직, 외부 서비스 연동

**주요 파일**:

#### `firebase.ts`
- **역할**: Firebase Firestore 연동
- **기능**:
  - `initializeFirebase()`: Firebase 초기화
  - `sendLiveCode(userEmail, code)`: 실시간 코드 업데이트 (Debounced)
  - `markCodingIntroAsSeen(userEmail, introKey)`: 인트로 시청 기록
  - `saveProgress(userEmail, week, cycle)`: 학습 진행 상황 저장
  - `savePauseState(userEmail, pauseState)`: 일시정지 상태 저장
  - `clearPauseState(userEmail)`: 일시정지 상태 삭제

#### `api.ts`
- **역할**: 공통 API 서비스 (features에 속하지 않는 범용 API)

#### `errorLogger.ts`
- **역할**: 에러 로깅 서비스

#### `professor/`
- **역할**: 교수 관련 서비스

**특징**:
- Feature Service vs 글로벌 Service 구분
  - Feature Service: `features/*/services/` (해당 feature 전용)
  - 글로벌 Service: `src/services/` (범용)

---

### 11. `/types` - 전역 타입 정의

**역할**: 프로젝트 전역에서 사용되는 타입 정의

**주요 파일**:
- `app.types.ts`: AppState, SyntaxNode 등 앱 전역 타입
- `user.types.ts`: User 타입
- `learning.types.ts`: WeekData, Cycle 등 학습 관련 타입
- `api/`: API 요청/응답 타입

**특징**:
- 중앙 집중식 타입 관리
- Feature별 타입은 `features/*/types/`에 별도 관리

---

### 12. `/utils` - 유틸리티 함수

**역할**: 순수 함수 형태의 유틸리티 제공

**특징**:
- React/Context에 의존하지 않음
- 테스트 가능 (`__tests__/`)

---

### 13. `/stories` - Storybook 스토리

**역할**: 컴포넌트 문서화 및 개발 환경

**구조**:
- 각 컴포넌트별 `.stories.tsx` 파일
- 인터랙티브 테스트 환경 제공

---

### 14. 루트 파일

#### `main.tsx`
- **역할**: 앱 진입점
- **책임**:
  - React DOM 렌더링
  - StrictMode 활성화

```typescript
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

#### `App.tsx`
- **역할**: 최상위 앱 컴포넌트
- **책임**:
  - Context Provider 계층 구성
    ```
    AppProvider
    └── QueryClientProvider (React Query)
        └── AuthProvider
            └── ThemeProvider
                └── FontProvider
                    └── ToastProvider
                        └── BrowserRouter
                            └── ErrorBoundary
                                └── Routes
    ```
  - React Query 설정
  - Lazy Loading Suspense
  - 전역 에러 처리 (ErrorBoundary)
  - 모달 렌더링 로직 (ModalRenderer)
  - 학습 플로우 상태 관리

---

## 데이터 흐름 (Data Flow)

### 1. 앱 시작 플로우

```
main.tsx
  └─> App.tsx
       ├─> AppProvider (전역 상태 초기화)
       ├─> AuthProvider (인증 상태 복원 - localStorage)
       │    └─> authService.getUserProfile() (토큰 검증 및 사용자 정보 로드)
       ├─> ThemeProvider (테마 설정 복원 - localStorage)
       ├─> QueryClientProvider (React Query 초기화)
       └─> BrowserRouter
            └─> Routes (라우트별 페이지 렌더링)
```

### 2. 로그인 플로우

```
LoginPage
  └─> useAuth().login(email, password)
       └─> authService.login({ email, password })
            ├─> axiosClient.post('/auth/login')
            │    └─> Backend API
            │         └─> { accessToken, refreshToken }
            ├─> localStorage.setItem('accessToken')
            ├─> authService.getUserProfile()
            │    └─> axiosClient.get('/users/profile')
            │         └─> Backend API
            │              └─> UserProfile
            └─> AuthContext.setUser(user)
                 └─> 전역 user 상태 업데이트
                      └─> 페이지 리다이렉트 (role에 따라)
```

### 3. 학습 시나리오 로드 플로우

```
StudentStudyPage
  └─> onStartTask(week, cycle)
       └─> useLearning().loadScenario(week, cycle)
            ├─> learningService.getScenario(week, userEmail)
            │    └─> axiosClient.get(`/scenarios/${week}`)
            │         └─> Backend API
            │              └─> WeekData { cycles: [...] }
            └─> AppContext.setWeekData(weekData)
                 ├─> setWeek(week)
                 ├─> setCycleIndex(cycle)
                 └─> setModalType('task')
                      └─> ModalRenderer
                           └─> TaskModal (팀장 지시 모달 표시)
```

### 4. 학습 진행 플로우 (Modal → CodeEditor)

```
학습 싸이클 플로우:

1. TaskModal (팀장 지시)
   └─> onShowBriefing()
        └─> setModalType('briefing')

2. BriefingModal (선임 브리핑)
   └─> onStartCoding()
        └─> setModalType(null) + setShowLearningView(true)

3. CodeEditor (Monaco Editor)
   ├─> 코드 작성
   ├─> onLecture() → LectureModal
   ├─> onQuestion() → AskQuestionModal
   ├─> onPause() → savePause() → 대시보드 복귀
   └─> onSubmit() → setModalType('feedback')

4. FeedbackModal (선임 검수)
   └─> onNextCycle()
        ├─> 마지막 사이클 여부 확인
        ├─> 마지막이면 → setModalType('reflection')
        └─> 아니면 → setCycleIndex(+1) + setModalType('task')

5. ReflectionModal (학습 회고)
   └─> onSubmit(journalData)
        └─> 대시보드 복귀
```

### 5. API 요청 플로우 (인터셉터 포함)

```
컴포넌트/Hook
  └─> axiosClient.get/post()
       ├─> [Request Interceptor]
       │    ├─> 토큰 주입 (Authorization: Bearer <token>)
       │    └─> 요청 로깅 (dev 환경)
       ├─> Backend API 호출
       └─> [Response Interceptor]
            ├─> 성공 (200~299)
            │    └─> 응답 데이터 반환
            └─> 실패 (4xx, 5xx)
                 ├─> 401 Unauthorized (토큰 만료)
                 │    └─> refreshToken으로 새 토큰 발급
                 │         ├─> 성공 → 원래 요청 재시도
                 │         └─> 실패 → 로그아웃 + 로그인 페이지 이동
                 └─> 기타 에러
                      └─> Toast 에러 메시지 표시
```

### 6. 상태 업데이트 플로우 (Context API)

```
컴포넌트
  └─> useApp().setModalType('task')
       └─> AppContext.dispatch({ type: 'SET_MODAL_TYPE', payload: 'task' })
            └─> appReducer(state, action)
                 └─> return { ...state, currentModalType: 'task' }
                      └─> 모든 구독 컴포넌트 리렌더링
                           └─> ModalRenderer (currentModalType 변경 감지)
                                └─> TaskModal 렌더링
```

---

## 의존성 관계 (Dependency Graph)

### 계층별 의존성

```
[Layer 1: 기본 레이어]
├── types/           (전역 타입 정의)
├── constants/       (상수)
├── config/          (설정)
└── utils/           (순수 함수)

      ↑ (의존)

[Layer 2: 인프라 레이어]
├── api/client       (Axios 클라이언트)
├── api/interceptors (인터셉터)
└── api/types        (API 타입)

      ↑ (의존)

[Layer 3: 상태 관리 레이어]
├── contexts/        (전역 상태)
│   ├── AppContext
│   ├── AuthContext
│   ├── ThemeContext
│   └── FontContext

      ↑ (의존)

[Layer 4: 비즈니스 로직 레이어]
├── features/*/services/  (Feature 서비스)
├── services/            (글로벌 서비스)
└── hooks/               (Custom Hooks)

      ↑ (의존)

[Layer 5: UI 레이어]
├── components/          (재사용 컴포넌트)
└── features/*/components/ (Feature 컴포넌트)

      ↑ (의존)

[Layer 6: 페이지 레이어]
└── pages/              (라우트별 페이지)

      ↑ (의존)

[Layer 7: 앱 레이어]
├── routes/             (라우트 설정)
├── App.tsx             (메인 앱)
└── main.tsx            (진입점)
```

### 핵심 의존성 규칙

#### ✅ 허용되는 의존성

```typescript
// 1. Pages → Features
import { TaskModal } from '@/features/task';
import { useAuth } from '@/features/auth';

// 2. Features → API Client
import axiosClient from '@/api/client/axiosClient';

// 3. Features/Pages → Contexts
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';

// 4. Features/Pages → Components
import { Button } from '@/components/common';

// 5. 모든 레이어 → types, constants, config, utils
import { ROUTES } from '@/constants/routes';
import type { User } from '@/types/user.types';

// 6. Features → Services
import { learningService } from '@/features/learning/services/learningService';

// 7. Hooks → Features, Contexts, Services
import { useApp } from '@/contexts/AppContext';
import { learningService } from '@/features/learning';
```

#### ❌ 금지되는 의존성

```typescript
// 1. Components → Pages (역방향 의존)
// ❌ components는 pages를 import하면 안 됨

// 2. API → Features/Pages (역방향 의존)
// ❌ API 레이어는 상위 레이어를 몰라야 함

// 3. Constants → 동적 로직
// ❌ constants는 순수 값만 export해야 함
```

### Feature 간 의존성

```typescript
// Feature 간 상호 import는 가능하지만 최소화 권장

// features/learning → features/curriculum
import { curriculumService } from '@/features/curriculum';

// features/task → features/learning
import { LearningContent } from '@/features/learning/components';
```

---

## 주요 파일 간 상호작용

### 1. App.tsx ↔ Contexts

```typescript
// App.tsx
function App() {
  return (
    <AppProvider>           {/* 1. 앱 전역 상태 */}
      <AuthProvider>        {/* 2. 인증 상태 */}
        <ThemeProvider>     {/* 3. 테마 상태 */}
          <FontProvider>    {/* 4. 폰트 상태 */}
            {/* ... */}
          </FontProvider>
        </ThemeProvider>
      </AuthProvider>
    </AppProvider>
  );
}
```

**데이터 흐름**:
- App.tsx: Provider 계층 구성
- Contexts: 전역 상태 제공
- 하위 컴포넌트: `useApp()`, `useAuth()` 등으로 상태 소비

---

### 2. Pages ↔ Features

```typescript
// pages/student/StudentDashboard.tsx
import { useClass } from '@/features/class';
import { ClassCard } from '@/features/class/components';

export default function StudentDashboard() {
  const { classes, isLoading } = useClass();  // Feature Hook 사용

  return (
    <div>
      {classes.map(cls => (
        <ClassCard key={cls.id} class={cls} />  // Feature Component 사용
      ))}
    </div>
  );
}
```

**패턴**:
- Pages: Feature의 Hook과 Component를 조합
- Features: 독립적으로 동작하는 기능 단위 제공

---

### 3. Hooks ↔ Services ↔ API Client

```typescript
// hooks/useLearning.ts
import { learningService } from '@/features/learning';

const loadScenario = async (week, cycle) => {
  const weekData = await learningService.getScenario(week, userEmail);
  setWeekData(weekData);
};

// features/learning/services/learningService.ts
import axiosClient from '@/api/client/axiosClient';

export const learningService = {
  getScenario: async (week, email) => {
    const response = await axiosClient.get(`/scenarios/${week}`, {
      params: { email }
    });
    return response.data;
  }
};

// api/client/axiosClient.ts
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});
```

**흐름**:
1. Hook: 비즈니스 로직 (상태 관리 + 서비스 호출)
2. Service: API 호출 (데이터 페칭, 변환)
3. API Client: HTTP 통신 (인터셉터, 에러 처리)

---

### 4. AuthContext ↔ AuthService ↔ API

```typescript
// contexts/AuthContext.tsx
const login = async (email, password) => {
  const { authService } = await import('@/features/auth');

  // 1. 로그인 API 호출
  const loginResponse = await authService.login({ email, password });
  const { accessToken } = loginResponse.data;

  // 2. 토큰으로 사용자 정보 가져오기
  const userProfile = await authService.getUserProfile();

  // 3. 상태 업데이트
  setUser(userProfile);
  setToken(accessToken);
};

// features/auth/services/authService.ts
export const authService = {
  login: async (credentials) => {
    return await axiosClient.post('/auth/login', credentials);
  },
  getUserProfile: async () => {
    return await axiosClient.get('/users/profile');
  }
};
```

**특징**:
- AuthContext: 전역 인증 상태 관리
- AuthService: 인증 관련 API 호출
- 토큰은 localStorage에 저장, 인터셉터에서 자동 주입

---

### 5. App.tsx ↔ Routes ↔ Pages

```typescript
// App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/student/dashboard" element={<StudentDashboard />} />
    {/* ... */}
  </Routes>
</BrowserRouter>

// routes/index.tsx (대안 구조)
export const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.LANDING} element={<LandingPage />} />
    {/* ... */}
  </Routes>
);
```

**Lazy Loading**:
```typescript
const LandingPage = lazy(() => import('@/pages/landing/LandingPage'));
```

---

## Feature 모듈 구조

### Feature 모듈 표준 구조

```
features/[feature-name]/
├── components/          # Feature 전용 UI 컴포넌트
│   ├── ComponentA.tsx
│   ├── ComponentB.tsx
│   └── types/          # 컴포넌트 타입 (선택)
├── hooks/              # Feature 전용 Hook
│   ├── useFeature.ts
│   └── useFeatureData.ts
├── services/           # Feature 전용 서비스 (API 호출 등)
│   └── featureService.ts
├── types/              # Feature 전용 타입
│   └── feature.types.ts
├── utils/              # Feature 전용 유틸리티 (선택)
│   └── featureHelpers.ts
└── index.ts            # Public API (Export)
```

### 예시: `features/learning`

```
features/learning/
├── components/
│   ├── LearningContent.tsx
│   ├── LearningHeader.tsx
│   ├── LessonList.tsx
│   ├── LessonFilterBar.tsx
│   ├── CurriculumSidebar.tsx
│   ├── CodeEditor.tsx
│   ├── ExecutionPanel.tsx
│   └── ...
├── hooks/
│   └── useLearning.ts (참고: 글로벌 Hook은 src/hooks/)
├── services/
│   └── learningService.ts
├── types/
│   ├── lesson.types.ts
│   ├── curriculum.types.ts
│   ├── LearningContent.types.ts
│   └── ...
├── utils/
│   └── lessonFilters.ts
└── index.ts
```

**index.ts** (Public API):
```typescript
// Learning feature exports
export * from './services/learningService';
export * from './types/lesson.types';
export * from './utils/lessonFilters';

// 특정 컴포넌트만 export (캡슐화)
export { LearningContent } from './components/LearningContent';
export { LessonList } from './components/LessonList';
```

### Feature 모듈 사용 예시

```typescript
// pages/student/LearningPage.tsx
import { learningService, LessonList } from '@/features/learning';
import type { Lesson } from '@/features/learning/types/lesson.types';

export default function LearningPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const loadLessons = async () => {
      const data = await learningService.getLessons();
      setLessons(data);
    };
    loadLessons();
  }, []);

  return <LessonList lessons={lessons} />;
}
```

---

## 상태 관리 아키텍처

### 1. 전역 상태 (Context API)

**사용 시기**:
- 여러 컴포넌트에서 공유하는 상태
- 인증 정보, 테마, 폰트 등

**구현 패턴**:
```typescript
// contexts/ThemeContext.tsx
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

### 2. 서버 상태 (React Query)

**사용 시기**:
- 서버에서 가져온 데이터
- 캐싱, 리페칭, 낙관적 업데이트가 필요한 경우

**구현 예시**:
```typescript
// features/class/hooks/useClass.ts
import { useQuery } from '@tanstack/react-query';
import { classService } from '../services/classService';

export const useClass = () => {
  const { data: classes, isLoading, error } = useQuery({
    queryKey: ['classes'],
    queryFn: () => classService.getClasses(),
    staleTime: 5 * 60 * 1000, // 5분
  });

  return { classes, isLoading, error };
};
```

### 3. 로컬 상태 (useState)

**사용 시기**:
- 컴포넌트 내부에서만 사용하는 상태
- 폼 입력, UI 토글 등

**구현 예시**:
```typescript
const [isOpen, setIsOpen] = useState(false);
const [inputValue, setInputValue] = useState('');
```

### 4. 폼 상태 (React Hook Form)

**사용 시기**:
- 복잡한 폼 관리
- Validation이 필요한 경우

**구현 예시**:
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

---

## API 통신 레이어

### 아키텍처

```
컴포넌트/Hook
  ↓
Feature Service (learningService, authService 등)
  ↓
Axios Client (axiosClient)
  ↓ (Request Interceptor)
  - 토큰 주입
  - 요청 로깅
  ↓
Backend API
  ↓ (Response Interceptor)
  - 토큰 갱신 (401)
  - 에러 처리
  ↓
컴포넌트/Hook
```

### 1. Axios Client 설정

```typescript
// api/client/axiosClient.ts
import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '@/constants/api';
import {
  requestInterceptor,
  requestErrorHandler,
  responseInterceptor,
  responseErrorHandler,
} from '@/api/interceptors/authInterceptor';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,         // http://localhost:8080/api
  timeout: API_TIMEOUT,           // 10000ms
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터 등록
axiosClient.interceptors.request.use(requestInterceptor, requestErrorHandler);
axiosClient.interceptors.response.use(
  responseInterceptor,
  (error) => responseErrorHandler(error, axiosClient)
);

export default axiosClient;
```

### 2. Request Interceptor

```typescript
// api/interceptors/authInterceptor.ts
export const requestInterceptor = (config) => {
  // 1. 토큰 주입
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 2. 요청 로깅 (dev 환경)
  if (import.meta.env.DEV) {
    console.log('API Request:', config.method, config.url);
  }

  return config;
};
```

### 3. Response Interceptor

```typescript
export const responseErrorHandler = async (error, axiosClient) => {
  const originalRequest = error.config;

  // 1. 401 Unauthorized (토큰 만료)
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      // Refresh Token으로 새 토큰 발급
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axiosClient.post('/auth/refresh', { refreshToken });

      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);

      // 원래 요청 재시도
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosClient(originalRequest);
    } catch (refreshError) {
      // Refresh 실패 → 로그아웃
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }

  // 2. 기타 에러
  if (error.response) {
    // Toast 에러 메시지
    const message = error.response.data?.message || '요청 실패';
    toast.error(message);
  }

  return Promise.reject(error);
};
```

### 4. Feature Service 예시

```typescript
// features/learning/services/learningService.ts
import axiosClient from '@/api/client/axiosClient';

export const learningService = {
  // 시나리오 조회
  getScenario: async (week: number, email: string) => {
    const response = await axiosClient.get(`/scenarios/${week}`, {
      params: { email }
    });
    return response.data;
  },

  // 문법 DB 조회
  getSyntaxDatabase: async () => {
    const response = await axiosClient.get('/syntax-db');
    return response.data;
  },

  // 레슨 목록 조회
  getLessons: async (classId: string) => {
    const response = await axiosClient.get(`/classes/${classId}/lessons`);
    return response.data;
  },
};
```

---

## 라우팅 구조

### 라우트 계층

```
/                               # 랜딩 페이지
├── /login                      # 로그인
├── /register                   # 회원가입 선택
│   └── /student/signup         # 학생 회원가입
├── /verify-email               # 이메일 인증
│
├── /student                    # 학생 영역
│   ├── /dashboard             # 과목 대시보드
│   ├── /study                 # 학습 페이지 (메인)
│   ├── /course/:classId/planner  # 주차별 플래너
│   └── /qna                   # Q&A
│
├── /professor                  # 교수 영역
│   ├── /dashboard             # 교수 대시보드
│   ├── /class-management      # 수업 관리
│   │   ├── /create           # 수업 생성
│   │   └── /:id              # 수업 상세
│   └── /students              # 학생 관리
│
└── /admin                      # 관리자 영역
    ├── /dashboard             # 관리자 대시보드
    ├── /users                 # 사용자 관리
    ├── /classes               # 수업 관리
    ├── /curricula             # 커리큘럼 관리
    │   ├── /create           # 커리큘럼 생성
    │   ├── /:id/detail       # 커리큘럼 상세
    │   └── /:id/edit         # 커리큘럼 편집
    ├── /analytics             # 분석
    ├── /logs                  # 로그
    └── /settings              # 시스템 설정
```

### 라우트 정의 (App.tsx)

```typescript
<Routes>
  {/* 인증 페이지 */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/student/signup" element={<StudentSignupPage />} />
  <Route path="/verify-email" element={<VerifyEmailPage />} />

  {/* 학생 페이지 */}
  <Route path="/student/study" element={<AppContent />} />
  <Route path="/student/dashboard" element={<StudentDashboard />} />
  <Route path="/student/course/:classId/planner" element={<LearningPage />} />
  <Route path="/student/qna" element={<QnaPage />} />

  {/* 교수 페이지 */}
  <Route path="/professor/dashboard" element={<ProfessorDashboardPage />} />
  <Route path="/professor/class-management" element={<ClassManagementPage />} />
  <Route path="/professor/class-management/:id" element={<ClassDetailPage />} />
  <Route path="/professor/class-management/create" element={<CreateClassPage />} />
  <Route path="/professor/students" element={<StudentsPage />} />

  {/* 관리자 페이지 */}
  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
  <Route path="/admin/users" element={<UserManagementPage />} />
  <Route path="/admin/classes" element={<ClassManagementPage />} />
  <Route path="/admin/curricula" element={<CurriculumManagementPage />} />
  <Route path="/admin/curricula/create" element={<CreateCurriculumPage />} />
  <Route path="/admin/curricula/:id/detail" element={<CurriculumDetailPage />} />
  <Route path="/admin/curricula/:id/edit" element={<EditCurriculumPage />} />
  <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
  <Route path="/admin/logs" element={<AdminLogsPage />} />
  <Route path="/admin/settings" element={<SystemSettingsPage />} />

  {/* 공통 페이지 */}
  <Route path="/settings" element={<SettingsPage />} />
  <Route path="/progress" element={<ProgressPage />} />

  {/* 404 */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

### 라우트 상수 사용

```typescript
// constants/routes.ts
export const ROUTES = {
  LANDING: '/',
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/register',
    STUDENT_SIGNUP: '/student/signup',
    VERIFY_EMAIL: '/verify-email',
  },
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    LEARNING: '/student/study',
    QNA: '/student/qna',
  },
  PROFESSOR: {
    DASHBOARD: '/professor/dashboard',
    CLASS_MANAGEMENT: '/professor/class-management',
    CREATE_CLASS: '/professor/class-management/create',
    STUDENTS: '/professor/students',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USER_MANAGEMENT: '/admin/users',
    CLASS_MANAGEMENT: '/admin/classes',
    CURRICULUM_MANAGEMENT: '/admin/curricula',
    CREATE_CURRICULUM: '/admin/curricula/create',
    CURRICULUM_DETAIL: '/admin/curricula/:id/detail',
    EDIT_CURRICULUM: '/admin/curricula/:id/edit',
    ANALYTICS: '/admin/analytics',
    LOGS: '/admin/logs',
    SETTINGS: '/admin/settings',
  },
  COMMON: {
    SETTINGS: '/settings',
    PROGRESS: '/progress',
  },
};

// 사용
import { ROUTES } from '@/constants/routes';
navigate(ROUTES.STUDENT.DASHBOARD);
```

---

## 요약

### 핵심 설계 원칙

1. **관심사의 분리 (Separation of Concerns)**
   - API 레이어, 비즈니스 로직, UI가 명확히 분리

2. **단방향 데이터 흐름**
   - 상위 레이어 → 하위 레이어로만 의존

3. **Feature 기반 아키텍처**
   - 도메인별로 기능을 독립적으로 구성

4. **재사용성**
   - 공통 컴포넌트, Hooks, 유틸리티를 통한 코드 재사용

5. **타입 안정성**
   - TypeScript로 모든 데이터 타입 정의

6. **확장 가능성**
   - 새로운 Feature 추가가 용이한 구조

### 주요 데이터 흐름

```
사용자 입력
  → Page 컴포넌트
    → Feature Hook
      → Feature Service
        → Axios Client
          → Backend API
            → Response Interceptor
              → Context 업데이트
                → 컴포넌트 리렌더링
```

### 폴더별 핵심 역할

| 폴더 | 역할 | 의존성 |
|------|------|--------|
| `api/` | HTTP 통신 | constants, config |
| `contexts/` | 전역 상태 | types |
| `features/` | 도메인 기능 | api, contexts, types |
| `hooks/` | 재사용 로직 | features, contexts |
| `components/` | UI 컴포넌트 | contexts, types |
| `pages/` | 라우트 페이지 | features, components, hooks |
| `services/` | 비즈니스 로직 | api, types |
| `types/` | 타입 정의 | - |
| `constants/` | 상수 | - |
| `utils/` | 유틸리티 | - |

---

**작성일**: 2025-01-16
**버전**: 1.0.0
**관련 문서**:
- [FE_ARCHITECTURE_GUIDE.md](../codingguideline/FE_ARCHITECTURE_GUIDE.md)
- [FE_CODING_GUIDELINES.md](../codingguideline/FE_CODING_GUIDELINES.md)
- [README_MAIN.md](./README_MAIN.md)
