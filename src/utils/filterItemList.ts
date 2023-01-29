const filterItemList = <
	T extends Record<U, string>,
	R extends keyof T,
	U extends Extract<"title" | "nickname", R>
>(
	itemList: T[],
	searchValue: string,
	sortByAlphabet: boolean,
	filterKey: U
): T[] => {
	if (searchValue) {
		itemList = itemList.filter((item) =>
			item[filterKey].toLowerCase().includes(searchValue)
		);
	}

	if (!sortByAlphabet) return itemList;
	return itemList.sort((a, b) => {
		const textA = a[filterKey].toUpperCase();
		const textB = b[filterKey].toUpperCase();

		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
};

export default filterItemList;
