import { FC } from "react";
import Spinner from "@components/Spinner";
import { albumListState } from "@store/slices/albumListSlice";
import { Link } from "react-router-dom";
import styles from "./AlbumList.module.scss";

const AlbumList: FC<albumListState> = ({ albumList, status }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Альбомы</h1>
			{status === "succeeded" ? (
				<ul className={styles.list}>
					{albumList?.map((album) => (
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
			) : null}
			{status === "loading" ? <Spinner /> : null}
		</div>
	);
};

export default AlbumList;
