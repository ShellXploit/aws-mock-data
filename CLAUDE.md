# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Building and Development
- `yarn build` - Build the project using tsup
- `yarn test` - Run Jest tests from the `tests/` directory
- `yarn lint` - Run ESLint on source code
- `yarn pretty` - Format code with Prettier
- `yarn pretty:check` - Check code formatting
- `yarn clean` - Clean build artifacts and dependencies

### Testing
- Tests are located in `tests/unit/` with structure mirroring `src/`
- Jest configuration excludes `src/constants` and `src/types` from coverage
- Use `yarn test` to run the full test suite

## Architecture

This is a TypeScript library that provides mock data for AWS services, primarily focused on AWS Cognito.

### Core Structure
- **Entry Point**: `src/index.ts` exports three main modules: `awsServices`, `utils`, and `types`
- **AWS Services**: Located in `src/awsServices/`, currently supports Cognito (tokens and user pools)
- **Utilities**: `src/utils/` contains shared utilities for JWT handling, key generation, and UUID generation
- **Types**: TypeScript definitions organized by service in `src/types/`
- **Helpers**: Service-specific helper functions in `src/helpers/`

### Key Components
- **Cognito Module**: Generates mock Cognito tokens and JWKs for testing
- **JWT Utilities**: Handles asymmetric key generation, JWT signing, and base payload creation
- **User Pool Support**: Creates mock JWKS for Cognito user pool validation

### Build System
- Uses `tsup` for building with multiple output formats (CJS/ESM)
- TypeScript configuration extends from `tsconfig.base.json`
- Package manager is Yarn v4.2.2

### Package Structure
The library is published as an npm package with:
- Main entry: `dist/index.js`
- TypeScript types: `dist/index.d.ts`
- ES module: `dist/index.mjs`