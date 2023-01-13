import { FC } from "react";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import styles from "./TrackList.module.scss";
import { ITrackListProps } from "./TrackList.props";

const TrackList: FC<ITrackListProps> = ({ trackList, status, heading }) => {
	return (
		<div className={styles.container}>
			{heading ? <h1 className={styles.heading}>{heading}</h1> : null}
			<ul className={styles.list}>
				{status === "succeeded"
					? trackList.map((track) => (
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
															to={`/artists/${artist.id}`}
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
			</ul>
		</div>
	);
};

export default TrackList;
