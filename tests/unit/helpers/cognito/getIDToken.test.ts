import * as jwt from "jsonwebtoken";

import { getIDToken } from "../../../../src/helpers/cognito/getIDToken";
import { getAsymmetricKeys } from "../../../../src/utils";
import { getBaseJwtPayload } from "../../../../src/utils/getBaseJwtPayload";

describe("getIDToken", () => {
	it("should return a valid ID token", () => {
		const asymmetricKeys = getAsymmetricKeys();
		const issuer =
			"https://cognito-idp.us-east-1.amazonaws.com/us-east-1_123456789";
		const subject = "1234567890";
		const baseJwtPayload = getBaseJwtPayload({
			issuer,
			subject
		});

		const idToken = getIDToken(asymmetricKeys, {
			baseJwtPayload,
			accessTokenHash: "test-access-token-hash",
			userData: {
				emailId: "test-email-id",
				uuid: "test-uuid"
			},
			cognitoData: {
				groups: ["test-cognito-group"]
			}
		});

		let payload: string | jwt.JwtPayload | null = null;
		try {
			payload = jwt.verify(idToken, asymmetricKeys.pem.publicKey);
		} catch (error) {
			expect(error).toBeNull();
		}
		expect(payload).not.toBeNull();

		const expected = {
			at_hash: "test-access-token-hash",
			sub: "1234567890",
			"cognito:groups": ["test-cognito-group"],
			iss: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_123456789",
			"cognito:username": "test-uuid",
			origin_jti: baseJwtPayload.origin_jti,
			event_id: baseJwtPayload.event_id,
			token_use: "id",
			auth_time: baseJwtPayload.auth_time,
			exp: baseJwtPayload.exp,
			iat: baseJwtPayload.iat,
			jti: baseJwtPayload.jti,
			email: "test-email-id"
		};

		// Check if the order of the keys are the same
		const keysPayload = Object.keys(payload as jwt.JwtPayload);
		const keysExpected = Object.keys(expected);
		expect(keysPayload).toEqual(keysExpected);

		expect(payload).toEqual(expected);
	});
});
