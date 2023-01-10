import { FC, useEffect } from "react";
import TrackList from "@components/TrackList";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchTracks } from "@store/slices/trackListSlice";

const TrackListPage: FC = () => {
	const dispatch = useAppDispatch();
	const tracks = useAppSelector((state) => state.trackList.trackList);
	const status = useAppSelector((state) => state.trackList.status);

	useEffect(() => {
		dispatch(fetchTracks());
	}, []);

	return <TrackList trackList={tracks} status={status} />;
};

export default TrackListPage;
