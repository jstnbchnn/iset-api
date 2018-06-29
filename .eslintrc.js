module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
  ],
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
  },
  "rules": {
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "comma-dangle": ["error", {
      "objects": "never",
      "arrays": "never"
    }],
    "indent": ["error", 2],
    "prefer-destructuring": ["error", {
      "array": true,
      "object": true
    }],
    "arrow-spacing": ["error", { "before": true, "after": true }],
  }
}