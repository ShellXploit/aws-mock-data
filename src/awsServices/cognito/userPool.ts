import { jwk } from "../../types/common/jwk";
import { GetUserPoolJwksProps } from "../../types/awsServices/cognito/userPool";

export const getUserPoolJwks = ({
	asymmetricKeys
}: GetUserPoolJwksProps): jwk | null => {
	const { keyId, jwk } = asymmetricKeys;

	const {
		kty: keyType = "RSA",
		e: keyExponentE = "AQAB",
		n: keyModulusN
	} = jwk.privateKey;

	if (!keyModulusN) {
		return null;
	}

	return {
		kty: keyType,
		e: keyExponentE,
		use: "sig",
		kid: keyId,
		alg: "RS256",
		n: keyModulusN
	};
};
