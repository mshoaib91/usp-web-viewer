module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "plugins": [
    "react"
  ],
  "extends":["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    }
  },
  "rules": {
    "eqeqeq": [
      "error",
      "always"
    ],
    "keyword-spacing": [
      2
    ],
    "no-extra-semi": [
      "error"
    ],
    "no-mixed-spaces-and-tabs": [
      "error"
    ],
    "semi": [
      "error",
      "always"
    ],
    "space-before-blocks": [
      "error",
      "always"
    ],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "never"
      }
    ],
    "space-in-parens": [
      "error",
      "never"
    ],
    "space-infix-ops": [
      "error"
    ],
    "no-console": 0
  }
};
