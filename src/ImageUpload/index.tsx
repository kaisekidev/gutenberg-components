import { useMedia } from '@kaiseki/gutenberg-hooks';
import styled from 'styled-components';

import Preview from './Preview.js';
import RemoveImageButton from './RemoveImageButton.js';
import ReplaceImageButton from './ReplaceImageButton.js';

export interface ImageUploadProps {
  value?: number;
  onChange: (value: number) => void;
  defaultSize?: 'thumbnail' | 'medium' | 'large' | 'full' | string;
  labels?: {
    removeImage?: string;
    replaceImage?: string;
    setImage?: string;
  };
}

export default function ImageUpload({
  value = 0,
  onChange,
  defaultSize = 'thumbnail',
  labels,
}: ImageUploadProps) {
  const {
    record: media,
    isResolving,
  } = useMedia(value);

  const {
    removeImage,
    replaceImage,
    setImage,
  } = labels || {};
  const hasMedia = media !== null;

  return (
    <Wrap>
      <Preview
        value={value}
        media={media}
        onChange={onChange}
        defaultSize={defaultSize}
      />
      {hasMedia && !isResolving && (
        <ReplaceImageButton
          title={setImage}
          label={replaceImage}
          onSelect={({ id }) => onChange(id)}
        />
      )}
      {hasMedia && (
        <RemoveImageButton
          label={removeImage}
          onClick={() => onChange(0)}
        />
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 0;

  .components-button + .components-button {
    display: block;

    margin-top: 1em;
  }

  .components-responsive-wrapper__content {
    width: auto;
    max-width: 100%;
  }
`;
