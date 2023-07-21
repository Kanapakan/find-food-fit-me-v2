module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react/no-unescaped-entities": ["error", { forbid: [">", "}", "/'"] }],
    "react/prop-types": "off",
    "no-unused-vars": "off",
    // enable additional rules
    "indent-size": [true, 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "semi"],
    "prettier/prettier": ["error", { singleQuote: true }],

    // override default options for rules from base configurations
    "comma-dangle": ["error", "always"],
    "no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    "no-console": "off",
  },
};
