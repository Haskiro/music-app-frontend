import { FC, useEffect } from "react";
import Spinner from "@components/Spinner";
import TrackList from "@components/TrackList";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchAlbumById } from "@store/slices/albumDetailsSlice";
import { useParams } from "react-router-dom";
import styles from "./AlbumDetailsPage.module.scss";

const AlbumDetailsPage: FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const album = useAppSelector((state) => state.albumDetails.album);
	const status = useAppSelector((state) => state.albumDetails.status);

	useEffect(() => {
		dispatch(fetchAlbumById(id as string));
	}, [id]);

	return (
		<div className={styles.container}>
			{status === "succeeded" ? (
				<>
					<div className={styles.header}>
						<img
							src={album?.cover}
							alt="Обложка Альбома"
							className={styles.image}
							height="250"
							width="250"
						/>
						<div className={styles.block}>
							<h1 className={styles.title}>{album?.title}</h1>
						</div>
					</div>
					<div className={styles.body}>
						<p className={styles.text}>{album?.description}</p>
					</div>
					<TrackList
						trackList={album?.tracks_data || null}
						status="succeeded"
					/>
				</>
			) : null}
			{status === "loading" ? <Spinner /> : null}
		</div>
	);
};

export default AlbumDetailsPage;
