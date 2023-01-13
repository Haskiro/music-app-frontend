import { FC, useEffect } from "react";
import AlbumList from "@components/AlbumList";
import TrackList from "@components/TrackList";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchArtistById } from "@store/slices/artistDetailsSlice";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import styles from "./ArtistDetailsPage.module.scss";

const ArtistDetailsPage: FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const artist = useAppSelector((state) => state.artistDetails.artist);
	const status = useAppSelector((state) => state.artistDetails.status);

	useEffect(() => {
		dispatch(fetchArtistById(id as string));
	}, [id]);

	return (
		<div className={styles.container}>
			{status === "succeeded" ? (
				<>
					<div className={styles.header}>
						<img
							src={artist?.photo}
							alt="Фотография"
							className={styles.photo}
							height="250"
							width="250"
						/>
						<div className={styles.block}>
							<h1 className={styles.title}>{artist?.nickname}</h1>
							<p className={styles.text}>
								{artist?.first_name} {artist?.last_name}
							</p>
						</div>
					</div>
					<div className={styles.body}>
						<p className={styles.text}>{artist?.bio}</p>
					</div>
					<AlbumList
						heading="Альбомы"
						albumList={artist?.albums_data || []}
						status="succeeded"
					/>
					<TrackList
						heading="Список треков"
						trackList={artist?.tracks_data || []}
						status="succeeded"
					/>
				</>
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

export default ArtistDetailsPage;
