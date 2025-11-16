import React from 'react';
import { IconProps } from './Icon.types';

const iconPaths: Record<IconProps['name'], string> = {
  search: 'M11 19c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-14c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm13.707 12.293l-3.414-3.414c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414l3.414 3.414c.39.39 1.023.39 1.414 0s.39-1.023 0-1.414z',
  close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  'arrow-right': 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
  'arrow-left': 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = '',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d={iconPaths[name]} />
    </svg>
  );
};


