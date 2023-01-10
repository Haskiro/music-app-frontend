import { IGenre } from "@interfaces/genre.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface genreListState {
	genreList: IGenre[] | null;
	status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: genreListState = {
	genreList: null,
	status: "idle",
};

export const fetchGenres = createAsyncThunk(
	"genreList/fetchGenres",
	async () => {
		const response = await axios.get(`${process.env.REACT_APP_API}/genres`);
		return response.data;
	}
);

export const genreListSlice = createSlice({
	name: "genreList",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchGenres.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchGenres.fulfilled,
				(state, action: PayloadAction<IGenre[]>) => {
					state.status = "succeeded";
					state.genreList = action.payload;
				}
			)
			.addCase(fetchGenres.rejected, (state) => {
				state.status = "failed";
			});
	},
});

// Action creators are generated for each case reducer function
export const {} = genreListSlice.actions;

export default genreListSlice.reducer;
