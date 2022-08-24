import { Theme } from 'react-select';

const getReactSelectTheme: (theme: Theme) => Theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#ddd',
    primary50: '#66b0d6',
  },
});

export default getReactSelectTheme;
