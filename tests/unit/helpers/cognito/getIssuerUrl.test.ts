import { getIssuerUrl } from "../../../../src/helpers/cognito/getIssuerUrl";

describe("unit::helpers::cognito::getIssuerUrl", () => {
	it("should return the issuer URL with custom config", () => {
		const id = "temp-id";
		const region = "temp-region";

		const result = getIssuerUrl({
			id,
			region
		});

		expect(result).toBe(
			`https://cognito-idp.${region}.amazonaws.com/${id}`
		);
	});

	it("should return the issuer URL with default config", () => {
		const result = getIssuerUrl({});

		expect(result).toBe(
			"https://cognito-idp.us-east-1.amazonaws.com/us-east-1_A1b2C3d4E"
		);
	});
});
