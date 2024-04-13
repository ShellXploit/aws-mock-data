import { ID_TOKEN_SORTED_KEYS } from "../../constants/awsServices/cognito";
import { GetIDTokenProps } from "../../types/helpers/cognito/getIDToken";
import { AsymmetricKeys } from "../../types/utils/getAsymmetricKeys";
import { getSignedJwt } from "../../utils/getSignedJwt";
import { sortObjectKeys } from "../../utils/sortObjectKeys";

export const getIDToken = (
	asymmetricKeys: AsymmetricKeys,
	{ baseJwtPayload, accessTokenHash, userData, cognitoData }: GetIDTokenProps
): string => {
	const payload = {
		...baseJwtPayload,
		at_hash: accessTokenHash,
		token_use: "id",
		// User
		email: userData.emailId,
		email_verified: userData.emailVerified,
		given_name: userData.givenName,
		middle_name: userData.middleName,
		family_name: userData.familyName,
		identities: userData.identities,
		"cognito:username": userData.uuid,
		// Cognito
		aud: cognitoData.clientId,
		"cognito:groups": cognitoData.groups,
		"cognito:roles": cognitoData.roles,
		"cognito:preferred_role": cognitoData.preferredRole
	};

	const sortedPayload = sortObjectKeys(payload, ID_TOKEN_SORTED_KEYS);

	return getSignedJwt({
		payload: sortedPayload,
		secret: asymmetricKeys.pem.privateKey,
		options: {
			keyid: asymmetricKeys.keyId,
			algorithm: "RS256"
		}
	});
};
