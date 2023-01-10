import { FC, useEffect } from "react";
import Spinner from "@components/Spinner";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchTracks } from "@store/slices/trackListSlice";
import { Link } from "react-router-dom";
import styles from "./TrackList.module.scss";

const TrackList: FC = () => {
	const dispatch = useAppDispatch();
	const tracks = useAppSelector((state) => state.trackList.trackList);
	const status = useAppSelector((state) => state.trackList.status);

	useEffect(() => {
		dispatch(fetchTracks());
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Список треков</h1>
			<ul className={styles.list}>
				{status === "succeeded"
					? tracks?.map((track) => (
							<li className={styles.item} key={track.id}>
								<div className={styles.card}>
									<div className={styles.block}>
										<img
											className={styles.image}
											src={track.cover}
											alt="Обложка Трека"
											width="80"
											height="80"
										/>
										<div className={styles.text}>
											<p className={styles.title}>
												{track.title}
											</p>
											<p className={styles.artists}>
												{track.artists_data.map(
													(artist) => (
														<Link
															to={`artists/${artist.id}`}
															className={
																styles.link
															}
															key={artist.id}
														>
															{artist.nickname}
															&nbsp;&nbsp;
														</Link>
													)
												)}
											</p>
										</div>
									</div>
									<audio
										className={styles.audio}
										controls
										src={track.audio_file}
									></audio>
								</div>
							</li>
					  ))
					: null}
				{status === "loading" ? <Spinner /> : null}
			</ul>
		</div>
	);
};

export default TrackList;
