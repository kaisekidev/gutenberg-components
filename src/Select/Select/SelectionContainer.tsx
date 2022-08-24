import {
  GetOptionLabel,
  GetOptionValue,
  MultiValue,
  OnChangeValue,
  RemoveValueActionMeta,
} from 'react-select';
import styled from 'styled-components';

import Token from './Token.js';

import type { Schema } from '@wordpress/core-data';

interface ContainerProps {
  withOneTokenPerLine?: boolean;
  withFullWidthTokens?: boolean;
}

interface SelectionContainerProps<Option = unknown> extends ContainerProps {
  value: MultiValue<Option>;
  onRemove: (options: OnChangeValue<Option, true>, action: RemoveValueActionMeta<Option>) => void;
  getOptionLabel: GetOptionLabel<Option>;
  getOptionValue: GetOptionValue<Option>;
}

const Container = styled.div<ContainerProps>`
  display: flex;

  flex-flow: ${(props) => (props.withOneTokenPerLine ? "column" : "row")};
  flex-wrap: ${(props) => (props.withOneTokenPerLine ? "nowrap" : "wrap")};

  margin-top: 8px;
  margin-bottom: 16px;

  max-height: 400px;

  overflow-y: auto;
  gap: ${(props) => (props.withOneTokenPerLine || props.withFullWidthTokens ? "8px" : "4px")};
`;

export default function SelectionContainer<Option = Schema.Post<'edit'>>({
  value,
  onRemove,
  withOneTokenPerLine,
  withFullWidthTokens,
  getOptionLabel,
  getOptionValue,
}: SelectionContainerProps<Option>) {
  if (value.length < 1) {
    return null;
  }
  return (
    <Container withOneTokenPerLine={withOneTokenPerLine}>
      {value.map((val) => (
        <Token<Option>
          key={getOptionValue(val)}
          value={val}
          label={getOptionLabel(val)}
          onClickRemove={(removeVal: Option) => {
            const filteredSelection = value.filter(
              (option) => getOptionValue(option) !== getOptionValue(removeVal),
            );
            onRemove(filteredSelection, { action: 'remove-value', removedValue: removeVal });
          }}
          grow={withFullWidthTokens}
        />
      ))}
    </Container>
  );
}
