import { FC, useEffect, useMemo } from "react";
import { useState } from "react";
import Card from "@components/Card";
import ControlPanel from "@components/ControlPanel";
import useControlPanel from "@hooks/useControlPanel";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchPlaylists } from "@store/slices/playlistsSlice";
import filterItemList from "@utils/filterItemList";
import { Spin } from "antd";
import styles from "./PlaylistsPage.module.scss";

const PlaylistsPage: FC = () => {
	const dispatch = useAppDispatch();
	const [page, setPage] = useState<number>(1);
	const playlists = useAppSelector((state) => state.playlists.playlists);
	const status = useAppSelector((state) => state.playlists.status);
	const playlistsCount = useAppSelector((state) => state.playlists.count);
	const { searchValue, sortByAlphabet, onSearch, onSort, onUpdate } =
		useControlPanel(() => fetchPlaylists(page));

	useEffect(() => {
		dispatch(fetchPlaylists(page));
		// eslint-disable-next-line
	}, [page]);

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
			<ControlPanel
				onSearch={onSearch}
				onSort={onSort}
				onUpdate={onUpdate}
				sortByAlphabet={sortByAlphabet}
			/>
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
			<div className={styles.control}>
				<button
					className={styles.controlButton}
					disabled={page === 1}
					onClick={() => setPage((prevState) => prevState - 1)}
				>
					Назад
				</button>
				<button
					className={styles.controlButton}
					disabled={playlistsCount < page * 8}
					onClick={() => setPage((prevState) => prevState + 1)}
				>
					Вперед
				</button>
			</div>
		</div>
	);
};

export default PlaylistsPage;
