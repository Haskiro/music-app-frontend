import { FC } from "react";
import styles from "./LoginForm.module.scss";

const LoginForm: FC = () => {
	return (
		<div className={styles.block}>
			<h1 className={styles.heading}>Вход</h1>
			<form method="POST">
				<label htmlFor="email" style={{ display: "none" }}>
					Почта
				</label>
				<input
					type="email"
					className={styles.input}
					id="email"
					name="email"
					aria-label="Почта"
					placeholder="Почта"
				/>
				<label htmlFor="password" style={{ display: "none" }}>
					Пароль
				</label>
				<input
					type="password"
					className={styles.input}
					id="password"
					name="password"
					aria-label="Пароль"
					placeholder="Пароль"
				/>
				<button className={styles.button} type="submit">
					Отправить
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
