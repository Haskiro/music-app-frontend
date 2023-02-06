import { ITrack } from "@interfaces/track.interface";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TrackCard from "./TrackCard";

describe("Track", () => {
	const track: ITrack = {
		id: 1,
		title: "Track title",
		cover: "cover link",
		audio_file: "audio file link",
		artists_data: [
			{
				id: 1,
				nickname: "Artist 1",
			},
			{
				id: 2,
				nickname: "Artist 2",
			},
		],
		released_at: "06-02-2023",
	};

	it("should render something", () => {
		const { container } = render(<TrackCard track={track} />, {
			wrapper: MemoryRouter,
		});
		expect(container.firstChild).toBeInTheDocument();
	});

	describe("Correct render", () => {
		beforeEach(() => {
			render(<TrackCard track={track} />, {
				wrapper: MemoryRouter,
			});
		});

		afterEach(() => {
			cleanup();
		});

		it("should render correct title", () => {
			const title = screen.getByTestId("title").textContent;

			expect(title).toBe(track.title);
		});

		it("should render correct image src", () => {
			const image = screen.getByRole("img");

			expect(image).toHaveAttribute("src", track.cover);
		});

		it("should render correct links", () => {
			const links = screen.getAllByRole("link");

			links.forEach((link, i) => {
				const artist = track.artists_data[i];

				expect(link).toHaveAttribute("href", `/artists/${artist.id}`);

				expect(link.textContent?.trim()).toBe(artist.nickname);
			});
		});

		it("should render correct audio file src", () => {
			const audio = screen.getByTestId("audio");

			expect(audio).toHaveAttribute("src", track.audio_file);
		});
	});
});
