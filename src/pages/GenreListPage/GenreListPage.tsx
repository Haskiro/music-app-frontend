import { FC, useEffect, useMemo } from "react";
import Card from "@components/Card";
import useControlPanel from "@hooks/useControlPanel";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchGenres } from "@store/slices/genreListSlice";
import filterItemList from "@utils/filterItemList";
import { Input, Spin } from "antd";
import cn from "classnames";
import styles from "./GenreListPage.module.scss";

const GenreListPage: FC = () => {
	const { Search } = Input;
	const dispatch = useAppDispatch();
	const genres = useAppSelector((state) => state.genreList.genreList);
	const status = useAppSelector((state) => state.genreList.status);
	const { searchValue, sortByAlphabet, onSearch, onSort, onUpdate } =
		useControlPanel(fetchGenres);

	useEffect(() => {
		dispatch(fetchGenres());
	}, []);

	const filteredGenres = useMemo(() => {
		let filteredGenres = genres.slice();

		return filterItemList(
			filteredGenres,
			searchValue,
			sortByAlphabet,
			"title"
		);
	}, [genres, sortByAlphabet, searchValue]);

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Жанры</h1>
			<div className={styles.controlPanel}>
				<Search
					className={styles.controlInput}
					placeholder="Введите название жанра"
					allowClear
					enterButton="Поиск"
					size="large"
					onSearch={onSearch}
				/>
				<div className={styles.controlButtons}>
					<button
						className={cn(styles.controlButtonsItem, {
							[styles.controlButtonsItemChecked]: sortByAlphabet,
						})}
						onClick={onSort}
					>
						По Алфавиту
					</button>
					<button
						className={styles.controlButtonsItem}
						onClick={onUpdate}
					>
						Обновить
					</button>
				</div>
			</div>
			{status === "succeeded" ? (
				filteredGenres.length === 0 ? (
					<p className={styles.result}>Ничего не найдено</p>
				) : (
					<ul className={styles.list}>
						{filteredGenres.map((genre) => (
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
				)
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
