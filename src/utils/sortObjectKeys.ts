/**
 * Function to sort object keys based on the specified order
 */
export const sortObjectKeys = <T extends object>(
	obj: T,
	keyOrder: string[]
): T => {
	if (keyOrder.length === 0) {
		return obj;
	}

	const sortedKeys = Object.keys(obj).sort((a, b) => {
		const indexA = keyOrder.indexOf(a);
		const indexB = keyOrder.indexOf(b);

		// If both keys are present in keyOrder, sort based on their indices
		if (indexA !== -1 && indexB !== -1) {
			return indexA - indexB;
		}

		// If only one key is present in keyOrder, it comes before
		if (indexA !== -1) {
			return -1;
		}
		if (indexB !== -1) {
			return 1;
		}

		// If neither key is present in keyOrder, maintain the original order
		return 0;
	});
	return sortedKeys.reduce((sortedObj, key) => {
		// @ts-expect-error - TS doesn't know that key is a valid key of obj
		sortedObj[key] = obj[key];
		return sortedObj;
	}, {} as T);
};
