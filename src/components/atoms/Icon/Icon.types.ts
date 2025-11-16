import { SVGProps } from 'react';

export type IconName = 'search' | 'close' | 'arrow-right' | 'arrow-left';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}


