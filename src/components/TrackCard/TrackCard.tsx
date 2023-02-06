import { FC } from "react";
import { ITrack } from "@interfaces/track.interface";
import { Link } from "react-router-dom";
import styles from "./TrackCard.module.scss";

const TrackCard: FC<{ track: ITrack }> = ({ track }) => {
	return (
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
					<p className={styles.title} data-testid="title">
						{track.title}
					</p>
					<p className={styles.artists}>
						{track.artists_data.map((artist) => (
							<Link
								to={`/artists/${artist.id}`}
								className={styles.link}
								key={artist.id}
							>
								{artist.nickname}
								&nbsp;&nbsp;
							</Link>
						))}
					</p>
				</div>
			</div>
			<audio
				className={styles.audio}
				controls
				src={track.audio_file}
			></audio>
		</div>
	);
};

export default TrackCard;
