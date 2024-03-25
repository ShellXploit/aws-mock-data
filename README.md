<div align="center">

# AWS Mock Data

#### `AWSome mock data for JavaScript/TypeScript based AWS services.`

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ShellXploit/aws-mock-data/blob/main/LICENSE)
[![Release](https://github.com/ShellXploit/aws-mock-data/actions/workflows/publish.yaml/badge.svg)](https://github.com/ShellXploit/aws-mock-data/actions/workflows/publish.yaml)
![NPM Version](https://img.shields.io/npm/v/aws-mock-data?logo=npm)

</div>

## Description

AWS Mock Data is a package that provides mock data for testing AWS-related applications. It aims to simplify the process of generating realistic test data for various AWS services.

## Installation

You can install AWS Mock Data using npm:

```shell
npm install --save-dev aws-mock-data
```

OR yarn:

```shell
yarn add --dev aws-mock-data
```

## How to use

### Cognito

To create mock cognito tokens, you can use the `cognito` module in `awsServices`.

```javascript
import { awsServices, utils } from "aws-mock-data";

const keyPair = utils.getAsymmetricKeys();

const tokens = awsServices.cognito.getCognitoTokens({
	asymmetricKeys: keyPair,
	user: {
		emailId: "<email-id>"
	}
});
```

### Cognito User Pool

To create Jwks for a cognito user pool, you can use the `userPool` module in `awsServices`.

```javascript
import { awsServices, utils } from "aws-mock-data";

const keyPair = utils.getAsymmetricKeys();

const jwks = awsServices.userPool.getUserPoolJwks({
	asymmetricKeys: keyPair
});
```
