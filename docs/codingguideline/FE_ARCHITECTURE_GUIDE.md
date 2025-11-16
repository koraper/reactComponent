# EduVerse 프론트엔드 아키텍처 가이드라인

## 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [아키텍처 패턴](#아키텍처-패턴)
3. [폴더 구조](#폴더-구조)
4. [레이어별 구현 가이드](#레이어별-구현-가이드)
5. [상태 관리](#상태-관리)
6. [API 통신](#api-통신)
7. [라우팅](#라우팅)
8. [성능 최적화](#성능-최적화)
9. [배포 및 운영](#배포-및-운영)

---

## 프로젝트 개요

### 기술 스택

#### 핵심 프레임워크
- **React**: 19.1.1
- **TypeScript**: 5.9.3
- **Vite**: 7.1.7 (빌드 도구 및 개발 서버)

#### 상태 관리
- **React Query (TanStack Query)**: 5.90.6 - 서버 상태 관리
- **Context API**: 클라이언트 상태 관리 (AppContext, AuthContext, ThemeContext, FontContext)
- **React Hook Form**: 7.65.0 - 폼 상태 관리

#### 라우팅
- **React Router**: 7.9.4

#### 스타일링
- **Tailwind CSS**: 3.3.6 - 유틸리티 우선 CSS 프레임워크 (커스텀 테마 설정 포함)

#### API 통신
- **Axios**: 1.13.1 - HTTP 클라이언트
- **React Query**: 데이터 페칭 및 캐싱

#### 유틸리티
- **Zod**: 4.1.12 - 런타임 타입 검증 및 폼 유효성 검증
- **React Hook Form**: 폼 관리
- **@hookform/resolvers**: 5.2.2 - React Hook Form과 Zod 통합

#### 특수 기능 라이브러리
- **Monaco Editor**: 0.54.0 - 코드 에디터 (@monaco-editor/react 4.7.0)
- **Firebase**: 9.6.10 - 인증 및 데이터베이스
- **React Toastify**: 11.0.5 - 알림 메시지
- **Recharts**: 3.3.0 - 차트 및 데이터 시각화
- **QRCode.react**: 4.2.0 - QR 코드 생성
- **XLSX**: 0.18.5 - 엑셀 파일 처리
- **Lucide React**: 0.548.0 - 아이콘

#### 개발 도구
- **ESLint**: 9.36.0 - 코드 품질 검사
- **TypeScript ESLint**: 8.45.0 - TypeScript 린팅
- **Vitest**: 4.0.3 - 단위 테스트
- **Playwright**: 1.56.1 - 브라우저 테스트
- **Storybook**: 9.1.15 - 컴포넌트 개발 및 문서화

### 프로젝트 구조 개요

```
src/
├── api/                      # API 통신 계층
│   ├── client/              # API 클라이언트 설정 (axiosClient.ts)
│   ├── interceptors/        # 요청/응답 인터셉터 (authInterceptor.ts)
│   └── types/               # API 타입 정의
├── components/              # 재사용 가능한 컴포넌트
│   ├── common/              # 공통 컴포넌트 (Button, Input, ErrorBoundary, Toast 등)
│   ├── layout/              # 레이아웃 컴포넌트 (Header, Footer, Sidebar 등)
│   ├── Dashboard/           # 대시보드 컴포넌트
│   ├── Modals/              # 모달 컴포넌트
│   └── types/               # 컴포넌트 타입 정의
├── features/                # 기능별 모듈 (Feature-based)
│   ├── auth/                # 인증 기능
│   │   ├── components/      # 인증 관련 컴포넌트
│   │   ├── hooks/           # 인증 관련 훅
│   │   ├── services/        # 인증 API 서비스
│   │   └── types/           # 인증 타입
│   ├── learning/            # 학습 기능
│   │   ├── components/      # 학습 관련 컴포넌트
│   │   ├── hooks/           # 학습 관련 훅
│   │   ├── services/        # 학습 API 서비스
│   │   ├── types/           # 학습 타입
│   │   └── utils/           # 학습 유틸리티
│   ├── task/                # Task 기능
│   ├── lecture/             # 강의 기능
│   ├── curriculum/          # 커리큘럼 기능
│   ├── class/               # 클래스 기능
│   ├── student/             # 학생 기능
│   ├── professor/           # 교수 기능
│   ├── editor/              # 코드 에디터 기능
│   └── storage/             # 스토리지 기능
├── pages/                   # 페이지 컴포넌트
│   ├── auth/                # 인증 페이지 (Login, Register, Signup)
│   ├── student/             # 학생 페이지 (Dashboard, Learning, QnA)
│   ├── professor/           # 교수 페이지 (Dashboard, ClassManagement 등)
│   ├── admin/               # 관리자 페이지
│   ├── landing/             # 랜딩 페이지
│   ├── settings/            # 설정 페이지
│   └── progress/            # 진행 상황 페이지
├── hooks/                   # 공통 커스텀 훅
├── contexts/                # React Context (상태 관리)
│   ├── AppContext.tsx       # 앱 전역 상태
│   ├── AuthContext.tsx      # 인증 상태
│   ├── ThemeContext.tsx     # 테마 상태
│   └── FontContext.tsx      # 폰트 상태
├── services/                # 서비스 계층
│   ├── api.ts               # API 서비스 함수
│   ├── firebase.ts          # Firebase 서비스
│   ├── errorLogger.ts       # 에러 로깅 서비스
│   └── professor/           # 교수 관련 서비스
├── routes/                  # 라우트 설정
│   └── index.tsx            # 라우트 정의
├── utils/                   # 유틸리티 함수
├── constants/               # 상수 정의 (API, routes 등)
├── types/                   # 전역 타입 정의
│   └── api/                 # API 타입
├── config/                  # 설정 파일
├── assets/                  # 정적 리소스 (이미지, 폰트 등)
├── stories/                 # Storybook 스토리
├── test/                    # 테스트 파일
├── App.tsx                  # 메인 앱 컴포넌트
└── main.tsx                 # 앱 진입점
```

---

## 아키텍처 패턴

### 1. Feature-Based 아키텍처

프로젝트는 **Feature-Based 아키텍처**를 따릅니다.

#### 핵심 원칙
- **기능별 독립 모듈**: 각 기능은 독립적인 폴더로 구성
- **관심사 분리**: 컴포넌트, 훅, 서비스, 타입을 기능별로 그룹화
- **재사용성**: 공통 컴포넌트는 `components/` 폴더에 분리

#### Feature 구조 예시 (실제 프로젝트 구조)

**학습 기능 (features/learning/):**
```
features/learning/
├── components/              # Learning 관련 컴포넌트
│   ├── LearningContent.tsx
│   ├── LearningHeader.tsx
│   ├── CurriculumSidebar.tsx
│   ├── NavigationFooter.tsx
│   ├── CodeEditor.tsx
│   └── LessonFilterBar.tsx
├── hooks/                   # Learning 관련 훅
│   └── useLearning.ts
├── services/                # Learning API 서비스
│   └── learningService.ts
├── types/                   # Learning 타입
│   ├── curriculum.types.ts
│   ├── lesson.types.ts
│   ├── CodeEditor.types.ts
│   └── LearningContent.types.ts
├── utils/                   # Learning 유틸리티
│   └── lessonFilters.ts
└── index.ts                 # Public API

**Task 기능 (features/task/):**
features/task/
├── components/              # Task 관련 컴포넌트
│   └── TaskModals.tsx
├── types/                   # Task 타입
│   └── TaskModals.types.ts
└── index.ts                 # Public API

**인증 기능 (features/auth/):**
features/auth/
├── components/              # 인증 관련 컴포넌트
│   └── AuthForm.tsx
├── hooks/                   # 인증 관련 훅
│   └── useAuth.ts
├── services/                # 인증 API 서비스
│   └── authService.ts
└── types/                   # 인증 타입
    └── auth.types.ts
```

**주의사항:**
- Feature 크기에 따라 hooks, services, utils 폴더는 선택적으로 생성
- 각 Feature는 index.ts를 통해 외부에 노출할 API만 export
- 컴포넌트 간 의존성은 최소화하고, 필요시 props로 전달

### 2. 계층형 아키텍처 (Layered Architecture)

#### 계층 구조
```
┌─────────────────────────────────┐
│      Presentation Layer         │  ← 컴포넌트, 페이지
├─────────────────────────────────┤
│      Business Logic Layer       │  ← 커스텀 훅, 비즈니스 로직
├─────────────────────────────────┤
│      Data Access Layer          │  ← API 서비스, React Query
├─────────────────────────────────┤
│      Infrastructure Layer       │  ← API 클라이언트, 유틸리티
└─────────────────────────────────┘
```

#### 각 계층의 책임

**Presentation Layer (컴포넌트)**
- UI 렌더링
- 사용자 인터랙션 처리
- Props를 통한 데이터 수신

**Business Logic Layer (훅)**
- 비즈니스 로직 처리
- 상태 관리
- 데이터 변환

**Data Access Layer (서비스)**
- API 호출
- 데이터 페칭 및 캐싱
- 에러 처리

**Infrastructure Layer (인프라)**
- HTTP 클라이언트 설정
- 인터셉터 설정
- 유틸리티 함수

### 3. 컴포넌트 설계 원칙

#### 컴포넌트 분류

**Presentational Components (표현 컴포넌트)**
- Props를 통해서만 데이터 수신
- 상태를 가지지 않음 (또는 UI 상태만)
- 재사용 가능

**Container Components (컨테이너 컴포넌트)**
- 데이터 페칭 및 상태 관리
- 비즈니스 로직 포함
- Presentational 컴포넌트에 데이터 전달

---

## 폴더 구조

### 표준 폴더 구조

각 Feature는 다음 구조를 따릅니다:

```
features/{feature}/
├── components/              # Feature 관련 컴포넌트
│   ├── {Feature}List.tsx
│   ├── {Feature}Card.tsx
│   └── {Feature}Form.tsx
├── hooks/                   # Feature 관련 커스텀 훅
│   ├── use{Feature}.ts
│   └── use{Feature}List.ts
├── services/                # Feature API 서비스
│   └── {feature}Service.ts
├── types/                   # Feature 타입 정의
│   └── {feature}.types.ts
├── utils/                   # Feature 유틸리티
│   └── {feature}Utils.ts
└── index.ts                 # Public API (선택적)
```

### 폴더 네이밍 규칙

- **Feature명**: 소문자, 단수형 (예: `task`, `user`)
- **파일명**: PascalCase (컴포넌트), camelCase (유틸리티, 서비스)
- **폴더명**: 소문자, kebab-case 또는 camelCase

---

## 레이어별 구현 가이드

### 1. API Layer

#### API 클라이언트 설정

```typescript
// api/client/axiosClient.ts
import axios from 'axios';
import { getToken, removeToken } from '@/utils/auth';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
```

#### API 서비스 함수

```typescript
// api/services/taskService.ts
import axiosClient from '../client/axiosClient';
import { TaskResponse, TaskRequest } from '../types/task.types';

export const taskService = {
  // Task 목록 조회
  getTasks: async (): Promise<TaskResponse[]> => {
    const response = await axiosClient.get<TaskResponse[]>('/tasks');
    return response.data;
  },

  // Task 단일 조회
  getTask: async (id: number): Promise<TaskResponse> => {
    const response = await axiosClient.get<TaskResponse>(`/tasks/${id}`);
    return response.data;
  },

  // Task 생성
  createTask: async (data: TaskRequest): Promise<TaskResponse> => {
    const response = await axiosClient.post<TaskResponse>('/tasks', data);
    return response.data;
  },

  // Task 수정
  updateTask: async (id: number, data: TaskRequest): Promise<TaskResponse> => {
    const response = await axiosClient.put<TaskResponse>(`/tasks/${id}`, data);
    return response.data;
  },

  // Task 삭제
  deleteTask: async (id: number): Promise<void> => {
    await axiosClient.delete(`/tasks/${id}`);
  },
};
```

#### API 타입 정의

```typescript
// api/types/task.types.ts
export interface TaskResponse {
  taskId: number;
  cycleId: number;
  taskTitle: string;
  taskMode: 'ADVANCE' | 'EASY';
  configJson: string;
  orderNo: number;
  createDt: string;
  updateDt: string;
}

export interface TaskRequest {
  taskId: number;
  cycleId: number;
  curId: number;
  taskTitle: string;
  weekNo: number;
  taskMode?: 'ADVANCE' | 'EASY';
  configJson?: string;
  orderNo: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode?: string;
}
```

### 2. Service Layer (React Query)

#### React Query 훅

```typescript
// features/task/hooks/useTask.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/taskService';
import { TaskResponse, TaskRequest } from '@/api/types/task.types';

// Task 목록 조회
export const useTaskList = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getTasks,
  });
};

// Task 단일 조회
export const useTask = (id: number) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => taskService.getTask(id),
    enabled: !!id,
  });
};

// Task 생성
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskRequest) => taskService.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

// Task 수정
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaskRequest }) =>
      taskService.updateTask(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', variables.id] });
    },
  });
};

// Task 삭제
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
```

### 3. Component Layer

#### Presentational Component

```typescript
// features/task/components/TaskCard.tsx
import { TaskResponse } from '@/api/types/task.types';

interface TaskCardProps {
  task: TaskResponse;
  onEdit?: (task: TaskResponse) => void;
  onDelete?: (id: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{task.taskTitle}</h3>
      <p className="text-sm text-gray-500">Mode: {task.taskMode}</p>
      <div className="mt-4 flex gap-2">
        {onEdit && (
          <button
            onClick={() => onEdit(task)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            수정
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(task.taskId)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
};
```

#### Container Component

```typescript
// features/task/components/TaskList.tsx
import { useTaskList, useDeleteTask } from '../hooks/useTask';
import { TaskCard } from './TaskCard';
import { TaskResponse } from '@/api/types/task.types';

export const TaskList: React.FC = () => {
  const { data: tasks, isLoading, error } = useTaskList();
  const deleteTask = useDeleteTask();

  const handleDelete = async (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      await deleteTask.mutateAsync(id);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks?.map((task) => (
        <TaskCard
          key={task.taskId}
          task={task}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
```

### 4. Page Component

```typescript
// pages/TaskPage.tsx
import { TaskList } from '@/features/task/components/TaskList';
import { TaskForm } from '@/features/task/components/TaskForm';
import { Layout } from '@/components/layout/Layout';

export const TaskPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Task 관리</h1>
        <TaskForm />
        <TaskList />
      </div>
    </Layout>
  );
};
```

---

## 상태 관리

### 서버 상태 관리 (React Query)

#### React Query 설정 (App.tsx)

```typescript
// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5분
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <ThemeProvider>
              <FontProvider>
                {/* App Content */}
              </FontProvider>
            </ThemeProvider>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

### 클라이언트 상태 관리 (Context API)

EduVerse 프로젝트는 **Zustand 대신 Context API**를 사용하여 클라이언트 상태를 관리합니다.

#### 1. AuthContext (인증 상태)

```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 복원
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

#### 2. AppContext (앱 전역 상태)

```typescript
// contexts/AppContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';

interface AppState {
  currentModal: string | null;
  modalData: any;
  // 기타 앱 전역 상태
}

type AppAction =
  | { type: 'SET_MODAL'; payload: { modal: string; data?: any } }
  | { type: 'CLOSE_MODAL' };

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_MODAL':
      return {
        ...state,
        currentModal: action.payload.modal,
        modalData: action.payload.data,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        currentModal: null,
        modalData: null,
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    currentModal: null,
    modalData: null,
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
```

#### 3. ThemeContext (테마 상태)

```typescript
// contexts/ThemeContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

---

## API 통신

### API 응답 형식

백엔드 API는 다음 형식으로 응답합니다:

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode?: string;
}
```

### 에러 처리

```typescript
// api/client/errorHandler.ts
import { AxiosError } from 'axios';

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const response = error.response?.data;
    
    if (response?.message) {
      return response.message;
    }
    
    if (response?.errorCode) {
      return getErrorMessage(response.errorCode);
    }
    
    return '알 수 없는 오류가 발생했습니다.';
  }
  
  return '네트워크 오류가 발생했습니다.';
};

const getErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    '1000': '잘못된 입력값입니다',
    '2000': '인증이 필요합니다',
    '2001': '접근 권한이 없습니다',
    // ...
  };
  
  return errorMessages[errorCode] || '오류가 발생했습니다.';
};
```

---

## 라우팅

### React Router 설정 (v7.x)

EduVerse 프로젝트는 React Router 7.9.4를 사용하며, lazy loading을 통해 코드 스플리팅을 적용합니다.

```typescript
// routes/index.tsx
import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

// Lazy load pages (코드 스플리팅)
const LandingPage = lazy(() => import('@/pages/landing/LandingPage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const StudentSignupPage = lazy(() => import('@/pages/auth/StudentSignupPage'));
const VerifyEmailPage = lazy(() => import('@/pages/auth/VerifyEmailPage'));

// Student
const StudentDashboard = lazy(() => import('@/pages/student/StudentDashboard'));
const LearningPage = lazy(() => import('@/pages/student/LearningPage'));
const QnaPage = lazy(() => import('@/pages/student/QnaPage'));

// Professor
const ProfessorDashboardPage = lazy(() => import('@/pages/professor/ProfessorDashboardPage'));
const ClassManagementPage = lazy(() => import('@/pages/professor/ClassManagementPage'));
const CreateClassPage = lazy(() => import('@/pages/professor/CreateClassPage'));
const ClassDetailPage = lazy(() => import('@/pages/professor/ClassDetailPage'));

// Admin
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'));
const UserManagementPage = lazy(() => import('@/pages/admin/UserManagementPage'));

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LANDING} element={<LandingPage />} />
      <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.AUTH.SIGNUP} element={<RegisterPage />} />
      <Route path={ROUTES.AUTH.STUDENT_SIGNUP} element={<StudentSignupPage />} />
      <Route path={ROUTES.AUTH.VERIFY_EMAIL} element={<VerifyEmailPage />} />

      {/* Student Routes */}
      <Route path={ROUTES.STUDENT.DASHBOARD} element={<StudentDashboard />} />
      <Route path={ROUTES.STUDENT.LEARNING} element={<LearningPage />} />
      <Route path={ROUTES.STUDENT.QNA} element={<QnaPage />} />

      {/* Professor Routes */}
      <Route path={ROUTES.PROFESSOR.DASHBOARD} element={<ProfessorDashboardPage />} />
      <Route path={ROUTES.PROFESSOR.CLASS_MANAGEMENT} element={<ClassManagementPage />} />
      <Route path={ROUTES.PROFESSOR.CREATE_CLASS} element={<CreateClassPage />} />
      <Route path="/professor/class/:id" element={<ClassDetailPage />} />

      {/* Admin Routes */}
      <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboardPage />} />
      <Route path={ROUTES.ADMIN.USER_MANAGEMENT} element={<UserManagementPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
    </Routes>
  );
};
```

### App.tsx에서 라우팅 사용

```typescript
// App.tsx
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <ThemeProvider>
              <FontProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <AppRoutes />
                </Suspense>
              </FontProvider>
            </ThemeProvider>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

### 라우트 상수 정의

```typescript
// constants/routes.ts
export const ROUTES = {
  LANDING: '/',
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    STUDENT_SIGNUP: '/signup/student',
    VERIFY_EMAIL: '/verify-email',
  },
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    LEARNING: '/student/learning',
    QNA: '/student/qna',
  },
  PROFESSOR: {
    DASHBOARD: '/professor/dashboard',
    CLASS_MANAGEMENT: '/professor/classes',
    CREATE_CLASS: '/professor/classes/create',
    STUDENTS: '/professor/students',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USER_MANAGEMENT: '/admin/users',
    CLASS_MANAGEMENT: '/admin/classes',
    CURRICULUM_MANAGEMENT: '/admin/curriculum',
    SETTINGS: '/admin/settings',
    ANALYTICS: '/admin/analytics',
    LOGS: '/admin/logs',
    CREATE_CURRICULUM: '/admin/curriculum/create',
    CURRICULUM_DETAIL: '/admin/curriculum/:id',
    EDIT_CURRICULUM: '/admin/curriculum/:id/edit',
  },
  COMMON: {
    PROGRESS: '/progress',
    SETTINGS: '/settings',
  },
} as const;
```

---

## 성능 최적화

### 코드 스플리팅

```typescript
// routes/index.tsx
import { lazy } from 'react';

const TaskPage = lazy(() => import('@/pages/TaskPage'));
const UserPage = lazy(() => import('@/pages/UserPage'));
```

### 메모이제이션

```typescript
import { memo, useMemo, useCallback } from 'react';

// 컴포넌트 메모이제이션
export const TaskCard = memo<TaskCardProps>(({ task, onEdit, onDelete }) => {
  // ...
});

// 값 메모이제이션
const sortedTasks = useMemo(() => {
  return tasks?.sort((a, b) => a.orderNo - b.orderNo);
}, [tasks]);

// 함수 메모이제이션
const handleEdit = useCallback((task: TaskResponse) => {
  onEdit?.(task);
}, [onEdit]);
```

### 이미지 최적화

```typescript
// Lazy loading
<img src={imageUrl} loading="lazy" alt="Task image" />

// Next.js Image 컴포넌트 사용 (Next.js 사용 시)
import Image from 'next/image';
<Image src={imageUrl} alt="Task image" width={500} height={300} />
```

---

## 배포 및 운영

### 환경 변수

```env
# .env.development
VITE_API_BASE_URL=http://localhost:8080/api/v1

# .env.production
VITE_API_BASE_URL=https://api.eduverse.com/api/v1
```

### Vite 빌드 설정

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  server: {
    port: 3001,
    // Spring Boot 백엔드 프록시 설정 (필요시)
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          firebase: ['firebase'],
          editor: ['@monaco-editor/react', 'monaco-editor'],
        },
      },
    },
  },
  test: {
    // Vitest 설정
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
```

### TypeScript Path Alias 설정

```json
// tsconfig.app.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@services/*": ["./src/services/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"],
      "@store/*": ["./src/store/*"],
      "@assets/*": ["./src/assets/*"]
    }
  }
}
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest --config vitest.config.unit.ts",
    "test:ui": "vitest --ui --config vitest.config.unit.ts",
    "test:coverage": "vitest run --coverage --config vitest.config.unit.ts",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

### 에러 바운더리

```typescript
// components/common/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>에러가 발생했습니다. 페이지를 새로고침해주세요.</div>;
    }

    return this.props.children;
  }
}
```

---

## 참고 자료

### 핵심 패턴
- **Feature-Based Architecture**: 기능별 모듈화
- **Container/Presentational Pattern**: 컴포넌트 분리
- **Custom Hooks**: 비즈니스 로직 추상화
- **React Query**: 서버 상태 관리

### 주요 라이브러리
- **React Query**: 데이터 페칭 및 캐싱
- **React Router**: 라우팅
- **Axios**: HTTP 클라이언트
- **Context API**: 클라이언트 상태 관리 (Zustand 미사용)
- **React Hook Form**: 폼 관리
- **Firebase**: 인증 및 데이터베이스
- **Monaco Editor**: 코드 에디터
- **Storybook**: 컴포넌트 개발 및 문서화
- **Vitest + Playwright**: 테스트

---

## EduVerse 특화 기능

### 1. Firebase 통합

Firebase는 인증 및 실시간 데이터베이스로 사용됩니다.

```typescript
// services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### 2. Monaco Editor (코드 에디터)

학습 콘텐츠에서 코드 편집 기능을 제공합니다.

```typescript
// features/editor/CodeEditor.tsx
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: 'vs-dark' | 'light';
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  theme = 'vs-dark',
}) => {
  return (
    <Editor
      height="400px"
      language={language}
      theme={theme}
      value={value}
      onChange={(newValue) => onChange(newValue || '')}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
      }}
    />
  );
};
```

### 3. Storybook 통합

컴포넌트 개발 및 문서화를 위해 Storybook을 사용합니다.

**실행 방법:**
```bash
npm run storybook
```

**스토리 작성 예시:**
```typescript
// src/stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/common/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};
```

### 4. 알림 시스템 (React Toastify)

사용자에게 알림을 표시하기 위해 React Toastify를 사용합니다.

```typescript
// App.tsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      {/* ... */}
    </>
  );
}

// 사용 예시
import { toast } from 'react-toastify';

toast.success('성공적으로 저장되었습니다!');
toast.error('오류가 발생했습니다.');
toast.info('알림 메시지입니다.');
```

### 5. 차트 (Recharts)

데이터 시각화를 위해 Recharts를 사용합니다.

```typescript
// components/Dashboard/ProgressChart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ProgressChartProps {
  data: Array<{ date: string; progress: number }>;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="progress" stroke="#8884d8" />
    </LineChart>
  );
};
```

### 6. 테스트 전략

**단위 테스트 (Vitest):**
```typescript
// src/utils/__tests__/dateUtils.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from '../dateUtils';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-01');
    expect(formatDate(date)).toBe('2024-01-01');
  });
});
```

**컴포넌트 테스트 (Storybook + Vitest):**
Storybook과 Vitest를 통합하여 컴포넌트 테스트를 수행합니다.

```bash
npm run test
npm run test:ui
npm run test:coverage
```

### 7. 에러 로깅

```typescript
// services/errorLogger.ts
export const logError = (error: Error, context?: Record<string, any>) => {
  console.error('Error:', error);
  console.error('Context:', context);

  // 프로덕션 환경에서는 외부 로깅 서비스로 전송
  if (import.meta.env.PROD) {
    // Sentry, LogRocket 등으로 전송
  }
};
```

---

## 개발 워크플로우

### 1. 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# Storybook 실행
npm run storybook
```

### 2. 코드 품질 관리

```bash
# ESLint 실행
npm run lint

# TypeScript 타입 체크
tsc --noEmit

# 테스트 실행
npm run test
```

### 3. 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

---

## 베스트 프랙티스

### 1. 컴포넌트 작성
- Props 타입을 명확하게 정의
- 재사용 가능한 컴포넌트는 `components/common`에 배치
- Feature 전용 컴포넌트는 해당 feature 폴더에 배치

### 2. 상태 관리
- 서버 상태는 React Query로 관리
- 클라이언트 전역 상태는 Context API로 관리
- 로컬 상태는 useState, useReducer 사용

### 3. 타입 정의
- API 응답 타입은 `api/types`에 정의
- Feature 전용 타입은 해당 feature의 `types` 폴더에 정의
- 전역 타입은 `src/types`에 정의

### 4. 에러 처리
- API 에러는 interceptor에서 공통 처리
- 컴포넌트 레벨 에러는 ErrorBoundary로 처리
- 사용자 친화적인 에러 메시지 표시

### 5. 성능 최적화
- lazy loading으로 코드 스플리팅
- React.memo, useMemo, useCallback 적절히 사용
- 이미지 최적화 및 lazy loading

---

