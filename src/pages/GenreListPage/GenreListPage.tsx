import { FC, useEffect } from "react";
import Card from "@components/Card";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchGenres } from "@store/slices/genreListSlice";
import { Spin } from "antd";
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
							<Card
								title={genre.title}
								image={genre.cover}
								target={`/genres/${genre.id}`}
								alt="Обложка Жанра"
							/>
						</li>
					))}
				</ul>
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

export default GenreListPage;
