import { ITrack } from "@interfaces/track.interface";
import { screen, render, cleanup } from "@testing-library/react/pure";
import TrackList from "../../components/TrackList";

const mockTrackCard = jest.fn((props: { track: ITrack }) => (
	<div data-testid="TrackCard" />
));

jest.mock("../../components/TrackCard", () => ({
	__esModule: true,
	default: (props: { track: ITrack }) => mockTrackCard(props),
}));

jest.mock("antd", () => ({
	__esModule: true,
	Spin: () => <div data-testid="Spin" />,
}));

const trackList: ITrack[] = [
	{
		id: 1,
		title: "Track title",
		cover: "cover link",
		audio_file: "audio file link",
		artists_data: [
			{
				id: 1,
				nickname: "Artist 1",
			},
			{
				id: 2,
				nickname: "Artist 2",
			},
		],
		released_at: "06-02-2023",
	},
	{
		id: 2,
		title: "Track title",
		cover: "cover link",
		audio_file: "audio file link",
		artists_data: [
			{
				id: 1,
				nickname: "Artist 1",
			},
		],
		released_at: "06-02-2023",
	},
];

describe("Track List", () => {
	describe("Correct render", () => {
		beforeAll(() => {
			render(
				<TrackList
					trackList={trackList}
					status="succeeded"
					heading="Список Треков"
				/>
			);
		});

		afterAll(() => {
			cleanup();
		});

		it("should render correct count of tracks", () => {
			const tracks = screen.getAllByTestId("TrackCard");

			expect(tracks).toHaveLength(trackList.length);
		});

		it("should render correct heading", () => {
			const heading = screen.getByRole("heading").textContent;

			expect(heading).toBe("Список Треков");
		});

		it("should pass correct props into Card Track", () => {
			const callOneProps = mockTrackCard.mock.calls[0][0].track;
			const callTwoProps = mockTrackCard.mock.calls[1][0].track;

			expect(callOneProps).toEqual(trackList[0]);
			expect(callTwoProps).toEqual(trackList[1]);
		});

		it("should Card Track mock call correct times", () => {
			expect(mockTrackCard).toBeCalledTimes(2);
		});

		it("should correct render by status props", () => {
			cleanup();
			const { rerender } = render(
				<TrackList
					trackList={trackList}
					status="loading"
					heading="Список Треков"
				/>
			);

			expect(screen.queryByTestId("Spin")).toBeTruthy();
			expect(screen.queryAllByTestId("TrackCard")).toHaveLength(0);

			rerender(
				<TrackList
					trackList={trackList}
					status="succeeded"
					heading="Список Треков"
				/>
			);

			expect(screen.queryByTestId("Spin")).toBeFalsy();
			expect(screen.queryAllByTestId("TrackCard")).not.toHaveLength(0);
		});
	});
});
