import { ITrack } from "./track.interface";

export interface IGenre {
	id: number;
	tracks_data: ITrack[];
	title: string;
	description: string;
	cover: string;
}
