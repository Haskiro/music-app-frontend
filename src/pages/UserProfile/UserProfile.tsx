import { FC, useEffect } from "react";
import UserPhotoPlug from "@assets/images/user-photo-plug.png";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchUser } from "@store/slices/userSlice";
import { Spin } from "antd";
import styles from "./UserProfile.module.scss";

const UserProfile: FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
	const status = useAppSelector((state) => state.user.status);

	useEffect(() => {
		dispatch(fetchUser());
	}, []);

	const content = (
		<>
			<div className={styles.header}>
				<img
					src={user?.photo ? user.photo : UserPhotoPlug}
					alt="Фотография"
					className={styles.photo}
					height="250"
					width="250"
				/>
				<div className={styles.block}>
					<h1 className={styles.title}>Профиль</h1>
					<p className={styles.text}>
						{user?.first_name} {user?.last_name}
					</p>
				</div>
			</div>
			<div className={styles.body}>
				<p className={styles.text}>
					{user?.bio ? user.bio : "Нет заполненной биографии"}
				</p>
			</div>
		</>
	);

	return (
		<div className={styles.container}>
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
			{status === "succeeded" ? content : null}
		</div>
	);
};

export default UserProfile;
