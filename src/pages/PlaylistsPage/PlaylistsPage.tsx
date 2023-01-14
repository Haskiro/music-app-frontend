import { FC, useEffect, useMemo } from "react";
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
	const playlists = useAppSelector((state) => state.playlists.playlists);
	const status = useAppSelector((state) => state.playlists.status);
	const { searchValue, sortByAlphabet, onSearch, onSort, onUpdate } =
		useControlPanel(fetchPlaylists);

	useEffect(() => {
		dispatch(fetchPlaylists());
		// eslint-disable-next-line
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
		</div>
	);
};

export default PlaylistsPage;
