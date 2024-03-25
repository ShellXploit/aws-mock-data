import { utils } from "../../../src";

describe("getAsymmetricKeys", () => {
	it("should return a valid asymmetric keys with default values", () => {
		const asymmetricKeys = utils.getAsymmetricKeys();

		expect(asymmetricKeys).not.toBeNull();
		expect(asymmetricKeys).toMatchObject({
			keyId: expect.any(String),
			jwk: {
				publicKey: expect.any(Object),
				privateKey: expect.any(Object)
			},
			pem: {
				publicKey: expect.any(String),
				privateKey: expect.any(String)
			},
			der: {
				publicKey: expect.any(Buffer),
				privateKey: expect.any(Buffer)
			}
		});
	});

	it("should return a valid asymmetric keys when key ID and modulus length are defined", () => {
		const keyId = "test-key-id";

		const asymmetricKeys = utils.getAsymmetricKeys({
			keyId,
			modulusLength: 4096
		});

		expect(asymmetricKeys).not.toBeNull();
		expect(asymmetricKeys).toMatchObject({
			keyId,
			jwk: {
				publicKey: expect.any(Object),
				privateKey: expect.any(Object)
			},
			pem: {
				publicKey: expect.any(String),
				privateKey: expect.any(String)
			},
			der: {
				publicKey: expect.any(Buffer),
				privateKey: expect.any(Buffer)
			}
		});
	});
});
