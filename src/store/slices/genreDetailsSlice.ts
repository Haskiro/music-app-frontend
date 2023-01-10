import { IGenre } from "@interfaces/genre.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface genreDetailsState {
	genre: IGenre | null;
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: genreDetailsState = {
	genre: null,
	status: "idle",
};

export const fetchGenreById = createAsyncThunk(
	"genreDetails/fetchGenreById",
	async (id: string) => {
		const response = await axios.get(
			`${process.env.REACT_APP_API}/genres/${id}`
		);
		return response.data;
	}
);

export const genreDetailsSlice = createSlice({
	name: "genreDetails",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchGenreById.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchGenreById.fulfilled,
				(state, action: PayloadAction<IGenre>) => {
					state.status = "succeeded";
					state.genre = action.payload;
				}
			)
			.addCase(fetchGenreById.rejected, (state) => {
				state.status = "failed";
			});
	},
});

// Action creators are generated for each case reducer function
export const {} = genreDetailsSlice.actions;

export default genreDetailsSlice.reducer;
