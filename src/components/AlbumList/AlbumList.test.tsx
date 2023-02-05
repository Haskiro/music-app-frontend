import { ICardProps } from "@components/Card/CardProps";
import { IAlbum } from "@interfaces/album.interface";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AlbumList from "./AlbumList";

jest.mock("../Card", () => (props: ICardProps) => (
	<div data-testid="Card">{props.title}</div>
));
jest.mock("antd", () => ({
	__esModule: true,
	Spin: () => <div data-testid="Spin" />,
}));

describe("Album List", () => {
	const albumList: IAlbum[] = [
		{
			id: 1,
			cover: "Описание 1",
			title: "Заголовок 1",
			description: "",
			tracks_data: [],
		},
		{
			id: 2,
			cover: "Описание 2",
			title: "Заголовок 2",
			description: "",
			tracks_data: [],
		},
		{
			id: 3,
			cover: "Описание 3",
			title: "Заголовок 3",
			description: "",
			tracks_data: [],
		},
	];

	it("should render something", () => {
		const { container } = render(
			<AlbumList
				albumList={albumList}
				status="succeeded"
				heading="Список Альбомов"
			/>,
			{
				wrapper: MemoryRouter,
			}
		);
		expect(container.firstChild).toBeInTheDocument();
	});

	describe("Correct render", () => {
		beforeEach(() => {
			render(
				<AlbumList
					albumList={albumList}
					status="succeeded"
					heading="Список Альбомов"
				/>,
				{
					wrapper: MemoryRouter,
				}
			);
		});
		afterEach(() => {
			cleanup();
		});

		it("should render loading spinner if status is loadind", () => {
			expect(screen.queryByTestId("Spin")).toBeFalsy();
			expect(screen.queryAllByTestId("Card")).not.toHaveLength(0);
		});

		it("should render loading spinner if status is loadind", () => {
			cleanup();
			render(
				<AlbumList
					albumList={albumList}
					status="loading"
					heading="Список Альбомов"
				/>,
				{
					wrapper: MemoryRouter,
				}
			);

			expect(screen.queryByTestId("Spin")).toBeTruthy();
			expect(screen.queryByTestId("Card")).toBeFalsy();
		});

		it("should render correct count list of items", () => {
			screen.debug(screen.getByRole("list"));
			expect(screen.getAllByTestId("Card")).toHaveLength(
				albumList.length
			);
		});

		it("should render list of albums in a specific order", () => {
			const list = screen.getAllByTestId("Card");
			const titles = list.map((item) => item.textContent);

			expect(titles).toEqual([
				"Заголовок 1",
				"Заголовок 2",
				"Заголовок 3",
			]);
		});
	});

	// describe("Card correct mock", () => {
	// 	beforeAll(() => {
	// 		render(
	// 			<AlbumList
	// 				albumList={albumList}
	// 				status="succeeded"
	// 				heading="Список Альбомов"
	// 			/>,
	// 			{
	// 				wrapper: MemoryRouter,
	// 			}
	// 		);
	// 	});

	// 	afterAll(() => {
	// 		cleanup();
	// 	});

	// 	it("should pass corret prop", () => {
	// 		const cardList = screen.queryAllByTestId("Card");

	// 		cardList.forEach((item, i) => {
	// 			expect(item).toHaveBeenCalledWith(albumList[i]);
	// 		});
	// 	});
	// });
});
