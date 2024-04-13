import { getAccessTokenHash } from "../../../../src/helpers/cognito/getAccessTokenHash";

describe("unit::helpers::cognito::getAccessTokenHash", () => {
	it("should return the access token hash", () => {
		const accessToken = "temp-access-token";
		const expectedHash = "3T4fHBWhxfYrKhSb6BD_dg";

		const result = getAccessTokenHash(accessToken);

		expect(result).toBe(expectedHash);
	});
});
