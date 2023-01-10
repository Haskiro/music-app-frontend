import { ITrack } from "./track.interface";

export interface IPlaylist {
	id: number;
	tracks_data: ITrack[];
	title: string;
	description: string;
	cover: string;
}
