import { FC, useEffect, useMemo } from "react";
import Card from "@components/Card";
import useControlPanel from "@hooks/useControlPanel";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchArtists } from "@store/slices/artistListSlice";
import filterItemList from "@utils/filterItemList";
import { Input, Spin } from "antd";
import cn from "classnames";
import styles from "./ArtistListPage.module.scss";

const ArtistListPage: FC = () => {
	const { Search } = Input;
	const dispatch = useAppDispatch();
	const artists = useAppSelector((state) => state.artistList.artistList);
	const status = useAppSelector((state) => state.artistList.status);
	const { searchValue, sortByAlphabet, onSearch, onSort, onUpdate } =
		useControlPanel(fetchArtists);

	useEffect(() => {
		dispatch(fetchArtists());
	}, []);

	const filteredArtists = useMemo(() => {
		let filteredArtists = artists.slice();

		return filterItemList(
			filteredArtists,
			searchValue,
			sortByAlphabet,
			"nickname"
		);
	}, [artists, sortByAlphabet, searchValue]);

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Исполнители</h1>
			<div className={styles.controlPanel}>
				<Search
					className={styles.controlInput}
					placeholder="Введите никнейм артиста"
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
				filteredArtists.length === 0 ? (
					<p className={styles.result}>Ничего не найдено</p>
				) : (
					<ul className={styles.list}>
						{filteredArtists.map((artist) => (
							<li className={styles.item} key={artist.id}>
								<Card
									title={artist.nickname}
									image={artist.photo}
									target={`/artists/${artist.id}`}
									alt="Фото Исполнителя"
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

export default ArtistListPage;
