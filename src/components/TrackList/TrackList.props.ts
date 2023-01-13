import { trackListState } from "@store/slices/trackListSlice";

export interface ITrackListProps extends trackListState {
	heading?: string;
}
