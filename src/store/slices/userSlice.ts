import { IAccessToken, IUser } from "@interfaces/user.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";

export interface UserState {
	user: IUser | null;
	accessToken: string | null;
	status: "idle" | "loading" | "succeeded" | "failed";
}

export interface ILoginData {
	email: string;
	password: string;
}

export interface IRegisterData extends ILoginData {
	last_name: string;
	first_name: string;
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
			`${process.env.REACT_APP_API}/auth/login/`,
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

export const registerUser = createAsyncThunk(
	"user/registerUser",
	async (registerData: IRegisterData) => {
		const response = await axios.post(
			`${process.env.REACT_APP_API}/auth/register/`,
			registerData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	}
);

export const fetchUser = createAsyncThunk<
	IUser,
	undefined,
	{ state: RootState }
>("user/fetchUser", async (undefined, thunkApi) => {
	const state = thunkApi.getState();
	const response = await axios.get(`${process.env.REACT_APP_API}/auth/me/`, {
		headers: {
			Authorization: "Bearer " + state.user.accessToken,
		},
	});
	return response.data.photo
		? {
				...response.data,
				photo: `${process.env.REACT_APP_DOMAIN}${response.data.photo}`,
		  }
		: response.data;
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.accessToken = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(authUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				authUser.fulfilled,
				(state, action: PayloadAction<IAccessToken>) => {
					state.status = "succeeded";
					state.accessToken = action.payload.access;
				}
			)
			.addCase(authUser.rejected, (state) => {
				state.status = "failed";
			})
			.addCase(registerUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				registerUser.fulfilled,
				(state, action: PayloadAction<IAccessToken>) => {
					state.status = "succeeded";
					state.accessToken = action.payload.access;
				}
			)
			.addCase(registerUser.rejected, (state) => {
				state.status = "failed";
			})
			.addCase(fetchUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				fetchUser.fulfilled,
				(state, action: PayloadAction<IUser>) => {
					state.status = "succeeded";
					state.user = action.payload;
				}
			)
			.addCase(fetchUser.rejected, (state) => {
				state.status = "failed";
			});
	},
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
