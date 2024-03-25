import { AsymmetricKeys } from "../../utils/getAsymmetricKeys";

interface GetCognitoTokensProps {
	asymmetricKeys: AsymmetricKeys;
	user: { emailId: string; uuid?: string; emailVerified?: boolean };
	cognito?: {
		groups?: string[];
		roles?: string[];
		preferredRole?: string;
		scope?: string;
		clientId?: string;
	};
	userPool?: {
		id?: string;
		region?: string;
	};
}

export { GetCognitoTokensProps };
