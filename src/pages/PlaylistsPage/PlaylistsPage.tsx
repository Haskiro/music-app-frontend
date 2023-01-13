import { FC, useEffect, useMemo, useState } from "react";
import Card from "@components/Card";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchPlaylists } from "@store/slices/playlistsSlice";
import { Input, Spin } from "antd";
import cn from "classnames";
import styles from "./PlaylistsPage.module.scss";
const { Search } = Input;

const PlaylistsPage: FC = () => {
	const dispatch = useAppDispatch();
	const [sortByAlphabet, setSortByAlphabet] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>("");
	const playlists = useAppSelector((state) => state.playlists.playlists);
	const status = useAppSelector((state) => state.playlists.status);

	useEffect(() => {
		dispatch(fetchPlaylists());
	}, []);

	const filteredPlaylists = useMemo(() => {
		let filteredPlaylists = playlists?.slice();

		if (searchValue) {
			filteredPlaylists = filteredPlaylists?.filter((playlist) =>
				playlist.title.toLowerCase().includes(searchValue)
			);
		}

		if (!sortByAlphabet) return filteredPlaylists;
		return filteredPlaylists?.sort((a, b) => {
			const textA = a.title.toUpperCase();
			const textB = b.title.toUpperCase();

			return textA < textB ? -1 : textA > textB ? 1 : 0;
		});
	}, [playlists, sortByAlphabet, searchValue]);

	const onSearch = (searchValue: string) => {
		setSearchValue(searchValue.toLowerCase());
	};

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
						onClick={() =>
							setSortByAlphabet((prevState) => !prevState)
						}
					>
						По Алфавиту
					</button>
					<button
						className={styles.controlButtonsItem}
						onClick={() => dispatch(fetchPlaylists())}
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
