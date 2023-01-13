import { FC, useEffect } from "react";
import TrackList from "@components/TrackList";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchGenreById } from "@store/slices/genreDetailsSlice";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import styles from "./GenreDetailsPage.module.scss";

const GenreDetailsPage: FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const genre = useAppSelector((state) => state.genreDetails.genre);
	const status = useAppSelector((state) => state.genreDetails.status);

	useEffect(() => {
		dispatch(fetchGenreById(id as string));
	}, [id]);

	return (
		<div className={styles.container}>
			{status === "succeeded" ? (
				<>
					<div className={styles.header}>
						<img
							src={genre?.cover}
							alt="Обложка Жанра"
							className={styles.image}
							height="250"
							width="250"
						/>
						<div className={styles.block}>
							<h1 className={styles.title}>{genre?.title}</h1>
						</div>
					</div>
					<div className={styles.body}>
						<p className={styles.text}>{genre?.description}</p>
					</div>
					<TrackList
						trackList={genre?.tracks_data || null}
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

export default GenreDetailsPage;
