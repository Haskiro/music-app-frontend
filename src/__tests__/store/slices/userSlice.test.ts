import { IAccessToken, IUser } from "@interfaces/user.interface";
import axios from "axios";
import userReducer, {
	logout,
	editUser,
	UserState,
	authUser,
	ILoginData,
	IRegisterData,
	registerUser,
	fetchUser,
	updateUser,
} from "../../../store/slices/userSlice";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("User Reducer", () => {
	const initialState: UserState = {
		user: null,
		accessToken: null,
		status: "idle",
		authStatus: "idle",
	};

	const currenState: UserState = {
		user: {
			first_name: "Pavel",
		} as IUser,
		accessToken: "token",
		status: "succeeded",
		authStatus: "succeeded",
	};

	it("should return default state when we pass empty action", () => {
		const state = userReducer(undefined, { type: "" });

		expect(state).toStrictEqual(initialState);
	});

	it('should set state with default values when we pass "logout" actions', () => {
		const state = userReducer(currenState, { type: logout.type });

		expect(state).toStrictEqual(initialState);
	});

	it('should change user when we pass "editUser" action', () => {
		const newUser = {
			first_name: "Ivan",
		} as IUser;

		const state = userReducer(currenState, {
			type: editUser.type,
			payload: newUser,
		});

		expect(state.user).toStrictEqual(newUser);
	});

	describe("Auth User Thunk", () => {
		const loginData: ILoginData = {
			email: "email@email.email",
			password: "password",
		};

		it("should authUser with resolved response", async () => {
			const mockToken: IAccessToken = {
				access: "accessToken",
			};

			mockedAxios.post.mockImplementation(() =>
				Promise.resolve({ data: mockToken })
			);
			const dispatch = jest.fn();
			const thunk = authUser(loginData);

			await thunk(dispatch, () => undefined, undefined);
			const { calls } = dispatch.mock;
			const [start, end] = calls;

			expect(calls).toHaveLength(2);
			expect(start[0].type).toBe("user/authUser/pending");
			expect(end[0].type).toBe("user/authUser/fulfilled");
			expect(end[0].payload).toStrictEqual(mockToken);
		});

		it("should authUser with resolved response", async () => {
			mockedAxios.post.mockImplementation(() =>
				Promise.reject("fetch error")
			);
			const dispatch = jest.fn();
			const thunk = authUser(loginData);

			await thunk(dispatch, () => undefined, undefined);

			const { calls } = dispatch.mock;
			const [start, end] = calls;

			expect(calls).toHaveLength(2);
			expect(start[0].type).toBe("user/authUser/pending");
			expect(end[0].type).toBe("user/authUser/rejected");
			expect(end[0].error.message).toBe("fetch error");
		});

		describe("Extra reducers", () => {
			it('should change authStatus if "authUser.pending" action', () => {
				const state = userReducer(initialState, {
					type: "user/authUser/pending",
				});

				expect(state.authStatus).toBe("loading");
			});

			it('should change authStatus and accessToken if "authUser.fulfilled" action', () => {
				const state = userReducer(initialState, {
					type: "user/authUser/fulfilled",
					payload: { access: "accessToken" },
				});

				expect(state.accessToken).toBe("accessToken");
				expect(state.authStatus).toBe("succeeded");
			});
			it('should change authStatus if "authUser.rejected" action', () => {
				const state = userReducer(initialState, {
					type: "user/authUser/rejected",
				});

				expect(state.authStatus).toBe("failed");
			});
		});
	});

	describe("Register User Thunk", () => {
		const registerData: IRegisterData = {
			email: "email@email.email",
			password: "password",
			first_name: "Pavel",
			last_name: "Surname",
		};

		it("should registerUser with resolved response", async () => {
			const mockToken: IAccessToken = {
				access: "accessToken",
			};

			mockedAxios.post.mockImplementation(() =>
				Promise.resolve({ data: mockToken })
			);
			const dispatch = jest.fn();
			const thunk = registerUser(registerData);

			await thunk(dispatch, () => undefined, undefined);
			const { calls } = dispatch.mock;
			const [start, end] = calls;

			expect(calls).toHaveLength(2);
			expect(start[0].type).toBe("user/registerUser/pending");
			expect(end[0].type).toBe("user/registerUser/fulfilled");
			expect(end[0].payload).toStrictEqual(mockToken);
		});

		it("should registerUser with rejected response", async () => {
			mockedAxios.post.mockImplementation(() =>
				Promise.reject("fetch error")
			);
			const dispatch = jest.fn();
			const thunk = registerUser(registerData);

			await thunk(dispatch, () => undefined, undefined);

			const { calls } = dispatch.mock;
			const [start, end] = calls;

			expect(calls).toHaveLength(2);
			expect(start[0].type).toBe("user/registerUser/pending");
			expect(end[0].type).toBe("user/registerUser/rejected");
			expect(end[0].error.message).toBe("fetch error");
		});

		describe("Extra reducers", () => {
			it('should change authStatus if "registerUser.pending" action', () => {
				const state = userReducer(initialState, {
					type: "user/registerUser/pending",
				});

				expect(state.authStatus).toBe("loading");
			});

			it('should change authStatus and accessToken if "registerUser.fulfilled" action', () => {
				const state = userReducer(initialState, {
					type: "user/registerUser/fulfilled",
					payload: { access: "accessToken" },
				});

				expect(state.accessToken).toBe("accessToken");
				expect(state.authStatus).toBe("succeeded");
			});
			it('should change authStatus if "registerUser.rejected" action', () => {
				const state = userReducer(initialState, {
					type: "user/registerUser/rejected",
				});

				expect(state.authStatus).toBe("failed");
			});
		});
	});

	describe("Fetch User Thunk", () => {
		const mockUser: IUser = {
			first_name: "Pavel",
			last_name: "Surname",
			bio: "",
			email: "email@email.email",
			photo: "",
		};

		it("should fetchUser with resolved response", async () => {
			mockedAxios.get.mockImplementation(() =>
				Promise.resolve({ data: mockUser })
			);
			const dispatch = jest.fn();
			const thunk = fetchUser();
			const getState = jest.fn().mockReturnValue({
				user: {
					user: null,
					accessToken: "accessToken",
					status: "idle",
					authStatus: "succeeded",
				},
			});

			await thunk(dispatch, getState, undefined);
			const { calls } = dispatch.mock;
			const [start, end] = calls;

			expect(calls).toHaveLength(2);
			expect(start[0].type).toBe("user/fetchUser/pending");
			expect(end[0].type).toBe("user/fetchUser/fulfilled");
			expect(end[0].payload).toStrictEqual(mockUser);
		});

		it("should fetchUser with rejected response", async () => {
			mockedAxios.get.mockImplementation(() =>
				Promise.reject("fetch error")
			);
			const dispatch = jest.fn();
			const thunk = fetchUser();
			const getState = jest.fn().mockReturnValue({
				user: {
					user: null,
					accessToken: "accessToken",
					status: "idle",
					authStatus: "succeeded",
				},
			});

			await thunk(dispatch, getState, undefined);
			const { calls } = dispatch.mock;
			const [start, end] = calls;

			expect(calls).toHaveLength(2);
			expect(start[0].type).toBe("user/fetchUser/pending");
			expect(end[0].type).toBe("user/fetchUser/rejected");
			expect(end[0].error.message).toBe("fetch error");
		});

		describe("Extra reducers", () => {
			it('should change status if "fetchUser.pending" action', () => {
				const state = userReducer(initialState, {
					type: "user/fetchUser/pending",
				});

				expect(state.status).toBe("loading");
			});

			it('should change status and user if "fetchUser.fulfilled" action', () => {
				const state = userReducer(initialState, {
					type: "user/fetchUser/fulfilled",
					payload: mockUser,
				});

				expect(state.user).toStrictEqual(mockUser);
				expect(state.status).toBe("succeeded");
			});
			it('should change status if "fetchUser.rejected" action', () => {
				const state = userReducer(initialState, {
					type: "user/fetchUser/rejected",
				});

				expect(state.status).toBe("failed");
			});
		});
	});

	describe("Update User Thunk", () => {
		const currentUser: IUser = {
			first_name: "Pavel",
			last_name: "Surname",
			bio: "",
			email: "email@email.email",
			photo: "",
		};

		it("should update with resolved response", async () => {
			mockedAxios.patch.mockImplementation(() =>
				Promise.resolve({ data: { message: "user updated" } })
			);
			const dispatch = jest.fn();
			const thunk = updateUser({ ...currentUser, bio: "New Biography" });
			const getState = jest.fn().mockReturnValue({
				user: {
					user: currentUser,
					accessToken: "accessToken",
					status: "succeeded",
					authStatus: "succeeded",
				},
			});

			await thunk(dispatch, getState, undefined);
			const { calls } = dispatch.mock;

			expect(calls).toHaveLength(3);

			expect(calls[0][0].type).toBe("user/updateUser/pending");
			expect(calls[1][0].type).toBe(editUser.type);
			expect(calls[1][0].payload).toStrictEqual({
				...currentUser,
				bio: "New Biography",
			});
			expect(calls[2][0].type).toBe("user/updateUser/fulfilled");
			expect(calls[2][0].payload).toStrictEqual({
				message: "user updated",
			});
		});

		it("should updateUser with rejected response", async () => {
			mockedAxios.patch.mockImplementation(() =>
				Promise.reject("fetch error")
			);
			const dispatch = jest.fn();
			const thunk = updateUser({ ...currentUser, bio: "New Biography" });
			const getState = jest.fn().mockReturnValue({
				user: {
					user: currentUser,
					accessToken: "accessToken",
					status: "succeeded",
					authStatus: "succeeded",
				},
			});

			await thunk(dispatch, getState, undefined);
			const { calls } = dispatch.mock;

			expect(calls).toHaveLength(2);
			expect(calls[0][0].type).toBe("user/updateUser/pending");
			expect(calls[1][0].type).toBe("user/updateUser/rejected");
			expect(calls[1][0].error.message).toBe("fetch error");
		});

		describe("Extra reducers", () => {
			it('should change status if "updateUser.pending" action', () => {
				const state = userReducer(initialState, {
					type: "user/updateUser/pending",
				});

				expect(state.status).toBe("loading");
			});

			it('should change status if "updateUser.fulfilled" action', () => {
				const state = userReducer(initialState, {
					type: "user/updateUser/fulfilled",
					payload: { message: "user updated" },
				});

				expect(state.status).toBe("succeeded");
			});
			it('should change status if "updateUser.rejected" action', () => {
				const state = userReducer(initialState, {
					type: "user/updateUser/rejected",
				});

				expect(state.status).toBe("failed");
			});
		});
	});
});
