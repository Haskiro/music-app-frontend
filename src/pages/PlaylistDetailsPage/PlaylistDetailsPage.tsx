import { FC, useEffect } from "react";
import TrackList from "@components/TrackList";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
	deletePlaylist,
	fetchPlaylistById,
} from "@store/slices/playlistDetailsSlice";
import { Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./PlaylistDetailsPage.module.scss";

const PlaylistDetailsPage: FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const playlist = useAppSelector((state) => state.playlistDetails.playlist);
	const status = useAppSelector((state) => state.playlistDetails.status);
	const navigate = useNavigate();

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
							<button
								className={styles.controlButton}
								onClick={() => {
									dispatch(deletePlaylist(id as string));
									navigate("/playlists");
								}}
							>
								Удалить плейлист
							</button>
						</div>
					</div>
					<div className={styles.body}>
						<p className={styles.text}>{playlist?.description}</p>
					</div>
					<TrackList
						heading="Список треков"
						trackList={playlist?.tracks_data || []}
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

export default PlaylistDetailsPage;
