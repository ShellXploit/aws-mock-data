import urljoin from "url-join";

import { DEFAULT_COGNITO_CONFIG } from "../../constants/awsServices/cognito";
import { UserPool } from "../../types/awsServices/cognito/cognito";

export const getIssuerUrl = (userPool: UserPool): string => {
	const {
		id: userPoolId = DEFAULT_COGNITO_CONFIG.USER_POOL_ID,
		region: userPoolRegion = DEFAULT_COGNITO_CONFIG.REGION
	} = userPool;

	return urljoin(
		`https://cognito-idp.${userPoolRegion}.amazonaws.com`,
		userPoolId
	);
};
