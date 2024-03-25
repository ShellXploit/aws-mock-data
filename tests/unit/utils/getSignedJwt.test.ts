import jwt from "jsonwebtoken";
import { getSignedJwt } from "../../../src/utils/getSignedJwt";

describe("getSignedJwt", () => {
	it("should return payload signed with a random secret if no secret is provided", () => {
		const payload = {
			key1: "value1",
			key2: "value2"
		};

		const signedPayload = getSignedJwt({
			payload
		});

		expect(signedPayload).not.toBeNull();

		let decodedPayload: string | jwt.JwtPayload | null = null;
		try {
			decodedPayload = jwt.decode(signedPayload);
		} catch (error) {
			expect(error).toBeNull();
		}
		expect(decodedPayload).not.toBeNull();
		expect(decodedPayload).toMatchObject(payload);
	});

	it("should return payload signed with the provided secret", () => {
		const payload = {
			key1: "value1",
			key2: "value2"
		};
		const secret = "test-secret";

		const signedPayload = getSignedJwt({
			payload,
			secret
		});

		expect(signedPayload).not.toBeNull();

		let decodedPayload: string | jwt.JwtPayload | null = null;
		try {
			decodedPayload = jwt.verify(signedPayload, secret);
		} catch (error) {
			expect(error).toBeNull();
		}
		expect(decodedPayload).not.toBeNull();
		expect(decodedPayload).toMatchObject(payload);
	});
});
