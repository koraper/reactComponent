# 시작하기

## 설치

```bash
npm install react-component-library
# 또는
yarn add react-component-library
```

## 기본 사용법

```tsx
import { Button, SearchInput } from 'react-component-library';

function App() {
  return (
    <div>
      <Button variant="primary">클릭하세요</Button>
      <SearchInput placeholder="검색..." onSearch={(value) => console.log(value)} />
    </div>
  );
}
```

## Provider 설정

테마를 사용하려면 `ThemeProvider`로 앱을 감싸주세요:

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


