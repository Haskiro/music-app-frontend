import { FC, useEffect, useMemo } from "react";
import ControlPanel from "../../components/ControlPanel";
import TrackList from "../../components/TrackList";
import useControlPanel from "../../hooks/useControlPanel";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTracks } from "../../store/slices/trackListSlice";
import filterItemList from "../../utils/filterItemList";
import styles from "./TrackListPage.module.scss";

const TrackListPage: FC = () => {
	const dispatch = useAppDispatch();
	const tracks = useAppSelector((state) => state.trackList.trackList);
	const status = useAppSelector((state) => state.trackList.status);
	const { searchValue, sortByAlphabet, onSearch, onSort, onUpdate } =
		useControlPanel(fetchTracks);

	useEffect(() => {
		dispatch(fetchTracks());
		// eslint-disable-next-line
	}, []);

	const filteredTracks = useMemo(() => {
		let filteredTracks = tracks.slice();

		return filterItemList(
			filteredTracks,
			searchValue,
			sortByAlphabet,
			"title"
		);
	}, [tracks, sortByAlphabet, searchValue]);

	return (
		<>
			<h1 className={styles.heading}>Треки</h1>
			<ControlPanel
				onSearch={onSearch}
				onSort={onSort}
				onUpdate={onUpdate}
				sortByAlphabet={sortByAlphabet}
			/>
			{filteredTracks.length === 0 ? (
				<p className={styles.result} data-testid="Plug">
					Ничего не найдено
				</p>
			) : (
				<TrackList trackList={filteredTracks} status={status} />
			)}
		</>
	);
};

export default TrackListPage;
