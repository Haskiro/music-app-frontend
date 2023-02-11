import { ITrack } from "@interfaces/track.interface";
import axios from "axios";
import trackListReducer, {
	fetchTracks,
	setStatusLoading,
} from "../../../store/slices/trackListSlice";
import { trackListState } from "../../../store/slices/trackListSlice";

const initialState: trackListState = {
	trackList: [],
	status: "idle",
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("trackList slice", () => {
	it("should return default state when we passed en empty action", () => {
		const result = trackListReducer(undefined, { type: "" });

		expect(result).toStrictEqual(initialState);
	});

	it('should set status loading with "setStatusLoading" action', () => {
		const action = { type: setStatusLoading.type };

		const result = trackListReducer(initialState, action);

		expect(result.status).toBe("loading");
	});

	describe("trackList Thunk", () => {
		it("should fetchTracks with resolved response", async () => {
			const mockTracks: ITrack[] = [
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

			mockedAxios.get.mockImplementation(() =>
				Promise.resolve({ data: mockTracks })
			);

			const dispatch = jest.fn();
			const thunk = fetchTracks();

			await thunk(dispatch, () => undefined, undefined);

			const { calls } = dispatch.mock;
			expect(calls).toHaveLength(2);

			const [start, end] = calls;
			expect(start[0].type).toBe("trackList/fetchTracks/pending");
			expect(end[0].type).toBe("trackList/fetchTracks/fulfilled");
			expect(end[0].payload).toStrictEqual(mockTracks);
		});
		it("should fetchTracks with rejected response", async () => {
			mockedAxios.get.mockImplementation(() =>
				Promise.reject("fetching error")
			);

			const dispatch = jest.fn();
			const thunk = fetchTracks();

			await thunk(dispatch, () => undefined, undefined);

			const { calls } = dispatch.mock;
			expect(calls).toHaveLength(2);

			const [start, end] = calls;

			expect(start[0].type).toBe("trackList/fetchTracks/pending");
			expect(end[0].type).toBe("trackList/fetchTracks/rejected");
			expect(end[0].error.message).toStrictEqual("fetching error");
		});

		it('should change status if "fetchTracks.pending" action', () => {
			const state = trackListReducer(undefined, {
				type: "trackList/fetchTracks/pending",
			});

			expect(state.status).toBe("loading");
		});

		it('should change status and trackList if "fetchTracks.fulfilled" action', () => {
			const mockTracks: ITrack[] = [
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

			const state = trackListReducer(undefined, {
				type: "trackList/fetchTracks/fulfilled",
				payload: mockTracks,
			});

			expect(state.status).toBe("succeeded");
			expect(state.trackList).toStrictEqual(mockTracks);
		});

		it('should change status if "fetchTracks.rejected" action', () => {
			const state = trackListReducer(undefined, {
				type: "trackList/fetchTracks/rejected",
			});

			expect(state.status).toBe("failed");
		});
	});
});
