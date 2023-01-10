export interface ArtistData {
	id: number;
	nickname: string;
}

export interface ITrack {
	id: number;
	artists_data: ArtistData[];
	title: string;
	audio_file: string;
	cover: string;
	released_at: string;
}
