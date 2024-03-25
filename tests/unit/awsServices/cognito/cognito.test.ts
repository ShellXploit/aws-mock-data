import * as jwt from "jsonwebtoken";
import { awsServices, utils } from "../../../../src";

const emailId = "test@test.test";

describe("Cognito", () => {
	it("should return ID token and access token", () => {
		const asymmetricKeys = utils.getAsymmetricKeys();

		const tokens = awsServices.cognito.getCognitoTokens({
			asymmetricKeys,
			user: {
				emailId
			}
		});

		expect(tokens).not.toBeNull();
		expect(tokens).toMatchObject({
			["id_token"]: expect.any(String),
			["access_token"]: expect.any(String)
		});
	});

	it("should return a valid ID token", () => {
		const asymmetricKeys = utils.getAsymmetricKeys();

		const { id_token: idToken } = awsServices.cognito.getCognitoTokens({
			asymmetricKeys,
			user: {
				emailId
			}
		});

		let payload: string | jwt.JwtPayload | null = null;
		try {
			payload = jwt.verify(idToken, asymmetricKeys.pem.publicKey);
		} catch (error) {
			expect(error).toBeNull();
		}
		expect(payload).not.toBeNull();
		expect(payload).toMatchObject({
			email: emailId,
			token_use: "id"
		});
	});

	it("should return a valid access token", () => {
		const asymmetricKeys = utils.getAsymmetricKeys();

		const { access_token: accessToken } =
			awsServices.cognito.getCognitoTokens({
				asymmetricKeys,
				user: {
					emailId
				}
			});
		let payload: string | jwt.JwtPayload | null = null;
		try {
			payload = jwt.verify(accessToken, asymmetricKeys.pem.publicKey);
		} catch (error) {
			expect(error).toBeNull();
		}
		expect(payload).not.toBeNull();
		expect(payload).toMatchObject({
			token_use: "access"
		});
	});

	test("succeeds if the jwt verify fails with incorrect key", () => {
		const asymmetricKeys = utils.getAsymmetricKeys();

		const { id_token: idToken, access_token: accessToken } =
			awsServices.cognito.getCognitoTokens({
				asymmetricKeys,
				user: {
					emailId
				}
			});

		try {
			jwt.verify(idToken, "wrong-key");
			expect(false).toBe(true);
		} catch (error) {
			expect(error).not.toBeNull();
		}
		try {
			jwt.verify(accessToken, "wrong-key");
			expect(false).toBe(true);
		} catch (error) {
			expect(error).not.toBeNull();
		}
	});
});
