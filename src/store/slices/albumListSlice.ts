import { IAlbum } from "@interfaces/album.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface albumListState {
	albumList: IAlbum[] | null;
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: albumListState = {
	albumList: null,
	status: "idle",
};

export const fetchAlbums = createAsyncThunk(
	"albumList/fetchAlbums",
	async () => {
		const response = await axios.get(`${process.env.REACT_APP_API}/albums`);
		return response.data;
	}
);

export const albumListSlice = createSlice({
	name: "artistList",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchAlbums.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchAlbums.fulfilled,
				(state, action: PayloadAction<IAlbum[]>) => {
					state.status = "succeeded";
					state.albumList = action.payload;
				}
			)
			.addCase(fetchAlbums.rejected, (state) => {
				state.status = "failed";
			});
	},
});

// Action creators are generated for each case reducer function
export const {} = albumListSlice.actions;

export default albumListSlice.reducer;
