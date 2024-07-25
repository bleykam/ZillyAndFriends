module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:storybook/recommended', 'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { 
    ecmaVersion: 'latest', 
    sourceType: 'module',
    "ecmaFeatures": {
      "jsx": true
    }
   },
  settings: { react: { version: '18.2' } }
  ,
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  rules: {
    
  },
}
