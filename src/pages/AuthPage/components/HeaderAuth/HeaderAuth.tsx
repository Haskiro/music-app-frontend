import { FC } from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import styles from "./HeaderAuth.module.scss";

const HeaderAuth: FC = () => {
	return (
		<header className={styles.block}>
			<div className={cn("container", styles.body)}>
				<nav className={styles.nav}>
					<ul className={styles.list}>
						<li className={styles.item}>
							<NavLink
								to="/auth"
								end
								className={({ isActive }) =>
									cn(styles.link, {
										[styles.linkActive]: isActive,
									})
								}
							>
								Вход
							</NavLink>
						</li>
						<li className={styles.item}>
							<NavLink
								to="/auth/reg"
								className={({ isActive }) =>
									cn(styles.link, {
										[styles.linkActive]: isActive,
									})
								}
							>
								Регистрация
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default HeaderAuth;
