import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
	{
		ignores: ["coverage/", "dist/", "node_modules/", "tests/", "tsconfig.json", "tsup.config.ts"]
	},
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
			}
		},
		rules: {
			...tsPlugin.configs.recommended.rules
		}
	}
];
