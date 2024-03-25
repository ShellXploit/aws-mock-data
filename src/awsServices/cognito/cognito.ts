import urlJoin from "url-join";

import { getSignedJwt } from "../../utils/getSignedJwt";
import { GetCognitoTokensProps } from "../../types/awsServices/cognito/cognito";
import { getUUID } from "../../utils";
import {
	ACCESS_TOKEN_SORTED_KEYS,
	DEFAULT_COGNITO_CONFIG,
	ID_TOKEN_SORTED_KEYS
} from "../../constants/awsServices/cognito";
import { getBaseJwtPayload } from "../../utils/getBaseJwtPayload";
import { sortObjectKeys } from "../../utils/sortObjectKeys";

export const getCognitoTokens = ({
	asymmetricKeys,
	user,
	cognito,
	userPool
}: GetCognitoTokensProps): {
	id_token: string;
	access_token: string;
} => {
	const {
		emailId,
		uuid: cognitoUsername = getUUID(),
		emailVerified = true
	} = user;

	const {
		groups: cognitoGroups = ["admin"],
		roles: cognitoRoles = ["arn:aws:iam::123456789012:role/admin"],
		preferredRole:
			cognitoPreferredRole = "arn:aws:iam::123456789012:role/admin",
		scope: cognitoScope = DEFAULT_COGNITO_CONFIG.SCOPE,
		clientId: userPoolClientId = DEFAULT_COGNITO_CONFIG.CLIENT_ID
	} = cognito || {};

	const {
		id: userPoolId = DEFAULT_COGNITO_CONFIG.USER_POOL_ID,
		region: userPoolRegion = DEFAULT_COGNITO_CONFIG.REGION
	} = userPool || {};

	const issuerUrl = urlJoin(
		`https://cognito-idp.${userPoolRegion}.amazonaws.com`,
		userPoolId
	);

	const tokens = [
		{
			name: "id_token",
			payload: {
				email: emailId,
				email_verified: emailVerified,
				aud: userPoolClientId,
				token_use: "id",
				"cognito:username": cognitoUsername,
				"cognito:groups": cognitoGroups,
				"cognito:roles": cognitoRoles,
				"cognito:preferred_role": cognitoPreferredRole,
				...getBaseJwtPayload({
					issuer: issuerUrl,
					subject: cognitoUsername
				})
			},
			order: ID_TOKEN_SORTED_KEYS
		},
		{
			name: "access_token",
			payload: {
				scope: cognitoScope,
				client_id: userPoolClientId,
				token_use: "access",
				username: cognitoUsername,
				"cognito:groups": cognitoGroups,
				...getBaseJwtPayload({
					issuer: issuerUrl,
					subject: cognitoUsername
				})
			},
			order: ACCESS_TOKEN_SORTED_KEYS
		}
	];

	const cognitoTokens = tokens.reduce(
		(acc, token) => {
			const { name, payload, order } = token;

			const sortedPayload = sortObjectKeys(payload, order);

			const signedToken = getSignedJwt({
				payload: sortedPayload,
				secret: asymmetricKeys.pem.privateKey,
				options: {
					keyid: asymmetricKeys.keyId,
					algorithm: "RS256"
				}
			});

			return {
				...acc,
				[name]: signedToken
			};
		},
		{} as { id_token: string; access_token: string }
	);

	return cognitoTokens;
};
