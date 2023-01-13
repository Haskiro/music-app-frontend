import { FC, useEffect } from "react";
import Card from "@components/Card";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchArtists } from "@store/slices/artistListSlice";
import { Spin } from "antd";
import styles from "./ArtistListPage.module.scss";

const ArtistListPage: FC = () => {
	const dispatch = useAppDispatch();
	const artists = useAppSelector((state) => state.artistList.artistList);
	const status = useAppSelector((state) => state.artistList.status);

	useEffect(() => {
		dispatch(fetchArtists());
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Исполнители</h1>
			{status === "succeeded" ? (
				<ul className={styles.list}>
					{artists?.map((artist) => (
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
