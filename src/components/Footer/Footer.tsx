import { FC } from "react";
import cn from "classnames";
import styles from "./Footer.module.scss";

const Footer: FC = () => {
	return (
		<footer className={styles.container}>
			<div className={cn(styles.body, "container")}>
				<p className={styles.text}>Music App</p>
			</div>
		</footer>
	);
};

export default Footer;
