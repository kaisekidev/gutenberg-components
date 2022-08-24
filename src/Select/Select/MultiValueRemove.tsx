import { closeSmall } from '@wordpress/icons';
import { components as C, GroupBase, MultiValueRemoveProps } from 'react-select';

export default function MultiValueRemove<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: MultiValueRemoveProps<Option, IsMulti, Group>) {
  return (
    <div>
      <C.MultiValueRemove {...props}>{closeSmall}</C.MultiValueRemove>
    </div>
  );
}
