import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import { ICardProps } from "./CardProps";

const Card: FC<ICardProps> = ({ title, image, target, alt }) => {
	return (
		<div className={styles.card}>
			<img className={styles.image} src={image} alt={alt} height="250" />
			<p className={styles.text}>{title}</p>
			<Link className={styles.button} to={target}>
				Открыть
			</Link>
		</div>
	);
};

export default Card;
