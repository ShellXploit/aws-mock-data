import { JsonWebKey } from "crypto";

export interface AsymmetricKeys {
	keyId: string;
	pem: {
		publicKey: string;
		privateKey: string;
	};
	der: {
		publicKey: Buffer;
		privateKey: Buffer;
	};
	jwk: {
		publicKey: JsonWebKey;
		privateKey: JsonWebKey;
	};
}

export interface GetAsymmetricKeysProps {
	keyId?: string;
	modulusLength?: number;
}
