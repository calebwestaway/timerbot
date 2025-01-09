import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: ["eslint.config.js", "dist"],
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  {
    languageOptions: {
      globals: globals.node,
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslintConfigPrettier,
];
