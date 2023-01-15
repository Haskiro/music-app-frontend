import { IPlaylist } from "@interfaces/playlist.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface playlistsState {
	playlists: IPlaylist[];
	status: "idle" | "loading" | "succeeded" | "failed";
	count: string | number;
}

const initialState: playlistsState = {
	playlists: [],
	status: "idle",
	count: 0,
};

interface IFetchPlaylistsResult {
	count: number;
	results: IPlaylist[];
	next: string | null;
	previous: string | null;
}

export const fetchPlaylists = createAsyncThunk(
	"playlists/fetchPlaylists",
	async (page: number) => {
		const response = await axios.get(
			`${process.env.REACT_APP_API}/playlists/?page=${page}`
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
				(state, action: PayloadAction<IFetchPlaylistsResult>) => {
					state.status = "succeeded";
					state.playlists = action.payload.results;
					state.count = action.payload.count;
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
