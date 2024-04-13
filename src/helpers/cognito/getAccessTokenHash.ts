import * as crypto from "crypto";

/**
 * Calculate the `at_hash` of an access token as per the OIDC specification
 * @param accessToken
 * @returns `at_hash` value of the access token
 */
export const getAccessTokenHash = (accessToken: string): string => {
	const sha256Hash = crypto
		.createHash("sha256")
		.update(accessToken)
		.digest("hex");

	// Take the first 128 bits (16 bytes) and base64url encode it
	const truncatedHash = sha256Hash.substring(0, 32); // 32 hex characters = 16 bytes

	const base64urlEncoded = Buffer.from(truncatedHash, "hex")
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=/g, "");

	return base64urlEncoded;
};
