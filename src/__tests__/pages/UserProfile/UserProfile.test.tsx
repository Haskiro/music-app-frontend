import { IUser } from "@interfaces/user.interface";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserProfile from "../../../pages/UserProfile";
import * as reduxHooks from "../../../store/hooks";
import * as actions from "../../../store/slices/userSlice";

jest.mock("../../../store/hooks");
jest.mock("antd", () => {
	const originalModule = jest.requireActual("antd");
	return {
		__esModule: true,
		...originalModule,
		Spin: () => <div data-testid="Spin" />,
	};
});
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // Deprecated
		removeListener: jest.fn(), // Deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

const mockedUseAppDispatch = jest.spyOn(reduxHooks, "useAppDispatch");
const mockedUseAppSelector = jest.spyOn(reduxHooks, "useAppSelector");
const mockedFetchUser = jest.spyOn(actions, "fetchUser");
const mockedUpdateUser = jest.spyOn(actions, "updateUser");

describe("User Profile", () => {
	const mockUser: IUser = {
		first_name: "Pavel",
		last_name: "Surname",
		bio: "",
		email: "email@email.email",
		photo: "",
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should create user profile page with user data", () => {
		mockedUseAppDispatch.mockReturnValue(jest.fn());
		mockedUseAppSelector.mockReturnValueOnce(mockUser);
		mockedUseAppSelector.mockReturnValueOnce("succeeded");

		const page = render(<UserProfile />);

		expect(page).toMatchSnapshot();
	});

	it("should render spinner", () => {
		mockedUseAppDispatch.mockReturnValue(jest.fn());
		mockedUseAppSelector.mockReturnValueOnce({});
		mockedUseAppSelector.mockReturnValueOnce("loading");

		render(<UserProfile />);

		expect(screen.getByTestId("Spin")).toBeInTheDocument();
	});

	it("should dispatch action fetchUser", () => {
		const dispatch = jest.fn();
		mockedUseAppDispatch.mockReturnValue(dispatch);
		mockedUseAppSelector.mockReturnValueOnce(mockUser);
		mockedUseAppSelector.mockReturnValueOnce("succeeded");

		render(<UserProfile />);

		expect(dispatch).toHaveBeenCalledTimes(1);
		expect(mockedFetchUser).toHaveBeenCalledTimes(1);
	});

	it("should dispatch action updateUser on clicking submit button", async () => {
		const user = userEvent.setup();
		const dispatch = jest.fn();
		mockedUseAppDispatch.mockReturnValue(dispatch);
		mockedUseAppSelector.mockReturnValueOnce(mockUser);
		mockedUseAppSelector.mockReturnValueOnce("succeeded");

		render(<UserProfile />);
		const button = screen.getByText("Отправить");
		await user.click(button);

		expect(dispatch).toHaveBeenCalledTimes(2);
		expect(mockedUpdateUser).toHaveBeenCalledTimes(1);
		expect(mockedUpdateUser).toHaveBeenCalledWith({
			...mockUser,
			photo: "",
		});
	});

	it("should set form field with default values on clicking reset button", async () => {
		const user = userEvent.setup();
		const dispatch = jest.fn();
		mockedUseAppDispatch.mockReturnValue(dispatch);
		mockedUseAppSelector.mockReturnValueOnce(mockUser);
		mockedUseAppSelector.mockReturnValueOnce("succeeded");

		render(<UserProfile />);
		const button = screen.getByText("Отменить изменения");
		const nameField = screen.getByLabelText("Имя");
		const surnameField = screen.getByLabelText("Фамилия");

		await user.type(nameField, "Ivan");
		await user.type(surnameField, "Ivanov");
		await user.click(button);

		expect(nameField).toHaveValue(mockUser.first_name);
		expect(surnameField).toHaveValue(mockUser.last_name);
	});
});
