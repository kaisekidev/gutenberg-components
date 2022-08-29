/* eslint-disable @typescript-eslint/no-explicit-any */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { GroupBase } from 'react-select';
import { LoadOptions } from 'react-select-async-paginate';

const createBaseWpRestOptionsLoader = <
  Option = unknown,
  Group extends GroupBase<Option> = GroupBase<Option>,
  Additional = any,
>(
  path: string,
  queryArgs: Record<string, any> = {
    per_page: 10,
  },
) => {
  const loadOptions: LoadOptions<Option, Group, Additional> = async (search, prevOptions) => {
    const page = !prevOptions ? 1 : prevOptions.length / 10 + 1;
    const {
      options,
      pages,
    } = await apiFetch({
      path: addQueryArgs(path, {
        ...queryArgs,
        search,
        page,
      }),
      parse: false,
    }).then(async (response) => {
      if (!(response instanceof Response)) {
        return {
          options: [],
          total: 0,
          pages: 0,
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = (await response.json()) as Option[];

      const pageHeader = response.headers.get('X-WP-TotalPages');
      return {
        options: data,
        pages: pageHeader ? parseInt(pageHeader, 10) : 0,
      };
    });

    return {
      options,
      hasMore: page < pages,
    };
  };

  return loadOptions;
};

export default createBaseWpRestOptionsLoader;
