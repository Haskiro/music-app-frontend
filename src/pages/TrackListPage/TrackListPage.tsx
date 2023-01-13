import { FC, useEffect, useMemo, useState } from "react";
import TrackList from "@components/TrackList";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchTracks } from "@store/slices/trackListSlice";
import filterItemList from "@utils/filterItemList";
import { Input } from "antd";
import cn from "classnames";
import styles from "./TrackListPage.module.scss";

const TrackListPage: FC = () => {
	const { Search } = Input;
	const [sortByAlphabet, setSortByAlphabet] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>("");
	const dispatch = useAppDispatch();
	const tracks = useAppSelector((state) => state.trackList.trackList);
	const status = useAppSelector((state) => state.trackList.status);

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

	const onSearch = (searchValue: string) => {
		setSearchValue(searchValue.toLowerCase());
	};

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
						onClick={() =>
							setSortByAlphabet((prevState) => !prevState)
						}
					>
						По Алфавиту
					</button>
					<button
						className={styles.controlButtonsItem}
						onClick={() => dispatch(fetchTracks())}
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
