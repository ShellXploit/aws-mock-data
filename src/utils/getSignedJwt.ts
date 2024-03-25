import { sign } from "jsonwebtoken";

import { GetSignedJwtProps } from "../types/utils/getSignedJwt";

export const getSignedJwt = ({
	payload,
	secret,
	options
}: GetSignedJwtProps): string => {
	const secretValue = secret
		? secret
		: Math.random().toString(36).substring(2, 15);
	return sign(payload, secretValue, options);
};
