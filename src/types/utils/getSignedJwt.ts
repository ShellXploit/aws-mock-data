import { JwtPayload, SignOptions } from "jsonwebtoken";

export interface GetSignedJwtProps {
	payload: JwtPayload;
	secret?: string | Buffer;
	options?: SignOptions;
}
