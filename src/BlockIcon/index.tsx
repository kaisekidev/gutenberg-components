import { Icon } from '@wordpress/components';

import type { SVGProps } from 'react';
import type { SetRequired } from 'type-fest';

export type BlockIconProps = Icon.BaseProps<JSX.Element> & SVGProps<SVGSVGElement>;

export default function BlockIcon({
  icon,
  color = '#000',
  ...props
}: SetRequired<BlockIconProps, 'icon'>) {
  return (
    <Icon
      {...props}
      color={color}
      icon={icon}
    />
  );
}
