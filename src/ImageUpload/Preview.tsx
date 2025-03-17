import { useEditorSettings } from '@kaiseki/gutenberg-hooks';
import { colors, variables } from '@kaiseki/gutenberg-styles';
import { isBlobURL } from '@wordpress/blob';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { DropZone, Button, Spinner, ResponsiveWrapper } from '@wordpress/components';
import { Schema } from '@wordpress/core-data';
import { useDispatch } from '@wordpress/data';
import { mediaUpload } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { SetOptional, SetRequired } from 'type-fest';

import { ALLOWED_MEDIA_TYPES } from './constants.js';
import { getMediaDetails } from './utils.js';

interface PreviewProps
  extends SetRequired<SetOptional<MediaUpload.Props<false>, 'render' | 'onSelect'>, 'value'> {
  onChange: (value: number) => void;
  media: Schema.BaseMedia<'edit'> | null;
  defaultSize?: 'thumbnail' | 'medium' | 'large' | 'full' | string;
  editOrUpdateLabel?: string;
  setLabel?: string;
}

const instructions = <p>{__('To edit this image, you need permissions to upload media.')}</p>;

const ERROR_NOTICE_ID = 'kaiseki-image-upload-component-error';

export default function Preview({
  value,
  onChange,
  media,
  defaultSize = 'thumbnail',
  editOrUpdateLabel,
  setLabel,
  ...props
}: PreviewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { maxUploadFileSize } = useEditorSettings();
  const {
    createErrorNotice,
    removeNotice,
  } = useDispatch('core/notices');
  const onDropImage = useCallback(
    (filesList: ArrayLike<File>) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      mediaUpload({
        allowedTypes: ALLOWED_MEDIA_TYPES,
        filesList,
        maxUploadFileSize,
        onFileChange([image]) {
          const {
            id,
            url,
          } = image || {};
          if (url && isBlobURL(url)) {
            setIsLoading(true);
            return;
          }
          if (id) {
            onChange(id);
          }
          setIsLoading(false);
        },
        onError(error) {
          removeNotice && removeNotice(ERROR_NOTICE_ID).catch(() => {});
          createErrorNotice
            && createErrorNotice(error, {
              id: ERROR_NOTICE_ID,
              isDismissible: false,
            }).catch(() => {});
        },
      });
    },
    [onChange],
  );

  const hasMedia = media !== null;
  const {
    mediaWidth,
    mediaHeight,
    mediaSourceUrl,
  } = getMediaDetails(media, defaultSize);

  return (
    <MediaUploadCheck fallback={instructions}>
      <MediaUpload
        {...props}
        onSelect={({ id }) => {
          onChange(id);
        }}
        value={value}
        allowedTypes={ALLOWED_MEDIA_TYPES}
        render={({ open }) => (
          <Container>
            <ImageButton
              hasImage={hasMedia}
              onClick={open}
              label={hasMedia ? editOrUpdateLabel ?? __('Edit or update the image') : undefined}
            >
              {hasMedia && mediaWidth && mediaHeight && (
                <ResponsiveWrapper
                  naturalWidth={mediaWidth}
                  naturalHeight={mediaHeight}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  isInline
                >
                  <img
                    src={mediaSourceUrl}
                    alt=""
                  />
                </ResponsiveWrapper>
              )}
              {isLoading && <StyledSpinner />}
              {!hasMedia && (setLabel ?? __('Set image'))}
            </ImageButton>
            <DropZone onFilesDrop={onDropImage} />
          </Container>
        )}
      />
    </MediaUploadCheck>
  );
}

const Container = styled.div`
  position: relative;

  margin-bottom: 1em;
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;

  margin-top: -9px;
  margin-left: -9px;
`;

// prettier-ignore
const ImageButton = styled(Button)<{
  hasImage?: boolean;
}>`
  display: block;

  width: 100%;

  padding: 0;

  box-shadow: 0 0 0 0 var(--wp-admin-theme-color);

  transition: all 0.1s ease-out;

  ${({ hasImage }) => hasImage ? `
    height: auto;

    &:not(:disabled):not([aria-disabled="true"]):focus {
      box-shadow: 0 0 0 4px var(--wp-admin-theme-color);
    }
  ` : `
    line-height: 20px;

    text-align: center;

    min-height: 90px;

    border-radius: ${variables.radiusBlockUi};

    padding: ${variables.gridUnit10} 0;

    background-color: ${colors.gray100};

    &:hover {
      color: ${colors.gray900};

      background: ${colors.gray300};
    }
  `}
`;
