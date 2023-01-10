import { FC, useEffect } from "react";
import Spinner from "@components/Spinner";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchArtists } from "@store/slices/artistListSlice";
import { Link } from "react-router-dom";
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
							<Link
								to={`/artists/${artist.id}`}
								className={styles.card}
							>
								<img
									className={styles.image}
									src={artist.photo}
									alt="Фото Исполнителя"
									height="250"
								/>
								<p className={styles.text}>{artist.nickname}</p>
							</Link>
						</li>
					))}
				</ul>
			) : null}
			{status === "loading" ? <Spinner /> : null}
		</div>
	);
};

export default ArtistListPage;
