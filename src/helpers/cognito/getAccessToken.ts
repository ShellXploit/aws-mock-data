import { ACCESS_TOKEN_SORTED_KEYS } from "../../constants/awsServices/cognito";
import { GetAccessTokenProps } from "../../types/helpers/cognito/getAcessToken";
import { AsymmetricKeys } from "../../types/utils/getAsymmetricKeys";
import { getSignedJwt } from "../../utils/getSignedJwt";
import { sortObjectKeys } from "../../utils/sortObjectKeys";

export const getAccessToken = (
	asymmetricKeys: AsymmetricKeys,
	{ baseJwtPayload, userData, cognitoData }: GetAccessTokenProps
): string => {
	const payload = {
		...baseJwtPayload,
		token_use: "access",
		// User
		username: userData.uuid,
		// Cognito
		scope: cognitoData.scope,
		client_id: cognitoData.clientId,
		"cognito:groups": cognitoData.groups
	};

	const sortedPayload = sortObjectKeys(payload, ACCESS_TOKEN_SORTED_KEYS);

	return getSignedJwt({
		payload: sortedPayload,
		secret: asymmetricKeys.pem.privateKey,
		options: {
			keyid: asymmetricKeys.keyId,
			algorithm: "RS256"
		}
	});
};
