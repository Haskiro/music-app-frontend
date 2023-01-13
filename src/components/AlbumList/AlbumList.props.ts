import { albumListState } from "@store/slices/albumListSlice";

export interface IAlbumListProps extends albumListState {
	heading?: string;
}
