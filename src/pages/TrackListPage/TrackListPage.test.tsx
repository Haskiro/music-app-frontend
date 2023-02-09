import { ITrackListProps } from "@components/TrackList/TrackList.props";
import { ITrack } from "@interfaces/track.interface";
import { render, screen } from "@testing-library/react";
import * as reduxHooks from "../../store/hooks";
import * as actions from "../../store/slices/trackListSlice";
import TrackListPage from "./TrackListPage";

jest.mock("../../store/hooks");
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

const mockedTrackList = jest.fn((props: ITrackListProps) => (
	<div data-testid="TrackList" />
));

/** 
	const mockedUseAppSelector = jest.fn(() => []);
	jest.mock("../../store/hooks", () => ({
		useAppSelector: () => mockedUseAppSelector(),
	}));
*/

/** 
 	const mockedUseAppSelector = useAppSelector as jest.Mocked<
		typeof useAppSelector
	>; 
*/

jest.mock("../../components/TrackList", () => ({
	__esModule: true,
	default: (props: ITrackListProps) => mockedTrackList(props),
}));

const mockedUseAppSelector = jest.spyOn(reduxHooks, "useAppSelector");
const mockedUseAppDispatch = jest.spyOn(reduxHooks, "useAppDispatch");
const mockedFetchTracks = jest.spyOn(actions, "fetchTracks");

describe("Track List Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should create Track list page with empty tracks", () => {
		mockedUseAppSelector.mockReturnValue([]);
		mockedUseAppDispatch.mockReturnValue(jest.fn());
		const component = render(<TrackListPage />);

		expect(component).toMatchSnapshot();
	});

	it("should dispatch actions", () => {
		const dispatch = jest.fn();
		mockedUseAppSelector.mockReturnValue([]);
		mockedUseAppDispatch.mockReturnValue(dispatch);

		render(<TrackListPage />);

		expect(dispatch).toHaveBeenCalledTimes(1);
		expect(mockedFetchTracks).toHaveBeenCalledTimes(1);
	});

	it("should render Ничего не найдено if trackList length = 0", () => {
		mockedUseAppSelector.mockReturnValue([]);
		mockedUseAppDispatch.mockReturnValue(jest.fn());
		render(<TrackListPage />);
		const plug = screen.getByTestId("Plug").textContent;

		expect(plug).toBe("Ничего не найдено");
	});

	it("should render TrackList if trackList length > 0", () => {
		mockedUseAppSelector
			.mockReturnValueOnce(trackList)
			.mockReturnValueOnce("succeeded");
		mockedUseAppDispatch.mockReturnValue(jest.fn());
		render(<TrackListPage />);
		const tracks = screen.getByTestId("TrackList");

		expect(tracks).toBeInTheDocument();
	});
	it("should render TrackList with correct props", () => {
		mockedUseAppSelector
			.mockReturnValueOnce(trackList)
			.mockReturnValueOnce("succeeded");
		mockedUseAppDispatch.mockReturnValue(jest.fn());
		render(<TrackListPage />);

		expect(mockedTrackList.mock.calls[0][0].trackList).toStrictEqual(
			trackList
		);
		expect(mockedTrackList.mock.calls[0][0].status).toBe("succeeded");
	});
});
