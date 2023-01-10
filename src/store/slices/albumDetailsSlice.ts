import { IAlbum } from "@interfaces/album.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface albumDetailsState {
	album: IAlbum | null;
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: albumDetailsState = {
	album: null,
	status: "idle",
};

export const fetchAlbumById = createAsyncThunk(
	"albumDetails/fetchAlbumById",
	async (id: string) => {
		const response = await axios.get(
			`${process.env.REACT_APP_API}/albums/${id}`
		);
		return response.data;
	}
);

export const albumDetailsSlice = createSlice({
	name: "albumDetails",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchAlbumById.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchAlbumById.fulfilled,
				(state, action: PayloadAction<IAlbum>) => {
					state.status = "succeeded";
					state.album = action.payload;
				}
			)
			.addCase(fetchAlbumById.rejected, (state) => {
				state.status = "failed";
			});
	},
});

// Action creators are generated for each case reducer function
export const {} = albumDetailsSlice.actions;

export default albumDetailsSlice.reducer;
