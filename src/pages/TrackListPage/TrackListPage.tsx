import { FC, useEffect, useMemo } from "react";
import TrackList from "@components/TrackList";
import useControlPanel from "@hooks/useControlPanel";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchTracks } from "@store/slices/trackListSlice";
import filterItemList from "@utils/filterItemList";
import { Input } from "antd";
import cn from "classnames";
import styles from "./TrackListPage.module.scss";

const TrackListPage: FC = () => {
	const { Search } = Input;
	const dispatch = useAppDispatch();
	const tracks = useAppSelector((state) => state.trackList.trackList);
	const status = useAppSelector((state) => state.trackList.status);
	const { searchValue, sortByAlphabet, onSearch, onSort, onUpdate } =
		useControlPanel(fetchTracks);

	useEffect(() => {
		dispatch(fetchTracks());
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
			<div className={styles.controlPanel}>
				<Search
					className={styles.controlInput}
					placeholder="Введите название трека"
					allowClear
					enterButton="Поиск"
					size="large"
					onSearch={onSearch}
				/>
				<div className={styles.controlButtons}>
					<button
						className={cn(styles.controlButtonsItem, {
							[styles.controlButtonsItemChecked]: sortByAlphabet,
						})}
						onClick={onSort}
					>
						По Алфавиту
					</button>
					<button
						className={styles.controlButtonsItem}
						onClick={onUpdate}
					>
						Обновить
					</button>
				</div>
			</div>
			{filteredTracks.length === 0 ? (
				<p className={styles.result}>Ничего не найдено</p>
			) : (
				<TrackList trackList={filteredTracks} status={status} />
			)}
		</>
	);
};

export default TrackListPage;
