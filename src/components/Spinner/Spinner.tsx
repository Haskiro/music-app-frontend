import { FC } from "react";
import cn from "classnames";
import styles from "./Spinner.module.scss";

export const Spinner: FC = () => {
	return (
		<svg className={cn("spinner", styles.container)} viewBox="0 0 24 24">
			<circle className={styles.value} cx="12" cy="12" r="10" />
			<circle className={styles.value} cx="12" cy="12" r="10" />
			<circle className={styles.value} cx="12" cy="12" r="10" />
			<circle className={styles.value} cx="12" cy="12" r="10" />
			<circle className={styles.value} cx="12" cy="12" r="10" />
			<circle className={styles.value} cx="12" cy="12" r="10" />
		</svg>
	);
};

export default Spinner;
