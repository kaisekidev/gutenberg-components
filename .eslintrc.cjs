module.exports = {
  extends: [
    'eslint-config-woda/typescript',
  ],
  rules: {
    'implicit-arrow-linebreak': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
    ],
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-shadow': 'error',
  },
};
