import { generateKeyPairSync, RSAKeyPairKeyObjectOptions } from "crypto";
import {
	GetAsymmetricKeysProps,
	AsymmetricKeys
} from "../types/utils/getAsymmetricKeys";
import { getUUID } from "./getUUID";

export const getAsymmetricKeys = (
	props?: GetAsymmetricKeysProps
): AsymmetricKeys => {
	const { keyId = getUUID(), modulusLength = 2048 } = props || {};

	const alg = "rsa";
	const options: RSAKeyPairKeyObjectOptions = {
		modulusLength
	};
	const keyPair = generateKeyPairSync(alg, options);

	return {
		keyId,
		pem: {
			publicKey: keyPair.publicKey.export({
				type: "pkcs1",
				format: "pem"
			}) as string,
			privateKey: keyPair.privateKey.export({
				type: "pkcs1",
				format: "pem"
			}) as string
		},
		der: {
			publicKey: keyPair.publicKey.export({
				type: "pkcs1",
				format: "der"
			}),
			privateKey: keyPair.privateKey.export({
				type: "pkcs1",
				format: "der"
			})
		},
		jwk: {
			publicKey: keyPair.publicKey.export({ format: "jwk" }),
			privateKey: keyPair.privateKey.export({ format: "jwk" })
		}
	};
};
