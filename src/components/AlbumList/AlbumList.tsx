import { FC } from "react";
import Card from "@components/Card";
import { albumListState } from "@store/slices/albumListSlice";
import { Spin } from "antd";
import styles from "./AlbumList.module.scss";

const AlbumList: FC<albumListState> = ({ albumList, status }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Альбомы</h1>
			{status === "succeeded" ? (
				<ul className={styles.list}>
					{albumList?.map((album) => (
						<li className={styles.item} key={album.id}>
							<Card
								title={album.title}
								image={album.cover}
								target={`/albums/${album.id}`}
								alt="Фото Исполнителя"
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

export default AlbumList;
