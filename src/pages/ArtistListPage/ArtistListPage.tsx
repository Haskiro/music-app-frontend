import { FC, useEffect, useMemo } from "react";
import Card from "@components/Card";
import ControlPanel from "@components/ControlPanel";
import useControlPanel from "@hooks/useControlPanel";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchArtists } from "@store/slices/artistListSlice";
import filterItemList from "@utils/filterItemList";
import { Spin } from "antd";
import styles from "./ArtistListPage.module.scss";

const ArtistListPage: FC = () => {
	const dispatch = useAppDispatch();
	const artists = useAppSelector((state) => state.artistList.artistList);
	const status = useAppSelector((state) => state.artistList.status);
	const { searchValue, sortByAlphabet, onSearch, onSort, onUpdate } =
		useControlPanel(fetchArtists);

	useEffect(() => {
		dispatch(fetchArtists());
		// eslint-disable-next-line
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
			<ControlPanel
				onSearch={onSearch}
				onSort={onSort}
				onUpdate={onUpdate}
				sortByAlphabet={sortByAlphabet}
			/>
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
