/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupBase } from 'react-select';

import createBaseWpRestOptionsLoader from './createBaseWpRestOptionsLoader.js';

import type { Schema } from '@wordpress/core-data';

const createTagEntityOptionsLoader = <
  Option extends Schema.BaseTag,
  Group extends GroupBase<Option> = GroupBase<Option>,
  Additional = any,
>(
  path = '/wp/v2/tags',
  queryArgs: Record<string, any> = {
    per_page: 10,
  },
) => createBaseWpRestOptionsLoader<Option, Group, Additional>(path, queryArgs);

export default createTagEntityOptionsLoader;
