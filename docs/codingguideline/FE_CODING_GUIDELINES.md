# EduVerse 프론트엔드 코딩 가이드라인

## 목차
1. [코딩 규칙 및 컨벤션](#코딩-규칙-및-컨벤션)
2. [TypeScript 사용 규칙](#typescript-사용-규칙)
3. [React 패턴](#react-패턴)
4. [에러 처리](#에러-처리)
5. [테스트 전략](#테스트-전략)
6. [코드 리뷰 체크리스트](#코드-리뷰-체크리스트)

---

## 코딩 규칙 및 컨벤션

### 네이밍 컨벤션

#### 컴포넌트명
- **PascalCase** 사용
- 명사 사용, 명확하고 구체적인 이름
- 파일명과 컴포넌트명 일치

```typescript
// 좋은 예
export const TaskList: React.FC = () => { };
export const TaskCard: React.FC = () => { };
export const UserProfile: React.FC = () => { };

// 나쁜 예
export const taskList = () => { };  // 소문자 시작
export const Task = () => { };       // 너무 일반적
export const TCard = () => { };     // 축약어 사용
```

#### 함수명 및 변수명
- **camelCase** 사용
- 동사로 시작 (함수), 명사 사용 (변수)
- 명확하고 간결한 이름

```typescript
// 좋은 예
const handleSubmit = () => { };
const fetchTasks = async () => { };
const taskList = useTaskList();
const isLoading = true;

// 나쁜 예
const submit = () => { };        // 동사 없음
const get = async () => { };     // 너무 모호함
const tasks = useTaskList();     // 함수명과 혼동
const loading = true;            // is 접두사 없음
```

#### 상수
- **UPPER_SNAKE_CASE** 사용
- `const` 선언
- 의미 있는 이름

```typescript
// 좋은 예
const API_BASE_URL = '/api/v1';
const MAX_RETRY_COUNT = 3;
const DEFAULT_PAGE_SIZE = 10;

// 나쁜 예
const apiUrl = '/api/v1';        // 소문자
const max = 3;                   // 의미 없음
const size = 10;                 // 너무 일반적
```

#### 타입 및 인터페이스
- **PascalCase** 사용
- `interface`는 `I` 접두사 없이 사용
- `type`은 구체적인 이름 사용

```typescript
// 좋은 예
interface TaskResponse {
  taskId: number;
  taskTitle: string;
}

type TaskStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

// 나쁜 예
interface ITaskResponse { }      // I 접두사 사용
type Status = string;            // 너무 일반적
```

### 파일 네이밍

#### 컴포넌트 파일
- **PascalCase** 사용
- 컴포넌트명과 파일명 일치

```
TaskList.tsx
TaskCard.tsx
UserProfile.tsx
```

#### 유틸리티 및 서비스 파일
- **camelCase** 사용

```
taskService.ts
authUtils.ts
dateHelpers.ts
```

#### 타입 파일
- **camelCase** 사용, `.types.ts` 접미사

```
task.types.ts
user.types.ts
api.types.ts
```

### 코드 스타일

#### 들여쓰기 및 공백
- **2칸 들여쓰기** 사용 (탭 사용 금지)
- 중괄호는 같은 줄에 시작
- 연산자 주변 공백

```typescript
// 좋은 예
const handleClick = () => {
  console.log('clicked');
};

if (isLoading) {
  return <div>Loading...</div>;
}

// 나쁜 예
const handleClick = () =>
{
  console.log('clicked');
}

if(isLoading){
  return <div>Loading...</div>
}
```

#### 임포트 순서
1. React 및 React 관련 라이브러리
2. Third-party 라이브러리
3. 내부 모듈 (절대 경로 - @ alias 사용)
4. 상대 경로 임포트
5. 스타일 및 타입 임포트

```typescript
// 좋은 예
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { taskService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { TaskCard } from '@/components/common/TaskCard';
import { TaskResponse } from '@/api/types/task.types';

import './TaskList.css';

// 나쁜 예
import './TaskList.css';
import { TaskResponse } from '@/api/types/task.types';
import { useState } from 'react';
import { taskService } from '@/services/api';
import axios from 'axios';
```

#### Path Alias 사용
프로젝트는 다음과 같은 path alias를 사용합니다:

```typescript
// vite.config.ts 설정
{
  "@": "./src",
  "@components": "./src/components",
  "@pages": "./src/pages",
  "@hooks": "./src/hooks",
  "@services": "./src/services",
  "@utils": "./src/utils",
  "@types": "./src/types",
  "@assets": "./src/assets"
}

// 사용 예시
import { Button } from '@components/common/Button';
import { useAuth } from '@hooks/useAuth';
import { formatDate } from '@utils/dateHelpers';
import { UserType } from '@types/user.types';
```

### 주석 및 문서화

#### JSDoc 주석
- 공개 함수 및 컴포넌트에 JSDoc 작성
- 복잡한 로직에 인라인 주석

```typescript
/**
 * Task 목록을 조회하는 커스텀 훅
 * 
 * @returns {Object} Task 목록 및 로딩 상태
 * @returns {TaskResponse[]} tasks - Task 목록
 * @returns {boolean} isLoading - 로딩 상태
 * @returns {Error | null} error - 에러 객체
 */
export const useTaskList = () => {
  // ...
};
```

#### 인라인 주석
- "왜"를 설명하는 주석 작성
- "무엇"을 설명하는 주석은 피함

```typescript
// 좋은 예
// N+1 문제 방지: 한 번의 쿼리로 모든 데이터 조회
const tasks = await taskService.getTasksWithDetails();

// 나쁜 예
// Task 목록을 가져온다
const tasks = await taskService.getTasks();
```

---

## TypeScript 사용 규칙

### 타입 정의

#### 명시적 타입 선언
- 함수 파라미터와 반환 타입 명시
- 복잡한 객체는 인터페이스로 정의

```typescript
// 좋은 예
interface TaskRequest {
  taskTitle: string;
  cycleId: number;
}

const createTask = async (data: TaskRequest): Promise<TaskResponse> => {
  // ...
};

// 나쁜 예
const createTask = async (data: any) => {
  // ...
};
```

#### 타입 추론 활용
- 간단한 변수는 타입 추론 활용
- 복잡한 타입은 명시적 선언

```typescript
// 좋은 예
const count = 0;  // number로 추론
const name = 'Task';  // string으로 추론

interface ComplexType {
  // ...
}
const complex: ComplexType = { /* ... */ };

// 나쁜 예
const count: number = 0;  // 불필요한 타입 선언
```

### any 사용 금지

```typescript
// 좋은 예
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // ...
};

// 나쁜 예
const handleChange = (event: any) => {
  // ...
};
```

### 타입 가드

```typescript
// 타입 가드 함수
const isTaskResponse = (data: unknown): data is TaskResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'taskId' in data &&
    'taskTitle' in data
  );
};

// 사용
if (isTaskResponse(data)) {
  console.log(data.taskId);  // 타입 안전
}
```

### 제네릭 활용

```typescript
// 좋은 예
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

const fetchData = async <T>(url: string): Promise<ApiResponse<T>> => {
  // ...
};

// 나쁜 예
interface ApiResponse {
  success: boolean;
  data: any;  // any 사용
  message: string;
}
```

---

## React 패턴

### 함수 컴포넌트

```typescript
// 좋은 예
interface TaskCardProps {
  task: TaskResponse;
  onEdit?: (task: TaskResponse) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  return (
    <div>
      <h3>{task.taskTitle}</h3>
      {onEdit && <button onClick={() => onEdit(task)}>수정</button>}
    </div>
  );
};

// 나쁜 예
export const TaskCard = ({ task, onEdit }) => {
  // 타입 없음
  return <div>{task.taskTitle}</div>;
};
```

### 커스텀 훅

```typescript
// 좋은 예
export const useTask = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => taskService.getTask(id),
    enabled: !!id,
  });

  return {
    task: data,
    isLoading,
    error,
  };
};

// 나쁜 예
export const useTask = (id: number) => {
  // 비즈니스 로직이 컴포넌트에 노출됨
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => taskService.getTask(id),
  });
};
```

### 조건부 렌더링

```typescript
// 좋은 예
{isLoading && <div>Loading...</div>}
{error && <div>Error: {error.message}</div>}
{tasks && tasks.length > 0 && (
  <div>
    {tasks.map((task) => (
      <TaskCard key={task.taskId} task={task} />
    ))}
  </div>
)}

// 나쁜 예
{isLoading ? <div>Loading...</div> : null}
{error ? <div>Error: {error.message}</div> : null}
```

### 리스트 렌더링

```typescript
// 좋은 예
{tasks?.map((task) => (
  <TaskCard key={task.taskId} task={task} />
))}

// 나쁜 예
{tasks?.map((task, index) => (
  <TaskCard key={index} task={task} />  // index를 key로 사용
))}
```

### 이벤트 핸들러

```typescript
// 좋은 예
const handleSubmit = useCallback(async (e: React.FormEvent) => {
  e.preventDefault();
  await createTask.mutateAsync(formData);
}, [createTask, formData]);

// 나쁜 예
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await createTask.mutateAsync(formData);
};  // 매번 새 함수 생성
```

---

## 에러 처리

### API 에러 처리

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
```

### React Query 에러 처리

```typescript
// 컴포넌트에서 에러 처리
const { data, error, isLoading } = useTaskList();

if (error) {
  return <ErrorMessage message={handleApiError(error)} />;
}
```

### 에러 바운더리

```typescript
// components/common/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // 에러 로깅 서비스에 전송
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>에러가 발생했습니다.</div>;
    }

    return this.props.children;
  }
}
```

### 폼 유효성 검증

```typescript
// Zod를 사용한 유효성 검증
import { z } from 'zod';

const taskSchema = z.object({
  taskTitle: z.string().min(1, '제목은 필수입니다'),
  cycleId: z.number().positive('Cycle ID는 양수여야 합니다'),
  orderNo: z.number().positive('순서는 양수여야 합니다'),
});

type TaskFormData = z.infer<typeof taskSchema>;

// React Hook Form과 함께 사용
const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
  resolver: zodResolver(taskSchema),
});
```

---

## 테스트 전략

### 컴포넌트 테스트 (Vitest)

```typescript
// __tests__/TaskCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskCard } from '../TaskCard';
import { TaskResponse } from '@/api/types/task.types';

const mockTask: TaskResponse = {
  taskId: 1,
  taskTitle: 'Test Task',
  cycleId: 1,
  taskMode: 'EASY',
  configJson: '{}',
  orderNo: 1,
  createDt: '2024-01-01',
  updateDt: '2024-01-01',
};

describe('TaskCard', () => {
  it('renders task title', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    render(<TaskCard task={mockTask} onEdit={onEdit} />);

    fireEvent.click(screen.getByText('수정'));
    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });
});
```

### 커스텀 훅 테스트 (Vitest)

```typescript
// __tests__/useTask.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { useTask } from '../useTask';
import { taskService } from '../services/taskService';

