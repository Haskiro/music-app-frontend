export interface IArtist {
	id: number;
	nickname: string;
}

export interface ITrackList {
	id: number;
	artists_data: IArtist[];
	title: string;
	audio_file: string;
	cover: string;
	released_at: string;
}
