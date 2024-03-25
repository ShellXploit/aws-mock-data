import { sortObjectKeys } from "../../../src/utils/sortObjectKeys";

type TestObject = {
	[key: string]: string;
};

describe("sortObjectKeys", () => {
	it("should return the object with no changes if the order is empty", () => {
		const obj = {
			key1: "value1",
			key2: "value2"
		};
		const keyOrder: string[] = [];

		const sortedObj = sortObjectKeys<TestObject>(obj, keyOrder);

		expect(sortedObj).toMatchObject(obj);
	});

	it("should return the object with the keys sorted based on the order", () => {
		const obj = {
			key1: "value1",
			key2: "value2",
			key3: "value3"
		};
		const keyOrder = ["key3", "key1", "key2"];

		const sortedObj = sortObjectKeys<TestObject>(obj, keyOrder);

		expect(sortedObj).toMatchObject({
			key3: "value3",
			key1: "value1",
			key2: "value2"
		});
	});

	it("should return the object with the keys sorted based on the order and maintain the original order for keys not in the order", () => {
		const obj = {
			key5: "value5",
			key1: "value1",
			key2: "value2",
			key3: "value3",
			key4: "value4"
		};
		const keyOrder = ["key3", "key1", "key2"];

		const sortedObj = sortObjectKeys<TestObject>(obj, keyOrder);

		expect(sortedObj).toMatchObject({
			key3: "value3",
			key1: "value1",
			key2: "value2",
			key5: "value5",
			key4: "value4"
		});
	});
});