vi.mock('../services/taskService');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useTask', () => {
  it('fetches task data', async () => {
    const mockTask = { taskId: 1, taskTitle: 'Test Task' };
    vi.mocked(taskService.getTask).mockResolvedValue(mockTask);

    const { result } = renderHook(() => useTask(1), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockTask);
  });
});
```

### 유틸리티 함수 테스트 (Vitest)

```typescript
// utils/__tests__/dateHelpers.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate, parseDate } from '../dateHelpers';

describe('dateHelpers', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-01');
    expect(formatDate(date)).toBe('2024-01-01');
  });

  it('parses date string correctly', () => {
    const dateString = '2024-01-01';
    const parsed = parseDate(dateString);
    expect(parsed).toBeInstanceOf(Date);
  });
});
```

### 테스트 커버리지 목표
- **컴포넌트 테스트**: 주요 컴포넌트 80% 이상
- **커스텀 훅 테스트**: 모든 훅 100%
- **유틸리티 함수 테스트**: 90% 이상

---

## 코드 리뷰 체크리스트

### 아키텍처
- [ ] Feature-Based 구조를 따르는가?
- [ ] 계층 분리가 명확한가?
- [ ] 컴포넌트가 적절히 분리되어 있는가?

### 코딩 규칙
- [ ] 네이밍 컨벤션을 따르는가?
- [ ] TypeScript 타입이 적절히 사용되는가?
- [ ] any 타입을 사용하지 않는가?

### React 패턴
- [ ] 함수 컴포넌트를 사용하는가?
- [ ] 커스텀 훅이 적절히 활용되는가?
- [ ] 불필요한 리렌더링이 없는가?

### 성능
- [ ] 메모이제이션이 필요한 곳에 적용되었는가?
- [ ] 불필요한 API 호출이 없는가?
- [ ] 코드 스플리팅이 적용되었는가?

### 에러 처리
- [ ] 에러 처리가 적절한가?
- [ ] 사용자에게 명확한 에러 메시지를 보여주는가?
- [ ] 에러 바운더리가 설정되어 있는가?

### 접근성
- [ ] 시맨틱 HTML을 사용하는가?
- [ ] 키보드 네비게이션이 가능한가?
- [ ] ARIA 속성이 적절히 사용되는가?

### 테스트
- [ ] 단위 테스트가 작성되었는가?
- [ ] 테스트 커버리지가 충분한가?
- [ ] 테스트가 명확하고 이해하기 쉬운가?

### 문서화
- [ ] 복잡한 로직에 주석이 있는가?
- [ ] 컴포넌트 Props에 JSDoc이 있는가?
- [ ] README가 업데이트되었는가?

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
- **Zod**: 타입 검증
- **Firebase**: 인증 및 데이터베이스
- **Monaco Editor**: 코드 에디터
- **Storybook**: 컴포넌트 개발 및 문서화
- **Vitest + Playwright**: 테스트

### 베스트 프랙티스
- **컴포넌트는 작고 집중된 역할만 수행**
- **비즈니스 로직은 커스텀 훅으로 분리**
- **타입 안전성을 최대한 활용**
- **재사용 가능한 컴포넌트 작성**
- **성능 최적화를 고려한 코드 작성**

---

## EduVerse 특화 가이드

### Context API 사용 패턴

프로젝트는 전역 상태 관리를 위해 Context API를 사용합니다.

#### Context 생성

```typescript
// contexts/FeatureContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface FeatureContextType {
  value: string;
  setValue: (value: string) => void;
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export const FeatureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<string>('');

  return (
    <FeatureContext.Provider value={{ value, setValue }}>
      {children}
    </FeatureContext.Provider>
  );
};

