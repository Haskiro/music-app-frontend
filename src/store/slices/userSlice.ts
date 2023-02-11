import { IAccessToken, IUser } from "@interfaces/user.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@store/store";
import axios from "axios";

export interface UserState {
	user: IUser | null;
	accessToken: string | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	authStatus: "idle" | "loading" | "succeeded" | "failed";
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
	authStatus: "idle",
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
>("user/fetchUser", async (_, thunkApi) => {
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

export const updateUser = createAsyncThunk<
	{ message: string },
	IUser,
	{ dispatch: AppDispatch; state: RootState }
>("user/updateUser", async (updateData, thunkApi) => {
	const state = thunkApi.getState();
	const response = await axios.patch(
		`${process.env.REACT_APP_API}/auth/update/`,
		updateData,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + state.user.accessToken,
			},
		}
	);
	const dispatch = thunkApi.dispatch;
	dispatch(editUser(updateData));

	return response.data;
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.accessToken = null;
			state.user = null;
			state.status = "idle";
			state.authStatus = "idle";
		},
		editUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(authUser.pending, (state) => {
				state.authStatus = "loading";
			})
			.addCase(
				authUser.fulfilled,
				(state, action: PayloadAction<IAccessToken>) => {
					state.authStatus = "succeeded";
					state.accessToken = action.payload.access;
				}
			)
			.addCase(authUser.rejected, (state) => {
				state.authStatus = "failed";
			})
			.addCase(registerUser.pending, (state) => {
				state.authStatus = "loading";
			})
			.addCase(
				registerUser.fulfilled,
				(state, action: PayloadAction<IAccessToken>) => {
					state.authStatus = "succeeded";
					state.accessToken = action.payload.access;
				}
			)
			.addCase(registerUser.rejected, (state) => {
				state.authStatus = "failed";
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
			})
			.addCase(updateUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateUser.fulfilled, (state) => {
				state.status = "succeeded";
			})
			.addCase(updateUser.rejected, (state) => {
				state.status = "failed";
			});
	},
});

// Action creators are generated for each case reducer function
export const { logout, editUser } = userSlice.actions;

export default userSlice.reducer;
