/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupBase } from 'react-select';

import createBaseWpRestOptionsLoader from './createBaseWpRestOptionsLoader.js';

import type { Schema } from '@wordpress/core-data';

const createUserEntityOptionsLoader = <
  Option extends Schema.BaseUser<'edit'>,
  Group extends GroupBase<Option> = GroupBase<Option>,
  Additional = any,
>(
  path = '/wp/v2/users',
  queryArgs: Record<string, any> = {
    per_page: 10,
  },
) => createBaseWpRestOptionsLoader<Option, Group, Additional>(path, queryArgs);

export default createUserEntityOptionsLoader;
