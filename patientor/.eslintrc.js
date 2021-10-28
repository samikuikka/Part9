module.exports = {
  extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  plugins: ["@typescript-eslint", "react"],
  env: {
    browser: true,
    es6: true
  },
  rules: {
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/no-unused-vars": [
        "error", { "argsIgnorePattern": "^_" }
    ],
    "@typescript-eslint/no-explicit-any": 1,
    "no-case-declarations": 0,
    "react/prop-types": 0
  },
  settings: {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
        tsconfigRootDir: __dirname
      },
    }
  ]
}
