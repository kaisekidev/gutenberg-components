import { colors, variables } from '@kaiseki/gutenberg-styles';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { noop } from 'lodash';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface TokenProps<Option = unknown> {
  value: Option;
  label: string | ReactNode;
  onClickRemove: (value: Option) => void;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  removeMessage?: string;
  grow?: boolean;
}

const sharedStyle = css`
  display: inline-block;

  min-width: unset;

  height: auto;

  background: ${colors.gray300};

  transition: all 0.2s cubic-bezier(0.4, 1, 0.4, 1);
`;

const Wrap = styled.span`
  display: flex;

  font-size: ${variables.defaultFontSize};

  color: ${colors.gray900};

  max-width: 100%;
`;

const Text = styled.span<{
  readonly grow?: boolean;
}>`
  line-height: 24px;
  white-space: nowrap;

  text-overflow: ellipsis;

  overflow: hidden;

  border-radius: 2px 0 0 2px;

  padding: 0 0 0 8px;

  ${sharedStyle}
  ${(props) =>
    props.grow
    && css`
      flex-grow: 1;
    `}
`;

const RemoveButton = styled(Button)`
  &.components-button {
    line-height: 10px;

    color: ${colors.gray900};

    overflow: initial;

    border-radius: 0 2px 2px 0;

    padding: 0 2px;
    cursor: pointer;
    ${sharedStyle}
    svg {
      width: 24px;
      height: 24px;
    }

    &:hover {
      color: var(--wp-admin-theme-color);
    }
  }
`;

export default function Token<Option = unknown>({
  value,
  label,
  onClickRemove,
  onMouseEnter = noop,
  onMouseLeave = noop,
  removeMessage = __('Remove item'),
  grow = false,
}: TokenProps<Option>) {
  const onClick = () => onClickRemove(value);
  return (
    <Wrap
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Text grow={grow}>
        <span>{label}</span>
      </Text>
      <RemoveButton
        icon={closeSmall}
        onClick={onClick}
        label={removeMessage}
      />
    </Wrap>
  );
}
