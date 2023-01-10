import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchAlbums } from "@store/slices/albumListSlice";
import { Link } from "react-router-dom";
import styles from "./AlbumList.module.scss";

const AlbumList: FC = () => {
	const dispatch = useAppDispatch();
	const albums = useAppSelector((state) => state.albumList.albumList);
	const status = useAppSelector((state) => state.albumList.status);

	useEffect(() => {
		dispatch(fetchAlbums());
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Альбомы</h1>
			<ul className={styles.list}>
				{albums?.map((album) => (
					<li className={styles.item} key={album.id}>
						<Link
							to={`/albums/${album.id}`}
							className={styles.card}
						>
							<img
								className={styles.image}
								src={album.cover}
								alt="Обложка Альбома"
								height="250"
							/>
							<p className={styles.text}>{album.title}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AlbumList;
