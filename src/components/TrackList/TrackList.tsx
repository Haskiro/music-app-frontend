import { FC } from "react";
import { Spin } from "antd";
import TrackCard from "../TrackCard";
import styles from "./TrackList.module.scss";
import { ITrackListProps } from "./TrackList.props";

const TrackList: FC<ITrackListProps> = ({ trackList, status, heading }) => {
	return (
		<div className={styles.container} data-testid="body">
			{heading ? <h1 className={styles.heading}>{heading}</h1> : null}
			<ul className={styles.list}>
				{status === "succeeded"
					? trackList.map((track) => (
							<li className={styles.item} key={track.id}>
								<TrackCard track={track} />
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
