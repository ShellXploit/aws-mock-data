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

	it("should return a valid tokens with custom jwt config - expiry", () => {
		const asymmetricKeys = utils.getAsymmetricKeys();

		const minutesToExpiry = 1;

		const { id_token: idToken, access_token: accessToken } =
			awsServices.cognito.getCognitoTokens({
				asymmetricKeys,
				user: {
					emailId
				},
				jwtConfig: {
					minutesToExpiry
				}
			});

		let decodedToken: string | jwt.JwtPayload | null = null;
		let authTime = 0;
		let expiry = 0;
		try {
			decodedToken = jwt.decode(idToken) as jwt.JwtPayload;
		} catch (error) {
			expect(error).toBeNull();
		}
		expect(decodedToken).not.toBeNull();
		authTime = decodedToken?.iat || 0;
		expiry = decodedToken?.exp || 0;
		expect(expiry - authTime).toBe(minutesToExpiry * 60);

		try {
			decodedToken = jwt.decode(accessToken) as jwt.JwtPayload;
		} catch (error) {
			expect(error).toBeNull();
		}
		expect(decodedToken).not.toBeNull();
		authTime = decodedToken?.iat || 0;
		expiry = decodedToken?.exp || 0;
		expect(expiry - authTime).toBe(minutesToExpiry * 60);
	});

	it("should return a valid tokens with custom jwt config - auth time", () => {
		const asymmetricKeys = utils.getAsymmetricKeys();

		const authTimeInEpoch = 1000;

		const { id_token: idToken, access_token: accessToken } =
			awsServices.cognito.getCognitoTokens({
				asymmetricKeys,
				user: {
					emailId
				},
				jwtConfig: {
					authTimeInEpoch
				}
			});

		let decodedToken: string | jwt.JwtPayload | null = null;
		try {
			decodedToken = jwt.decode(idToken) as jwt.JwtPayload;
		} catch (error) {
			expect(error).toBeNull();
		}
		expect(decodedToken).not.toBeNull();
		expect(decodedToken?.iat).toBe(authTimeInEpoch);

		try {
			decodedToken = jwt.decode(accessToken) as jwt.JwtPayload;
		} catch (error) {
			expect(error).toBeNull();
		}
		expect(decodedToken).not.toBeNull();
		expect(decodedToken?.iat).toBe(authTimeInEpoch);
	});
});
