import * as jwt from "jsonwebtoken";

import { getAccessToken } from "../../../../src/helpers/cognito/getAccessToken";
import { getAsymmetricKeys } from "../../../../src/utils";
import { getBaseJwtPayload } from "../../../../src/utils/getBaseJwtPayload";

describe("unit::helpers::cognito::getAccessToken", () => {
	it("should return the access token", () => {
		const asymmetricKeys = getAsymmetricKeys();
		const baseJwtPayload = getBaseJwtPayload({
			issuer: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_123456789",
			subject: "1234567890"
		});

		const accessToken = getAccessToken(asymmetricKeys, {
			baseJwtPayload,
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
			payload = jwt.verify(accessToken, asymmetricKeys.pem.publicKey);
		} catch (error) {
			expect(error).toBeNull();
		}
		expect(payload).not.toBeNull();

		const expected = {
			sub: "1234567890",
			"cognito:groups": ["test-cognito-group"],
			iss: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_123456789",
			origin_jti: baseJwtPayload.origin_jti,
			event_id: baseJwtPayload.event_id,
			token_use: "access",
			auth_time: baseJwtPayload.auth_time,
			exp: baseJwtPayload.exp,
			iat: baseJwtPayload.iat,
			jti: baseJwtPayload.jti,
			username: "test-uuid"
		};

		// Check if the order of the keys are the same
		const keysPayload = Object.keys(payload as jwt.JwtPayload);
		const keysExpected = Object.keys(expected);
		expect(keysPayload).toEqual(keysExpected);

		expect(payload).toEqual(expected);
	});
});
