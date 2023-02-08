import { screen, render, cleanup } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import ControlPanel from "./ControlPanel";
import styles from "./ControlPanel.module.scss";

describe("Control Panel", () => {
	const onSearch = jest.fn();
	const onSort = jest.fn();
	const onUpdate = jest.fn();

	it("should render something", () => {
		const { container } = render(
			<ControlPanel
				onSearch={onSearch}
				onSort={onSort}
				onUpdate={onUpdate}
				sortByAlphabet={false}
			/>
		);

		expect(container.firstChild).toBeInTheDocument();

		cleanup();
	});

	describe("Correct render", () => {
		it("should render correct properties based on props", () => {
			const { rerender } = render(
				<ControlPanel
					onSearch={onSearch}
					onSort={onSort}
					onUpdate={onUpdate}
					sortByAlphabet={false}
				/>
			);

			expect(screen.getByTestId("sortButton")).not.toHaveClass(
				styles.controlButtonsItemChecked
			);

			rerender(
				<ControlPanel
					onSearch={onSearch}
					onSort={onSort}
					onUpdate={onUpdate}
					sortByAlphabet={true}
				/>
			);

			expect(screen.getByTestId("sortButton")).toHaveClass(
				styles.controlButtonsItemChecked
			);

			cleanup();
		});
	});

	describe("Correct mock calls", () => {
		afterEach(() => {
			jest.clearAllMocks();
			cleanup();
		});

		it("should onSearch mock calls correct times", async () => {
			const user = userEvent.setup();
			render(
				<ControlPanel
					onSearch={onSearch}
					onSort={onSort}
					onUpdate={onUpdate}
					sortByAlphabet={false}
				/>
			);
			const button = screen.getByRole("button", { name: "Поиск" });

			await user.click(button);

			expect(onSearch).toHaveBeenCalledTimes(1);

			await user.click(button);

			expect(onSearch).toHaveBeenCalledTimes(2);
		});

		it("should onUpdate mock calls correct times", async () => {
			const user = userEvent.setup();
			render(
				<ControlPanel
					onSearch={onSearch}
					onSort={onSort}
					onUpdate={onUpdate}
					sortByAlphabet={false}
				/>
			);
			const button = screen.getByRole("button", { name: "Обновить" });

			await user.click(button);

			expect(onUpdate).toHaveBeenCalledTimes(1);

			await user.click(button);

			expect(onUpdate).toHaveBeenCalledTimes(2);
		});

		it("should onUpdate mock calls correct times", async () => {
			const user = userEvent.setup();
			render(
				<ControlPanel
					onSearch={onSearch}
					onSort={onSort}
					onUpdate={onUpdate}
					sortByAlphabet={false}
				/>
			);
			const button = screen.getByRole("button", { name: "По Алфавиту" });

			await user.click(button);

			expect(onSort).toHaveBeenCalledTimes(1);

			await user.click(button);

			expect(onSort).toHaveBeenCalledTimes(2);
		});
	});
});
