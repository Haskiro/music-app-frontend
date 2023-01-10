import { FC, useEffect } from "react";
import Spinner from "@components/Spinner";
import TrackList from "@components/TrackList";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchPlaylistById } from "@store/slices/playlistDetailsSlice";
import { useParams } from "react-router-dom";
import styles from "./PlaylistDetailsPage.module.scss";

const PlaylistDetailsPage: FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const playlist = useAppSelector((state) => state.playlistDetails.playlist);
	const status = useAppSelector((state) => state.playlistDetails.status);

	useEffect(() => {
		dispatch(fetchPlaylistById(id as string));
	}, [id]);

	return (
		<div className={styles.container}>
			{status === "succeeded" ? (
				<>
					<div className={styles.header}>
						<img
							src={playlist?.cover}
							alt="Обложка Плейлиста"
							className={styles.image}
							height="250"
							width="250"
						/>
						<div className={styles.block}>
							<h1 className={styles.title}>{playlist?.title}</h1>
						</div>
					</div>
					<div className={styles.body}>
						<p className={styles.text}>{playlist?.description}</p>
					</div>
					<TrackList
						trackList={playlist?.tracks_data || null}
						status="succeeded"
					/>
				</>
			) : null}
			{status === "loading" ? <Spinner /> : null}
		</div>
	);
};

export default PlaylistDetailsPage;