// 커스텀 훅으로 export
export const useFeature = () => {
  const context = useContext(FeatureContext);
  if (!context) {
    throw new Error('useFeature must be used within FeatureProvider');
  }
  return context;
};
```

#### Context 사용

```typescript
// 컴포넌트에서 사용
import { useFeature } from '@/contexts/FeatureContext';

export const MyComponent: React.FC = () => {
  const { value, setValue } = useFeature();

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};
```

### Firebase 사용 가이드

#### Firebase 초기화

```typescript
// services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```

#### Firebase 인증

```typescript
// hooks/useFirebaseAuth.ts
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/services/firebase';

export const useFirebaseAuth = () => {
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { login, logout };
};
```

### Monaco Editor 사용 가이드

#### 기본 사용법

```typescript
// features/editor/CodeEditor.tsx
import Editor from '@monaco-editor/react';
import { useState } from 'react';

interface CodeEditorProps {
  initialValue?: string;
  language?: string;
  onChange?: (value: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue = '',
  language = 'javascript',
  onChange,
}) => {
  const [code, setCode] = useState(initialValue);

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value || '';
    setCode(newValue);
    onChange?.(newValue);
  };

  return (
    <Editor
      height="500px"
      language={language}
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};
```

### React Toastify 알림 패턴

