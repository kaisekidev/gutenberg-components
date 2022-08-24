import { chevronDown } from '@wordpress/icons';
import { components as C, DropdownIndicatorProps, GroupBase } from 'react-select';

export default function DropdownIndicator<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  return (
    <div>
      <C.DropdownIndicator {...props}>{chevronDown}</C.DropdownIndicator>
    </div>
  );
}
