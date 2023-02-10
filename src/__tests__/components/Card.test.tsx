import { render, cleanup, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Card from "../../components/Card";

describe("Card", () => {
	const cardProps = {
		title: "Title",
		image: "image_src",
		target: "link",
		alt: "alt",
	};

	it("should render something", () => {
		const { container } = render(<Card {...cardProps} />, {
			wrapper: MemoryRouter,
		});
		expect(container.firstChild).toBeInTheDocument();
	});
	describe("Correct render", () => {
		beforeEach(() => {
			render(<Card {...cardProps} />, { wrapper: MemoryRouter });
		});

		afterEach(cleanup);

		it("should render correct title", () => {
			expect(screen.getByTestId("title")).toHaveTextContent(
				cardProps.title
			);
		});
		it("should render correct image src", () => {
			expect(screen.getByRole("img")).toHaveAttribute(
				"src",
				cardProps.image
			);
		});
		it("should render image alt", () => {
			expect(screen.getByRole("img")).toHaveAttribute(
				"alt",
				cardProps.alt
			);
		});
		it("should render correct link route", () => {
			expect(screen.getByRole("link")).toHaveAttribute(
				"href",
				`/${cardProps.target}`
			);
		});
	});
});
