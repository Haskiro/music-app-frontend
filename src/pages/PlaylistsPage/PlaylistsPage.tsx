import { FC, useEffect, useMemo } from "react";
import Card from "@components/Card";
import useControlPanel from "@hooks/useControlPanel";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchPlaylists } from "@store/slices/playlistsSlice";
import filterItemList from "@utils/filterItemList";
import { Input, Spin } from "antd";
import cn from "classnames";
import styles from "./PlaylistsPage.module.scss";

const PlaylistsPage: FC = () => {
	const { Search } = Input;
	const dispatch = useAppDispatch();
	const playlists = useAppSelector((state) => state.playlists.playlists);
	const status = useAppSelector((state) => state.playlists.status);
	const { searchValue, sortByAlphabet, onSearch, onSort, onUpdate } =
		useControlPanel(fetchPlaylists);

	useEffect(() => {
		dispatch(fetchPlaylists());
	}, []);

	const filteredPlaylists = useMemo(() => {
		let filteredPlaylists = playlists?.slice();

		return filterItemList(
			filteredPlaylists,
			searchValue,
			sortByAlphabet,
			"title"
		);
	}, [playlists, sortByAlphabet, searchValue]);

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Плейлисты </h1>
			<div className={styles.controlPanel}>
				<Search
					className={styles.controlInput}
					placeholder="Введите название плейлиста"
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
			{status === "succeeded" ? (
				filteredPlaylists?.length === 0 ? (
					<p className={styles.result}>Ничего не найдено</p>
				) : (
					<ul className={styles.list}>
						{filteredPlaylists?.map((playlist) => (
							<li className={styles.item} key={playlist.id}>
								<Card
									title={playlist.title}
									image={playlist.cover}
									target={`/playlists/${playlist.id}`}
									alt="Обложка Плейлиста"
								/>
							</li>
						))}
					</ul>
				)
			) : null}
			{status === "loading" ? (
				<Spin
					tip="Loading"
					size="large"
					style={{
						margin: "0px auto",
						display: "block",
						marginTop: "20px",
					}}
				/>
			) : null}
		</div>
	);
};

export default PlaylistsPage;
