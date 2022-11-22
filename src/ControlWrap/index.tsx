import { colors, variables } from '@kaiseki/gutenberg-styles';
import styled from 'styled-components';

export interface ControlWrapProps {
  label?: string;
  help?: string | JSX.Element;
  children: React.ReactNode;
}

export default function ControlWrap({
  label,
  help,
  children,
}: ControlWrapProps) {
  return (
    <Wrap className="control-wrap">
      {label && <Label className="control-wrap__label">{label}</Label>}
      {children}
      {help && <Help className="control-wrap__help">{help}</Help>}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;

  &:not(:first-child) {
    margin-top: ${variables.gridUnit10};
  }

  &:not(:last-child) {
    margin-bottom: ${variables.gridUnit10};
  }
`;

const Label = styled.span`
  display: block;

  margin-bottom: ${variables.gridUnit10};
`;

const Help = styled.p`
  font-size: ${variables.helptextFontSize};

  color: ${colors.gray700};

  margin-top: ${variables.gridUnit10} !important;
  margin-bottom: 0;
`;
