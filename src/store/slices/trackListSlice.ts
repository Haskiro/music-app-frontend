import { ITrack } from "@interfaces/track.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface trackListState {
	trackList: ITrack[] | null;
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: trackListState = {
	trackList: null,
	status: "idle",
};

export const fetchTracks = createAsyncThunk(
	"trackList/fetchTracks",
	async () => {
		const response = await axios.get(`${process.env.REACT_APP_API}/tracks`);
		return response.data;
	}
);

export const trackListSlice = createSlice({
	name: "trackList",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchTracks.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchTracks.fulfilled,
				(state, action: PayloadAction<ITrack[]>) => {
					state.status = "succeeded";
					state.trackList = action.payload;
				}
			)
			.addCase(fetchTracks.rejected, (state) => {
				state.status = "failed";
			});
	},
});

// Action creators are generated for each case reducer function
export const {} = trackListSlice.actions;

export default trackListSlice.reducer;
