import { render } from "@testing-library/react";
import * as reduxHooks from "../../store/hooks";
import * as actions from "../../store/slices/trackListSlice";
import TrackListPage from "./TrackListPage";

jest.mock("../../store/hooks");

/** 
	const mockedUseAppSelector = jest.fn(() => []);
	jest.mock("../../store/hooks", () => ({
		useAppSelector: () => mockedUseAppSelector(),
	}));
*/

/** 
 	const mockedUseAppSelector = useAppSelector as jest.Mocked<
		typeof useAppSelector
	>; 
*/

const mockedUseAppSelector = jest.spyOn(reduxHooks, "useAppSelector");
const mockedUseAppDispatch = jest.spyOn(reduxHooks, "useAppDispatch");

describe("Track List Page", () => {
	it("should create Track list page with empty tracks", () => {
		// Only js files, no typescript
		// mockedUseAppSelector.mockReturnValue([]);

		mockedUseAppSelector.mockReturnValue([]);
		mockedUseAppDispatch.mockReturnValue(jest.fn());
		const component = render(<TrackListPage />);

		expect(component).toMatchSnapshot();
	});
});
