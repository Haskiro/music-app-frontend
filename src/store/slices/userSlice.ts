import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";

export interface IUser {
	email: string;
	first_name: string;
	last_name: string;
	photo: string;
	bio: string;
	is_active: boolean;
}

export interface UserState {
	user: IUser | null;
	accessToken: string | null;
	status: "idle" | "loading" | "succeeded" | "failed";
}

export interface ILoginData {
	email: string;
	password: string;
}

const initialState: UserState = {
	user: null,
	accessToken: null,
	status: "idle",
};

export const authUser = createAsyncThunk(
	"user/authUser",
	async (loginData: ILoginData) => {
		const response = await axios.post(
			`${process.env.REACT_APP_HOST}/auth/login/`,
			loginData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		// incrementByAmount: (state, action: PayloadAction<number>) => {
		// 	state.value += action.payload;
		// },
		logout: (state) => {
			state.accessToken = "";
		},
	},
	extraReducers(builder) {
		builder
			.addCase(authUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(authUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.accessToken = action.payload.access;
			})
			.addCase(authUser.rejected, (state) => {
				state.status = "failed";
			});
	},
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
