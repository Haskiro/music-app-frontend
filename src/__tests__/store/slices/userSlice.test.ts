import { IAccessToken, IUser } from "@interfaces/user.interface";
import { RootState } from "@store/store";
import axios from "axios";
import { PersistPartial } from "redux-persist/es/persistReducer";
import userReducer, {
	logout,
	editUser,
	UserState,
	authUser,
	ILoginData,
	IRegisterData,
	registerUser,
	fetchUser,
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

		it("should authUser with resolved response", async () => {
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
	});

	describe("Fetch User Thunk", () => {
		it("should fetchUser with resolved response", async () => {
			const mockUser: IUser = {
				first_name: "Pavel",
				last_name: "Surname",
				bio: "",
				email: "email@email.email",
				photo: "",
			};

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
	});
});
