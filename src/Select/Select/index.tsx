/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupBase, MultiValue, RemoveValueActionMeta } from 'react-select';
import { AsyncPaginate, AsyncPaginateProps } from 'react-select-async-paginate';
import styled from 'styled-components';

import getReactSelectStyles from '../react-select-styles/getReactSelectStyles.js';
import getReactSelectTheme from '../react-select-styles/getReactSelectTheme.js';

import ClearIndicator from './ClearIndicator.js';
import DropdownIndicator from './DropdownIndicator.js';
import LoadingIndicator from './LoadingIndicator.js';
import MultiValueRemove from './MultiValueRemove.js';
import SelectionContainer from './SelectionContainer.js';

import type { SetRequired } from 'type-fest';

const Wrap = styled.div`
  margin-bottom: 8px;
`;

export interface SelectProps<
  Option = unknown,
  Group extends GroupBase<Option> = GroupBase<Option>,
  Additional = any,
  IsMulti extends boolean = false,
> extends SetRequired<
  AsyncPaginateProps<Option, Group, Additional, IsMulti>,
  'getOptionLabel' | 'getOptionValue' | 'onChange'
  > {
  path?: string;
  queryArgs?: Record<string, any>;
  withSelectionOutside?: IsMulti extends true ? boolean | undefined : never;
  withOneTokenPerLine?: IsMulti extends true ? boolean | undefined : never;
  withFullWidthTokens?: IsMulti extends true ? boolean | undefined : never;
}

export default function Select<
  Option = unknown,
  Group extends GroupBase<Option> = GroupBase<Option>,
  Additional = any,
  IsMulti extends boolean = false,
>(props: SelectProps<Option, Group, Additional, IsMulti>) {
  const {
    onChange,
    isMulti,
    withSelectionOutside,
    withOneTokenPerLine,
    withFullWidthTokens,
    debounceTimeout = 300,
    getOptionLabel,
    getOptionValue,
    value,
    styles,
    theme,
  } = props;
  return (
    <Wrap>
      <AsyncPaginate<Option, Group, Additional, IsMulti>
        {...props}
        styles={styles || getReactSelectStyles<Option, IsMulti, Group>()}
        theme={theme || getReactSelectTheme}
        debounceTimeout={debounceTimeout}
        controlShouldRenderValue={!isMulti || !withSelectionOutside}
        components={{
          ClearIndicator,
          DropdownIndicator,
          LoadingIndicator,
          MultiValueRemove,
        }}
      />
      {withSelectionOutside && isMulti && Array.isArray(value) && value.length > 0 && (
        <SelectionContainer<Option>
          value={value}
          onRemove={(removedVal, action) => {
            const onRemove = onChange as (
              options: MultiValue<Option>,
              action: RemoveValueActionMeta<Option>,
            ) => void;
            onRemove(removedVal, action);
          }}
          withFullWidthTokens={withFullWidthTokens}
          withOneTokenPerLine={withOneTokenPerLine}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
        />
      )}
    </Wrap>
  );
}
