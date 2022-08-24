import { GroupBase, StylesConfig } from 'react-select';

const getReactSelectStyles = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(): StylesConfig<Option, IsMulti, Group> => ({
  control: (provided, state) => ({
    ...provided,
    borderRadius: '2px',
    padding: '6px 8px',
    boxShadow: state.isFocused ? '0 0 0 1px var(--wp-admin-theme-color)' : 'none',
    border: state.isFocused ? '1px solid var(--wp-admin-theme-color)' : '1px solid #757575',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '2px',
    border: '1px solid #1e1e1e',
    margin: '8px 0',
    padding: '0',
    boxShadow: 'none',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '0',
    '& > li:hover': {
      backgroundColor: '#ddd',
    },
  }),
  input: (provided) => ({
    ...provided,
    margin: '0',
    padding: '0',
    '& input[type=text]': {
      borderRadius: '0',
      minHeight: 'initial',
    },
    '& input[type=text]:focus': {
      boxShadow: 'none',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0',
    gap: '4px',
  }),
  clearIndicator: (provided) => ({
    ...provided,
    padding: '0',
    color: '#757575',
    cursor: 'pointer',
    '&:hover': {
      color: '#1e1e1e',
    },
    '& svg': {
      width: '24px',
      height: '24px',
      fill: 'currentColor',
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '0',
    color: '#757575',
    cursor: 'pointer',
    '&:hover': {
      color: '#1e1e1e',
    },
    '& svg': {
      width: '24px',
      height: '24px',
      fill: 'currentColor',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: '#ddd',
    margin: '2px 4px',
  }),
  multiValue: (provided) => ({
    ...provided,
    margin: 0,
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    lineHeight: '24px',
    fontSize: '13px',
    padding: '0 0 0 8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#1e1e1e',
    padding: '0 2px',
    '&:hover': {
      color: 'var(--wp-admin-theme-color)',
      cursor: 'pointer',
      backgroundColor: 'transparent',
    },
    '& svg': {
      width: '24px',
      height: '24px',
      fill: 'currentColor',
    },
  }),
});

export default getReactSelectStyles;
