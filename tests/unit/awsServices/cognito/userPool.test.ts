import { awsServices, utils } from "../../../../src";

describe("UserPool", () => {
	it("should return a valid JWK", () => {
		const asymmetricKeys = utils.getAsymmetricKeys();

		const userPoolJwk = awsServices.userPool.getUserPoolJwks({
			asymmetricKeys
		});

		const { privateKey } = asymmetricKeys.jwk;
		expect(userPoolJwk).not.toBe(null);
		expect(userPoolJwk).toMatchObject({
			kty: privateKey.kty,
			e: privateKey.e,
			use: "sig",
			kid: asymmetricKeys.keyId,
			alg: "RS256",
			n: privateKey.n
		});
	});

	it("should use default values when key type and exponent are not defined", () => {
		const asymmetricKeys = utils.getAsymmetricKeys();
		asymmetricKeys.jwk.privateKey.kty = undefined;
		asymmetricKeys.jwk.privateKey.e = undefined;

		const userPoolJwk = awsServices.userPool.getUserPoolJwks({
			asymmetricKeys
		});

		const { privateKey } = asymmetricKeys.jwk;
		expect(userPoolJwk).not.toBe(null);
		expect(userPoolJwk).toMatchObject({
			kty: "RSA",
			e: "AQAB",
			use: "sig",
			kid: asymmetricKeys.keyId,
			alg: "RS256",
			n: privateKey.n
		});
	});

	it("should return null if the private key is invalid", () => {
		const asymmetricKeys = utils.getAsymmetricKeys();
		asymmetricKeys.jwk.privateKey.n = "";

		const userPoolJwk = awsServices.userPool.getUserPoolJwks({
			asymmetricKeys
		});

		expect(userPoolJwk).toBe(null);
	});
});
