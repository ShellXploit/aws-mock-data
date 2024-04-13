import { sign } from "jsonwebtoken";

import { GetSignedJwtProps } from "../types/utils/getSignedJwt";
import { getUUID } from "./getUUID";

export const getSignedJwt = ({
	payload,
	secret,
	options
}: GetSignedJwtProps): string => {
	const secretValue = secret ? secret : getUUID();
	return sign(payload, secretValue, options);
};