```typescript
// utils/toast.ts
import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

export const showToast = {
  success: (message: string) => toast.success(message, defaultOptions),
  error: (message: string) => toast.error(message, defaultOptions),
  info: (message: string) => toast.info(message, defaultOptions),
  warning: (message: string) => toast.warning(message, defaultOptions),
};

// 사용 예시
import { showToast } from '@/utils/toast';

const handleSubmit = async () => {
  try {
    await saveData();
    showToast.success('성공적으로 저장되었습니다!');
  } catch (error) {
    showToast.error('저장에 실패했습니다.');
  }
};
```

### Storybook 작성 가이드

#### 컴포넌트 스토리 작성

```typescript
// stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/common/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
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

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Large Button',
  },
};
```

### Vitest 테스트 명령어

```bash
# 전체 테스트 실행
npm run test

# UI 모드로 테스트 실행
npm run test:ui

# 커버리지 확인
npm run test:coverage

# 특정 파일 테스트
npm run test -- TaskCard.test.tsx

# watch 모드
npm run test -- --watch
```

---

## 환경 변수 관리

### .env 파일 구조

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_FIREBASE_API_KEY=your-dev-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-dev-auth-domain
VITE_FIREBASE_PROJECT_ID=your-dev-project-id

# .env.production
VITE_API_BASE_URL=https://api.eduverse.com/api/v1
VITE_FIREBASE_API_KEY=your-prod-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-prod-auth-domain
VITE_FIREBASE_PROJECT_ID=your-prod-project-id
```

### 환경 변수 사용

```typescript
// constants/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
export const API_TIMEOUT = 10000;

// 타입 안전한 환경 변수 접근
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

