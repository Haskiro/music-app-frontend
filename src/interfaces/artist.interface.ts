import { IAlbum } from "./album.interface";
import { ITrack } from "./track.interface";

export interface IArtist {
	id: number;
	tracks_data: ITrack[];
	albums_data: IAlbum[];
	nickname: string;
	first_name: string;
	last_name: string;
	bio: string;
	birth_date: string;
	photo: string;
}
