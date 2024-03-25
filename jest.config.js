/** @type {import('jest').Config} */
const config = {
	clearMocks: true,
	coverageDirectory: "coverage",
	coverageReporters: ["text", "html"],
	moduleFileExtensions: ["js", "ts"],
	rootDir: ".",
	roots: ["<rootDir>/tests"],
	testPathIgnorePatterns: ["coverage", "node_modules", "dist"],
	transform: {
		"\\.(ts)$": "ts-jest"
	}
};

module.exports = config;