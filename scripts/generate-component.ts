#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

const componentName = process.argv[2];
const category = process.argv[3] || 'atoms'; // atoms, molecules, organisms, templates

if (!componentName) {
  console.error('컴포넌트 이름을 입력해주세요.');
  console.log('사용법: npm run generate:component ComponentName [category]');
  process.exit(1);
}

const componentDir = path.join(
  __dirname,
  '..',
  'src',
  'components',
  category,
  componentName
);

// 디렉토리 생성
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// 컴포넌트 파일 생성
const componentContent = `import React from 'react';
import styles from './${componentName}.module.css';

export interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  children,
  className = '',
}) => {
  return (
    <div className={\`\${styles.${componentName.toLowerCase()}} \${className}\`}>
      {children}
    </div>
  );
};
`;

// 타입 파일 생성
const typesContent = `export interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
}
`;

// CSS 파일 생성
const cssContent = `.${componentName.toLowerCase()} {
  /* 스타일을 여기에 작성하세요 */
}
`;

// 테스트 파일 생성
const testContent = `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName}>Test</${componentName}>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
`;

// Storybook 파일 생성
const storiesContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: '${category.charAt(0).toUpperCase() + category.slice(1)}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    children: '${componentName}',
  },
};
`;

// Index 파일 생성
const indexContent = `export { ${componentName} } from './${componentName}';
export type { ${componentName}Props } from './${componentName}.types';
`;

// 파일 작성
fs.writeFileSync(
  path.join(componentDir, `${componentName}.tsx`),
  componentContent
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.types.ts`),
  typesContent
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.module.css`),
  cssContent
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.test.tsx`),
  testContent
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.stories.tsx`),
  storiesContent
);
fs.writeFileSync(path.join(componentDir, 'index.ts'), indexContent);

console.log(`✅ ${componentName} 컴포넌트가 생성되었습니다!`);
console.log(`📁 위치: ${componentDir}`);


