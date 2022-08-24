import { MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import styled from 'styled-components';

interface RemoveImageButtonProps {
  label?: string;
  onClick: () => void;
}

const StyledButton = styled(Button)`
  display: block;

  margin-top: 1em !important;
`;

export default function RemoveImageButton({
  label,
  onClick,
}: RemoveImageButtonProps) {
  return (
    <MediaUploadCheck>
      <StyledButton
        onClick={onClick}
        isLink
        isDestructive
        // className={!!imageId && media && !isResolving ? styles.ButtonBlock : ''}
      >
        {label}
      </StyledButton>
    </MediaUploadCheck>
  );
}
