/** @type {import('jest').Config} */
const config = {
	clearMocks: true,
	coverageDirectory: "coverage",
	coverageReporters: ["html", "cobertura"],
	moduleFileExtensions: ["js", "ts"],
	rootDir: ".",
	roots: ["<rootDir>/tests"],
	testPathIgnorePatterns: ["coverage", "node_modules", "dist"],
	transform: {
		"\\.(ts)$": "ts-jest"
	},
	coveragePathIgnorePatterns: ["src/constants", "src/types"]
};

module.exports = config;
