import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import next from '@next/eslint-plugin-next';
import imp from 'eslint-plugin-import';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,

  {
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      '@next/next': next,
      import: imp,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },

    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ignores: ['**/*.config.js'],
    rules: {
      'prettier/prettier': ['warn'],
      'object-curly-spacing': ['error', 'always'],
      'no-unused-vars': 'off',
      'no-console': 'warn',
      'no-non-null-asserted-optional-chain': 'off',
      'no-unsafe-optional-chaining': 'off',

      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-namespace': 'off',

      ...reactHooks.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...next.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'error',
    },
  },
];
