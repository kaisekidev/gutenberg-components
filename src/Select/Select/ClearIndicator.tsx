import { closeSmall } from '@wordpress/icons';
import { components as C, ClearIndicatorProps, GroupBase } from 'react-select';

export default function ClearIndicator<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: ClearIndicatorProps<Option, IsMulti, Group>) {
  return (
    <div>
      <C.ClearIndicator {...props}>{closeSmall}</C.ClearIndicator>
    </div>
  );
}
