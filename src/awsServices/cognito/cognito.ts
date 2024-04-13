import {
	CognitoTokens,
	GetCognitoTokensProps
} from "../../types/awsServices/cognito/cognito";
import { getUUID } from "../../utils";
import { DEFAULT_COGNITO_CONFIG } from "../../constants/awsServices/cognito";
import { getBaseJwtPayload } from "../../utils/getBaseJwtPayload";
import { getAccessToken } from "../../helpers/cognito/getAccessToken";
import { getAccessTokenHash } from "../../helpers/cognito/getAccessTokenHash";
import { getIDToken } from "../../helpers/cognito/getIDToken";
import { getIssuerUrl } from "../../helpers/cognito/getIssuerUrl";

export const getCognitoTokens = ({
	asymmetricKeys,
	user,
	cognito = {},
	userPool = {}
}: GetCognitoTokensProps): CognitoTokens => {
	const userData = {
		uuid: getUUID(),
		emailVerified: true,
		...user
	};

	const cognitoData = {
		groups: ["admin"],
		roles: ["arn:aws:iam::123456789012:role/admin"],
		scope: DEFAULT_COGNITO_CONFIG.SCOPE,
		clientId: DEFAULT_COGNITO_CONFIG.CLIENT_ID,
		...cognito
	};

	const issuerUrl = getIssuerUrl(userPool);
	const baseJwtPayload = getBaseJwtPayload({
		issuer: issuerUrl,
		subject: userData.uuid
	});

	const accessToken = getAccessToken(asymmetricKeys, {
		baseJwtPayload,
		userData,
		cognitoData
	});
	const accessTokenHash = getAccessTokenHash(accessToken);

	const idToken = getIDToken(asymmetricKeys, {
		baseJwtPayload,
		accessTokenHash,
		userData,
		cognitoData
	});

	return {
		id_token: idToken,
		access_token: accessToken
	};
};
