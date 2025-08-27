<div align="center">

# AWS Mock Data

#### `AWSome mock data for Node.js based AWS services`

[![NPM Version](https://img.shields.io/npm/v/aws-mock-data?logo=npm)](https://www.npmjs.com/package/aws-mock-data)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ShellXploit/aws-mock-data/blob/main/LICENSE)
[![Release](https://github.com/ShellXploit/aws-mock-data/actions/workflows/release.yaml/badge.svg)](https://github.com/ShellXploit/aws-mock-data/actions/workflows/release.yaml)
[![codecov](https://codecov.io/gh/ShellXploit/aws-mock-data/graph/badge.svg?token=JDR3J56KVE)](https://codecov.io/gh/ShellXploit/aws-mock-data)

</div>

## Overview

**AWS Mock Data** is a Node.js library that provides realistic mock data for AWS services. It’s designed to streamline the development and testing of AWS-based applications by generating valid JWT tokens, JWKs, and other mock service data.

### ✅ Features
- 🔐 Generate valid **Cognito JWT** ID and access tokens
- 🔑 Create **JWKS** (JSON Web Key Sets) for token verification
- 📘 Written in **TypeScript** with full type safety
- 🧪 Ideal for **unit/integration tests** and local development
- 🚀 **Zero-config** setup – ready out of the box


## Installation

Using **npm**:

```bash
npm install --save-dev aws-mock-data
```

Or with **Yarn**:

```bash
yarn add --dev aws-mock-data
```

## Quick Start

```typescript
import { awsServices, utils, types } from "aws-mock-data";

const keyPair = utils.getAsymmetricKeys();

const user: types.User = {
	emailId: "user@example.com",
	givenName: "John",
	familyName: "Doe",
	emailVerified: true
};

// Create tokens with custom configuration
const tokens = awsServices.cognito.getCognitoTokens({
	asymmetricKeys: keyPair,
	user,
	cognito: {
		groups: ["admin", "users"],
		roles: ["arn:aws:iam::123456789012:role/AdminRole"]
	},
	userPool: {
		id: "us-east-1_ABC123",
		region: "us-east-1"
	},
	jwtConfig: {
		minutesToExpiry: 60,
		authTimeInEpoch: Math.floor(Date.now() / 1000)
	}
});
```

## API Reference

### `awsServices.cognito.getCognitoTokens(options)`

Generates mock **Cognito ID and Access tokens**.

**Parameters:**

* `asymmetricKeys` — Key pair used for signing JWTs
* `user` — User information (required)
* `cognito` — Optional Cognito-specific data (e.g., groups, roles)
* `userPool` — Optional user pool settings
* `jwtConfig` — Optional token timing configuration

**Returns:** `CognitoTokens` — `{ id_token, access_token }`

### `awsServices.userPool.getUserPoolJwks(options)`

Generates a **JWKS** (JSON Web Key Set) for token validation.

**Parameters:**

* `asymmetricKeys` — RSA key pair for JWK generation

**Returns:** Single JWK object or `null` on failure

### `utils.getAsymmetricKeys(options?)`

Generates an RSA key pair for signing and verification.

**Options:**

* `keyLength` — Bit size of the key (default: `2048`)

**Returns:** `AsymmetricKeys` — Key ID, PEM strings, and JWK object

## Advanced Examples

### Token Verification with `jsonwebtoken`

```javascript
import jwt from "jsonwebtoken";

const keyPair = utils.getAsymmetricKeys();
const tokens = awsServices.cognito.getCognitoTokens({
	asymmetricKeys: keyPair,
	user: { emailId: "test@example.com" }
});

// Verify the token
const decoded = jwt.verify(tokens.id_token, keyPair.pem.publicKey);
console.log(decoded);
```

### Simulated JWKS Endpoint

```javascript
const keyPair = utils.getAsymmetricKeys();
const jwks = awsServices.userPool.getUserPoolJwks({
	asymmetricKeys: keyPair
});

// Mock JWKS endpoint response
const jwksResponse = {
	keys: [jwks]
};
```

## Best Practices

### 🔐 Security

* **Not for production use** — testing only
* Keep private keys out of source control
* Generate new keys per test suite when possible

### ⚙️ Performance

* Reuse key pairs to speed up tests
* Cache tokens until expiry
* Avoid over-configuration – use sensible defaults

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:

* Project setup
* Running tests and linters
* PR guidelines and code style

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes and releases.

## License

MIT © [Hanut Arora](https://github.com/ShellXploit)
