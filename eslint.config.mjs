import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
	{
		ignores: ["coverage/", "dist/", "node_modules/", "tests/", "tsconfig.json", "tsup.config.ts"]
	},
	js.configs.recommended,
	{
		files: ["**/*.ts"],
		plugins: {
			"@typescript-eslint": tsPlugin
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
			},
			globals: {
				...globals.node,
				...globals.es2021
			}
		},
		rules: {
			...tsPlugin.configs.recommended.rules
		}
	}
];
