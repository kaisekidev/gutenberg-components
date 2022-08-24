import { colors, variables } from '@kaiseki/gutenberg-styles';
import React from 'react';
import styled from 'styled-components';

import BlockIcon, { BlockIconProps } from '../BlockIcon/index.js';

import type { Except } from 'type-fest';

export interface BlockWrapProps {
  label: string;
  icon?: JSX.Element;
  iconProps?: Except<BlockIconProps, 'icon'>;
  instructions?: string | React.ReactNode;
  children?: React.ReactNode;
}

export default function BlockWrap({
  label,
  icon,
  iconProps = {},
  instructions,
  children,
}: BlockWrapProps) {
  return (
    <Wrap>
      <Label>
        {icon && (
          <BlockIcon
            icon={icon}
            width={24}
            height={24}
            {...iconProps}
          />
        )}
        {label}
      </Label>
      <Content>
        {instructions && (
          <Instructions>
            {React.isValidElement(instructions) ? instructions : <p>{instructions}</p>}
          </Instructions>
        )}
        {children}
      </Content>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;

  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  position: relative;

  color: ${colors.gray900};

  text-align: left;

  margin: 0;

  width: 100%;
  min-height: 200px;

  border-radius: ${variables.radiusBlockUi};

  padding: 1em;

  outline: 1px solid transparent;

  box-shadow: inset 0 0 0 ${variables.borderWidth} ${colors.gray900};
  box-sizing: border-box;

  background-color: ${colors.white};
  -moz-font-smoothing: subpixel-antialiased;
`;

const Label = styled.div`
  display: flex;

  align-items: center;

  font-family: ${variables.defaultFont};
  font-size: 24px;
  font-weight: normal;

  margin-bottom: ${variables.gridUnit20};

  svg,
  .dashicon,
  .block-editor-block-icon {
    margin-right: 1ch;

    fill: currentColor;

    @media (forced-colors: active) {
      fill: canvastext;
    }
  }

  &:empty {
    display: none;
  }
`;

const Content = styled.div`
  font-family: ${variables.defaultFont};
  font-size: ${variables.defaultFontSize};

  width: 100%;
`;

const Instructions = styled.div`
  > * {
    margin-top: 0;
    margin-bottom: 1em;
  }
`;
