import filterItemList from "./filterItemList";

describe("Filter item list", () => {
	let itemList: any[];

	beforeEach(() => {
		itemList = [
			{
				nickname: "David",
			},
			{
				nickname: "Benjamin",
			},
			{
				nickname: "CrazyTapok",
			},
			{
				nickname: "Avrora",
			},
			{
				nickname: "Ben",
			},
		];
	});

	describe("Sorting by alphabet", () => {
		it("should sort array by alphabet by nickname", () => {
			// Act
			const result = filterItemList(itemList, "", true, "nickname");

			// Assert
			expect(result).toEqual([
				{
					nickname: "Avrora",
				},
				{
					nickname: "Ben",
				},
				{
					nickname: "Benjamin",
				},
				{
					nickname: "CrazyTapok",
				},
				{
					nickname: "David",
				},
			]);
		});

		it("should not sort array by alphabet by nickname", () => {
			// Act
			const result = filterItemList(itemList, "", false, "nickname");

			// Assert
			expect(result).toEqual(itemList);
		});
	});

	describe("Searching by searchValue", () => {
		it("should search results by string value", () => {
			let result;

			result = filterItemList(itemList, "Avr", false, "nickname");

			expect(result).toEqual([
				{
					nickname: "Avrora",
				},
			]);

			result = filterItemList(itemList, "Ben", false, "nickname");

			expect(result).toEqual([
				{
					nickname: "Benjamin",
				},
				{
					nickname: "Ben",
				},
			]);
		});

		it("should return empty array if results not found", () => {
			const result = filterItemList(itemList, "Aejs", false, "nickname");

			expect(result).toEqual([]);
		});
	});

	describe("Searching and sorting together", () => {
		it("should sort search results", () => {
			const result = filterItemList(itemList, "av", true, "nickname");

			expect(result).toEqual([
				{
					nickname: "Avrora",
				},
				{
					nickname: "David",
				},
			]);
		});
	});
});
