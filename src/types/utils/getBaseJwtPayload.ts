interface GetBaseJwtPayloadProps {
	issuer: string;
	subject: string;
}

interface BaseJwtPayload {
	sub: string;
	iss: string;
	origin_jti: string;
	event_id: string;
	jti: string;
	auth_time: number;
	exp: number;
	iat: number;
}

export { GetBaseJwtPayloadProps, BaseJwtPayload };
