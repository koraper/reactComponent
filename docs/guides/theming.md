# 테마 설정

컴포넌트 라이브러리는 커스터마이징 가능한 테마 시스템을 제공합니다.

## 기본 테마 사용

```tsx
import { ThemeProvider } from 'react-component-library';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

## 커스텀 테마

```tsx
import { ThemeProvider } from 'react-component-library';

const customTheme = {
  colors: {
    primary: '#your-color',
    // ...
  },
  spacing: {
    // ...
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```


