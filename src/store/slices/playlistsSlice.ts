import { IPlaylist } from "@interfaces/playlist.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface playlistsState {
	playlists: IPlaylist[] | null;
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: playlistsState = {
	playlists: null,
	status: "idle",
};

export const fetchPlaylists = createAsyncThunk(
	"playlists/fetchPlaylists",
	async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_API}/playlists`
		);
		return response.data;
	}
);

export const playlistsSlice = createSlice({
	name: "playlists",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchPlaylists.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchPlaylists.fulfilled,
				(state, action: PayloadAction<IPlaylist[]>) => {
					state.status = "succeeded";
					state.playlists = action.payload;
				}
			)
			.addCase(fetchPlaylists.rejected, (state) => {
				state.status = "failed";
			});
	},
});

// Action creators are generated for each case reducer function
export const {} = playlistsSlice.actions;

export default playlistsSlice.reducer;
