import { FC, useState } from "react";
import Burger from "@assets/icons/burger.svg";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { logout } from "@store/slices/userSlice";
import cn from "classnames";
import { Link, NavLink } from "react-router-dom";
import styles from "./HeaderMain.module.scss";

const HeaderMain: FC = () => {
	const [navIsActive, setNavIsActive] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const name = useAppSelector((state) => state.user.user?.first_name);

	return (
		<header className={styles.block}>
			<div className={cn(styles.body, "container")}>
				<div className={styles.user}>
					<Link to="/" className={styles.text}>
						{name}
					</Link>
					<button
						className={styles.button}
						onClick={() => dispatch(logout())}
					>
						Выйти
					</button>
				</div>
				<nav
					className={cn(styles.nav, {
						[styles.navActive]: navIsActive,
					})}
				>
					<ul className={styles.list}>
						<li className={styles.item}>
							<NavLink
								to="/"
								end
								onClick={() => setNavIsActive(false)}
								className={({ isActive }) =>
									cn(styles.link, {
										[styles.linkActive]: isActive,
									})
								}
							>
								Профиль
							</NavLink>
						</li>
						<li className={styles.item}>
							<NavLink
								to="/tracks"
								onClick={() => setNavIsActive(false)}
								className={({ isActive }) =>
									cn(styles.link, {
										[styles.linkActive]: isActive,
									})
								}
							>
								Треки
							</NavLink>
						</li>
						<li className={styles.item}>
							<NavLink
								to="/artists"
								end
								onClick={() => setNavIsActive(false)}
								className={({ isActive }) =>
									cn(styles.link, {
										[styles.linkActive]: isActive,
									})
								}
							>
								Исполнители
							</NavLink>
						</li>
						<li className={styles.item}>
							<NavLink
								to="/genres"
								end
								onClick={() => setNavIsActive(false)}
								className={({ isActive }) =>
									cn(styles.link, {
										[styles.linkActive]: isActive,
									})
								}
							>
								Жанры
							</NavLink>
						</li>
						<li className={styles.item}>
							<NavLink
								to="/playlists"
								end
								onClick={() => setNavIsActive(false)}
								className={({ isActive }) =>
									cn(styles.link, {
										[styles.linkActive]: isActive,
									})
								}
							>
								Плейлисты
							</NavLink>
						</li>
					</ul>
				</nav>
				<button
					className={styles.burger}
					onClick={() => setNavIsActive((prevState) => !prevState)}
				>
					<img src={Burger} alt="Меню" />
				</button>
			</div>
		</header>
	);
};

export default HeaderMain;
