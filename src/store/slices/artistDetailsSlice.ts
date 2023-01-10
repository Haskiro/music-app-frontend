import { IArtist } from "@interfaces/artist.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface artistDetailsState {
	artist: IArtist | null;
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: artistDetailsState = {
	artist: null,
	status: "idle",
};

export const fetchArtistById = createAsyncThunk(
	"artistDetails/fetchArtist",
	async (id: string) => {
		const response = await axios.get(
			`${process.env.REACT_APP_API}/artists/${id}`
		);
		return response.data;
	}
);

export const artistDetailsSlice = createSlice({
	name: "artistDetails",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchArtistById.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchArtistById.fulfilled,
				(state, action: PayloadAction<IArtist>) => {
					state.status = "succeeded";
					state.artist = action.payload;
				}
			)
			.addCase(fetchArtistById.rejected, (state) => {
				state.status = "failed";
			});
	},
});

// Action creators are generated for each case reducer function
export const {} = artistDetailsSlice.actions;

export default artistDetailsSlice.reducer;
