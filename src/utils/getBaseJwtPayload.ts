import { getUUID } from ".";
import {
	BaseJwtPayload,
	GetBaseJwtPayloadProps
} from "../types/utils/getBaseJwtPayload";

const getBaseJwtPayload = ({
	issuer,
	subject
}: GetBaseJwtPayloadProps): BaseJwtPayload => {
	const currentEpochTime = Math.floor(Date.now() / 1000);

	return {
		sub: subject,
		iss: issuer,
		origin_jti: getUUID(),
		event_id: getUUID(),
		jti: getUUID(),
		auth_time: currentEpochTime,
		exp: currentEpochTime + 60 * 60,
		iat: currentEpochTime
	};
};

export { getBaseJwtPayload };
