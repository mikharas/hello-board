module.exports = {
  parser: "babel-eslint",
  env: {
    "browser": true,
    "node": true
  },
  extends: "airbnb",
  rules: {
    "react/jsx-props-no-spreading": "off",

    // `js` and `jsx` are common extensions
    // `mjs` is for `universal-router` only, for now
    'import/extensions': [
      'error',
      'always',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        mjs: 'never',
      },
    ],

    // Allow js files to use jsx syntax, too
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],

    // Parens around params are not needed if there's only one input args
    'arrow-parens': [2, "as-needed", { "requireForBlockBody": true }],
  }
};
