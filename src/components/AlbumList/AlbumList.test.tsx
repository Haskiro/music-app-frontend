import { ICardProps } from "@components/Card/CardProps";
import { IAlbum } from "@interfaces/album.interface";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AlbumList from "./AlbumList";

const mockCard = jest.fn((props: ICardProps) => (
	<div data-testid="Card">{props.title}</div>
));

jest.mock("../Card", () => ({
	__esModule: true,
	default: (props: ICardProps) => mockCard(props),
}));
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
			mockCard.mockClear();
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

	describe("Card correct mock", () => {
		beforeAll(() => {
			// mockedCard.mockClear();
			render(
				<AlbumList
					albumList={[albumList[0]]}
					status="succeeded"
					heading="Список Альбомов"
				/>,
				{
					wrapper: MemoryRouter,
				}
			);
		});

		afterAll(() => {
			cleanup();
		});

		it("should pass correct prop", () => {
			const album = albumList[0];

			expect(mockCard).toBeCalledTimes(1);
			expect(mockCard).toHaveBeenCalledWith({
				title: album.title,
				image: album.cover,
				target: `/albums/${album.id}`,
				alt: "Фото Исполнителя",
			});
		});
	});
});
