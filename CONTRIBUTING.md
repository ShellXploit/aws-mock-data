# Contributing to AWS Mock Data

Thank you for considering contributing to AWS Mock Data! This document provides guidelines and information for contributors.

## Getting Started

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/aws-mock-data.git
   cd aws-mock-data
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Verify the setup by running tests:
   ```bash
   yarn test
   ```

5. Run the build to ensure everything compiles:
   ```bash
   yarn build
   ```

### Key Architecture Principles

- **Modular Design**: Each AWS service is organized in its own module
- **Type Safety**: Comprehensive TypeScript definitions for all interfaces
- **Separation of Concerns**: Helpers, constants, and utilities are clearly separated
- **Test Coverage**: Tests mirror the source structure for easy maintenance

## Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test improvements

### Commit Message Convention

This project uses [Conventional Commits](https://conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat: add support for refresh token generation
fix: handle edge case in key generation
docs: update API documentation for getCognitoTokens
```

### Development Commands

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run linting
yarn lint

# Format code
yarn pretty

# Check formatting
yarn pretty:check

# Build the project
yarn build

# Clean build artifacts
yarn clean
```

## Testing Guidelines

### Test Structure

- Tests are located in `tests/unit/` and mirror the `src/` directory structure
- Use descriptive test names that clearly indicate what is being tested
- Group related tests using `describe` blocks
- Use `it` for individual test cases

### Writing Tests

1. **Test Coverage**: Aim for high test coverage, especially for core functionality
2. **Test Independence**: Each test should be independent and not rely on other tests
3. **Mock External Dependencies**: Use mocks for external dependencies when appropriate
4. **Test Edge Cases**: Include tests for edge cases and error conditions

### Example Test Pattern

```typescript
import { awsServices, utils } from "../../../src";

describe("Cognito Token Generation", () => {
	let asymmetricKeys: ReturnType<typeof utils.getAsymmetricKeys>;

	beforeEach(() => {
		asymmetricKeys = utils.getAsymmetricKeys();
	});

	it("should generate valid tokens", () => {
		const tokens = awsServices.cognito.getCognitoTokens({
			asymmetricKeys,
			user: { emailId: "test@example.com" }
		});

		expect(tokens).toHaveProperty("id_token");
		expect(tokens).toHaveProperty("access_token");
		expect(typeof tokens.id_token).toBe("string");
	});
});
```

### Running Specific Tests

```bash
# Run a specific test file
yarn test cognito.test.ts

# Run tests matching a pattern
yarn test --testNamePattern="token generation"
```

## Code Style

### ESLint Configuration

This project uses ESLint with TypeScript support. Configuration is defined in the project root.

### Prettier Configuration

Code formatting is handled by Prettier. Run `yarn pretty` to format your code before committing.

### TypeScript Guidelines

1. **Strong Typing**: Avoid `any` types; use specific interfaces and types
2. **Export Types**: Export all types that might be useful to consumers
3. **Documentation**: Use JSDoc comments for public APIs
4. **Consistent Naming**: Use camelCase for functions/variables, PascalCase for types/interfaces

### File Organization

- One main export per file
- Group related interfaces and types together
- Import statements should be organized (external libraries first, then internal modules)
- Use barrel exports (`index.ts` files) to simplify imports

## Pull Request Process

### Before Submitting

1. **Run Tests**: Ensure all tests pass (`yarn test`)
2. **Run Linting**: Fix any linting issues (`yarn lint`)
3. **Format Code**: Ensure code is properly formatted (`yarn pretty`)
4. **Build Successfully**: Verify the project builds (`yarn build`)
5. **Update Documentation**: Update README.md or other docs if needed

### Pull Request Guidelines

1. **Clear Title**: Use a descriptive title following conventional commit format
2. **Detailed Description**: Explain what changes were made and why
3. **Link Issues**: Reference any related issues using `Fixes #issue-number`
4. **Small, Focused Changes**: Keep PRs focused on a single feature or fix
5. **Tests Included**: Include tests for new functionality or bug fixes

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added (if applicable)
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

## Release Process

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) for automated releases.

### How It Works

1. **Conventional Commits**: Commit messages determine the version bump type
2. **Automated Releases**: Releases are created automatically on merge to main
3. **Changelog Generation**: CHANGELOG.md is updated automatically
4. **NPM Publishing**: Packages are published to npm automatically

### Version Bumping

- `fix:` commits trigger patch releases (1.0.1)
- `feat:` commits trigger minor releases (1.1.0)
- `BREAKING CHANGE:` in commit body triggers major releases (2.0.0)

## Issue Reporting

### Bug Reports

When reporting bugs, please include:

1. **Clear Description**: What went wrong?
2. **Steps to Reproduce**: Minimal steps to reproduce the issue
3. **Expected Behavior**: What should have happened?
4. **Actual Behavior**: What actually happened?
5. **Environment**: Node.js version, npm/yarn version, OS
6. **Code Sample**: Minimal code that reproduces the issue

### Feature Requests

For feature requests, please include:

1. **Use Case**: Why is this feature needed?
2. **Proposed Solution**: How should it work?
3. **Alternatives Considered**: What other approaches were considered?
4. **Additional Context**: Any other relevant information

### Issue Templates

Use these labels when creating issues:
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be Respectful**: Treat all contributors with respect
- **Be Inclusive**: Welcome newcomers and different perspectives
- **Be Collaborative**: Work together to improve the project
- **Be Professional**: Maintain professional communication

## Getting Help

- **Documentation**: Check the README.md and this CONTRIBUTING.md
- **Issues**: Search existing issues or create a new one
- **Discussions**: Use GitHub Discussions for general questions

Thank you for contributing to AWS Mock Data! 🚀