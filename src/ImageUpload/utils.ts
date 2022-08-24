import { Schema } from '@wordpress/core-data';

export const getMediaSourceUrlBySizeSlug = (
  media: Schema.BaseMedia<'edit'>,
  sizeSlug: string,
): string => media?.media_details?.sizes?.[sizeSlug]?.source_url || media?.source_url;

export const getMediaDetailsFromSize = (
  size: Schema.BaseMedia<'edit'>['media_details']['sizes'][0],
) => ({
  mediaWidth: size.width,
  mediaHeight: size.height,
  mediaSourceUrl: size.source_url,
});

export const getMediaDetails = (
  media: Schema.BaseMedia<'edit'> | null | undefined,
  sizeSlug: string,
) => {
  if (!media) {
    return {};
  }

  const size = media.media_details.sizes[sizeSlug];
  if (typeof size === 'object') {
    return getMediaDetailsFromSize(size);
  }

  if (sizeSlug !== 'medium') {
    const mediumSize = media.media_details.sizes['medium'];
    if (typeof mediumSize === 'object') {
      return getMediaDetailsFromSize(mediumSize);
    }
  }

  const fallbackSize = media.media_details.sizes['thumbnail'];
  if (typeof fallbackSize === 'object') {
    return getMediaDetailsFromSize(fallbackSize);
  }

  return {
    mediaWidth: media.media_details.width,
    mediaHeight: media.media_details.height,
    mediaSourceUrl: media.source_url,
  };
};
