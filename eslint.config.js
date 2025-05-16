import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["node_modules", "dist", "build"], // ✅ Ignore patterns in its own block
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect", // ✅ tells eslint-plugin-react to auto-detect React version
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // ✅ turn off this outdated rule
      "react/prop-types": "off",
    },
    extends: ["js/recommended", pluginReact.configs.flat.recommended],
  },
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
]);
