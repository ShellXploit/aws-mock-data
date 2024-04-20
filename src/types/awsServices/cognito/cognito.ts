import { AsymmetricKeys } from "../../utils/getAsymmetricKeys";

interface CognitoIdentity {
	userId: string;
	providerName: string;
	providerType: string;
	issuer: string;
	primary: string;
	dateCreated: string;
}
interface User {
	emailId: string;
	givenName?: string;
	middleName?: string;
	familyName?: string;
	uuid?: string;
	emailVerified?: boolean;
	identities?: CognitoIdentity[];
}

interface Cognito {
	groups?: string[];
	roles?: string[];
	preferredRole?: string;
	scope?: string;
	clientId?: string;
}

interface UserPool {
	id?: string;
	region?: string;
}

interface JwtConfig {
	authTimeInEpoch?: number;
	minutesToExpiry?: number;
}

interface GetCognitoTokensProps {
	asymmetricKeys: AsymmetricKeys;
	user: User;
	cognito?: Cognito;
	userPool?: UserPool;
	jwtConfig?: JwtConfig;
}

interface CognitoTokens {
	id_token: string;
	access_token: string;
}

export { User, Cognito, UserPool, CognitoIdentity };

/**
 * External exports
 * Update `src/types/index.ts`
 */
export { CognitoTokens, GetCognitoTokensProps };
