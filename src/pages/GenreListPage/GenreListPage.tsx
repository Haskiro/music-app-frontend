import { FC, useEffect } from "react";
import Spinner from "@components/Spinner";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchGenres } from "@store/slices/genreListSlice";
import { Link } from "react-router-dom";
import styles from "./GenreListPage.module.scss";

const GenreListPage: FC = () => {
	const dispatch = useAppDispatch();
	const genres = useAppSelector((state) => state.genreList.genreList);
	const status = useAppSelector((state) => state.genreList.status);

	useEffect(() => {
		dispatch(fetchGenres());
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Жанры</h1>
			{status === "succeeded" ? (
				<ul className={styles.list}>
					{genres?.map((genre) => (
						<li className={styles.item} key={genre.id}>
							<Link
								to={`/genres/${genre.id}`}
								className={styles.card}
							>
								<img
									className={styles.image}
									src={genre.cover}
									alt="Обложка Жанра"
									height="250"
								/>
								<p className={styles.text}>{genre.title}</p>
							</Link>
						</li>
					))}
				</ul>
			) : null}
			{status === "loading" ? <Spinner /> : null}
		</div>
	);
};

export default GenreListPage;
