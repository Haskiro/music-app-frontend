import { IPlaylist } from "@interfaces/playlist.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface playlistDetailsState {
	playlist: IPlaylist | null;
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: playlistDetailsState = {
	playlist: null,
	status: "idle",
};

export const fetchPlaylistById = createAsyncThunk(
	"playlistDetails/fetchPlaylist",
	async (id: string) => {
		const response = await axios.get(
			`${process.env.REACT_APP_API}/playlists/${id}`
		);
		return response.data;
	}
);

export const playlistDetailsSlice = createSlice({
	name: "playlistDetails",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchPlaylistById.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchPlaylistById.fulfilled,
				(state, action: PayloadAction<IPlaylist>) => {
					state.status = "succeeded";
					state.playlist = action.payload;
				}
			)
			.addCase(fetchPlaylistById.rejected, (state) => {
				state.status = "failed";
			});
	},
});

// Action creators are generated for each case reducer function
export const {} = playlistDetailsSlice.actions;

export default playlistDetailsSlice.reducer;
