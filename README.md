# React 컴포넌트 모음집

확장 가능하고 유지보수가 용이한 React 컴포넌트 라이브러리입니다.

## 📋 목차

- [특징](#특징)
- [설치](#설치)
- [사용법](#사용법)
- [프로젝트 구조](#프로젝트-구조)
- [개발](#개발)
- [기여하기](#기여하기)

## ✨ 특징

- 🎨 **Atomic Design 패턴**: 컴포넌트를 atoms, molecules, organisms, templates로 체계적으로 구성
- 📦 **TypeScript**: 완전한 타입 안정성 제공
- 🎭 **Storybook**: 컴포넌트 문서화 및 개발 환경
- 🧪 **테스트**: Jest와 React Testing Library를 사용한 테스트
- 🎯 **확장성**: 프로젝트가 커져도 유지보수가 용이한 구조
- 🎨 **테마 시스템**: 커스터마이징 가능한 테마 지원

## 📦 설치

```bash
npm install react-component-library
# 또는
yarn add react-component-library
```

## 🚀 사용법

### 기본 사용

```tsx
import { Button, SearchInput } from 'react-component-library';

function App() {
  return (
    <div>
      <Button variant="primary" size="md">
        클릭하세요
      </Button>
      <SearchInput 
        placeholder="검색..." 
        onSearch={(value) => console.log(value)} 
      />
    </div>
  );
}
```

### Provider 설정

```tsx
import { ThemeProvider } from 'react-component-library';

function App() {
  return (
    <ThemeProvider>
      {/* 앱 내용 */}
    </ThemeProvider>
  );
}
```

## 📁 프로젝트 구조

```
reactComponent/
├── src/
│   ├── components/          # 컴포넌트
│   │   ├── atoms/          # 원자 단위 컴포넌트
│   │   ├── molecules/      # 분자 단위 컴포넌트
│   │   ├── organisms/      # 유기체 단위 컴포넌트
│   │   └── templates/      # 템플릿
│   ├── hooks/              # 커스텀 훅
│   ├── utils/              # 유틸리티 함수
│   ├── types/              # TypeScript 타입
│   ├── constants/          # 상수
│   ├── styles/             # 스타일 시스템
│   ├── providers/          # Context Providers
│   └── config/             # 설정
├── stories/                # Storybook 스토리
├── docs/                   # 문서
├── tests/                  # 테스트
└── scripts/                # 스크립트
```

## 🛠 개발

### 개발 환경 설정

```bash
# 의존성 설치
npm install

# Storybook 실행
npm run dev

# 테스트 실행
npm test

# 린트 실행
npm run lint

# 빌드
npm run build
```

### 새 컴포넌트 생성

자동 생성 스크립트를 사용하여 새 컴포넌트를 생성할 수 있습니다:

```bash
npm run generate:component ComponentName [category]
```

예시:
```bash
npm run generate:component MyButton atoms
```

## 📚 컴포넌트

### Atoms
- **Button**: 다양한 variant와 size를 지원하는 버튼 컴포넌트
- **Icon**: SVG 아이콘 컴포넌트
- **Badge**: 배지 컴포넌트

### Molecules
- **SearchInput**: 검색 입력 컴포넌트
- **FormField**: 폼 필드 래퍼 컴포넌트

### Organisms
- **Header**: 헤더 컴포넌트
- **CardList**: 카드 리스트 컴포넌트

### Templates
- **PageLayout**: 페이지 레이아웃 템플릿

## 🎣 커스텀 훅

- `useToggle`: boolean 상태 토글 훅
- `useDebounce`: 디바운스 훅
- `useLocalStorage`: 로컬 스토리지 훅

## 🧪 테스트

```bash
# 테스트 실행
npm test

# 테스트 watch 모드
npm run test:watch
```

## 📖 문서

자세한 문서는 [docs](./docs/) 폴더를 참고하세요.

- [시작하기](./docs/guides/getting-started.md)
- [테마 설정](./docs/guides/theming.md)
- [기여하기](./docs/guides/contributing.md)

## 🤝 기여하기

프로젝트에 기여해주셔서 감사합니다! 기여 가이드는 [CONTRIBUTING.md](./docs/guides/contributing.md)를 참고하세요.

## 📄 라이선스

MIT
