import { IArtist } from "@interfaces/artist.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface artistListState {
	artistList: IArtist[];
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: artistListState = {
	artistList: [],
	status: "idle",
};

export const fetchArtists = createAsyncThunk(
	"artistList/fetchArtists",
	async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_API}/artists`
		);
		return response.data;
	}
);

export const artistListSlice = createSlice({
	name: "artistList",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchArtists.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchArtists.fulfilled,
				(state, action: PayloadAction<IArtist[]>) => {
					state.status = "succeeded";
					state.artistList = action.payload;
				}
			)
			.addCase(fetchArtists.rejected, (state) => {
				state.status = "failed";
			});
	},
});

// Action creators are generated for each case reducer function
export const {} = artistListSlice.actions;

export default artistListSlice.reducer;
