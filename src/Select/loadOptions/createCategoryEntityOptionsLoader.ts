/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupBase } from 'react-select';

import createBaseWpRestOptionsLoader from './createBaseWpRestOptionsLoader.js';

import type { Schema } from '@wordpress/core-data';

const createCategoryEntityOptionsLoader = <
  Option extends Schema.BaseCategory,
  Group extends GroupBase<Option> = GroupBase<Option>,
  Additional = any,
>(
  queryArgs: Record<string, any> = {
    per_page: 10,
  },
  path = '/wp/v2/categories',
) => createBaseWpRestOptionsLoader<Option, Group, Additional>(path, queryArgs);

export default createCategoryEntityOptionsLoader;
