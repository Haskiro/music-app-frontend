import { FC } from "react";
import Card from "@components/Card";
import { Spin } from "antd";
import styles from "./AlbumList.module.scss";
import { IAlbumListProps } from "./AlbumList.props";

const AlbumList: FC<IAlbumListProps> = ({ albumList, status, heading }) => {
	return (
		<div className={styles.container}>
			{heading ? <h1 className={styles.heading}>{heading}</h1> : null}
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
