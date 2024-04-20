import { getUUID } from ".";
import {
	BaseJwtPayload,
	GetBaseJwtPayloadProps
} from "../types/utils/getBaseJwtPayload";

const getBaseJwtPayload = ({
	issuer,
	subject,
	authTimeInEpoch,
	minutesToExpiry = 60
}: GetBaseJwtPayloadProps): BaseJwtPayload => {
	const isEpochValid =
		authTimeInEpoch && new Date(authTimeInEpoch * 1000).getTime() > 0;

	const authTime = isEpochValid
		? authTimeInEpoch
		: Math.floor(Date.now() / 1000);

	const secondsToExpiry = minutesToExpiry * 60;

	return {
		sub: subject,
		iss: issuer,
		origin_jti: getUUID(),
		event_id: getUUID(),
		jti: getUUID(),
		auth_time: authTime,
		exp: authTime + secondsToExpiry,
		iat: authTime
	};
};

export { getBaseJwtPayload };
