# Contributing to AWS Mock Data

Thanks for your interest in contributing! This guide will help you get started quickly.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- Yarn v4.2.2
- Git

### Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/aws-mock-data.git
cd aws-mock-data

# Install dependencies
yarn install

# Run tests and build
yarn test && yarn build
````

## 💡 How to Contribute

### 1. Create a Branch

Use clear naming:

* `feat/my-feature`
* `fix/bug-description`
* `docs/update-readme`

### 2. Make Your Changes

Follow our coding standards:

* TypeScript with strong typing
* Lint: `yarn lint`
* Format: `yarn pretty`
* Tests: Add/modify unit tests in `tests/unit/`

### 3. Run Tests

```bash
yarn test         # Run all tests
yarn test --watch # Watch mode
```

### Project Structure

```
src/
├── awsServices/          # AWS service implementations
│   ├── cognito/          # Cognito-specific functionality
│   └── index.ts          # AWS services export
├── constants/            # Constant values and configurations
│   └── awsServices/      # Service-specific constants
├── helpers/              # Helper functions
│   └── cognito/          # Cognito helper functions
├── types/                # TypeScript type definitions
│   ├── awsServices/      # Service-specific types
│   ├── common/           # Shared types
│   ├── helpers/          # Helper function types
│   └── utils/            # Utility types
├── utils/                # Shared utility functions
└── index.ts              # Main library export
tests/
└── unit/                 # Unit tests mirroring src/ structure
```

### Key Architecture Principles

- **Modular Design**: Each AWS service is organized in its own module
- **Type Safety**: Comprehensive TypeScript definitions for all interfaces
- **Separation of Concerns**: Helpers, constants, and utilities are clearly separated
- **Test Coverage**: Tests mirror the source structure for easy maintenance


## ✅ Before Submitting a PR

* [ ] All tests pass (`yarn test`)
* [ ] Code is linted and formatted (`yarn lint && yarn pretty`)
* [ ] PR title follows [Conventional Commits](https://www.conventionalcommits.org/)
* [ ] Description explains what/why
* [ ] Related issue is linked (`Fixes #123`)

## 🧪 Testing Tips

* Tests live in `tests/unit/`, mirroring `src/`
* Use `describe` + `it` blocks
* Mock external dependencies when needed
* Cover edge cases

## 🔁 Release Process

We use **semantic-release**:

* `fix:` → patch
* `feat:` → minor
* `BREAKING CHANGE:` → major

Everything is automated, including changelogs and npm publishing.

## 🐞 Reporting Issues or Requesting Features

Please use the appropriate GitHub issue template:

- [Bug Report](https://github.com/ShellXploit/aws-mock-data/issues/new?template=bug-report.md)
- [Feature Request](https://github.com/ShellXploit/aws-mock-data/issues/new?template=feature-request.md)


## 🙌 Need Help?

* Check the README
* Open an issue
* Join the discussion tab

Thanks again for contributing to **AWS Mock Data**! 🚀