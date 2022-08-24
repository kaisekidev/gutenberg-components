import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { SetOptional } from 'type-fest';

import { ALLOWED_MEDIA_TYPES } from './constants.js';

interface ReplaceImageButtonProps extends SetOptional<MediaUpload.Props<false>, 'render'> {
  label?: string;
}

export default function ReplaceImageButton({
  label,
  ...props
}: ReplaceImageButtonProps) {
  return (
    <MediaUploadCheck>
      <MediaUpload
        {...props}
        allowedTypes={ALLOWED_MEDIA_TYPES}
        render={({ open }) => (
          <Button
            onClick={open}
            isSecondary
          >
            {label ?? __('Replace image')}
          </Button>
        )}
      />
    </MediaUploadCheck>
  );
}
