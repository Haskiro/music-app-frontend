import { FC, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { authUser } from "@store/slices/userSlice";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const accessToken = useAppSelector((state) => state.user.accessToken);
	const status = useAppSelector((state) => state.user.status);

	useEffect(() => {
		if (accessToken) navigate("/");
	}, [accessToken]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await dispatch(authUser({ email, password })).unwrap();
			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};

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
					value={email}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setEmail(event.target.value)
					}
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
					value={password}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setPassword(event.target.value)
					}
				/>
				<button
					className={styles.button}
					type="submit"
					onClick={handleSubmit}
					disabled={status === "loading"}
				>
					{status === "loading" ? (
						<Spin
							style={{
								margin: "0px auto",
								display: "block",
							}}
						/>
					) : (
						"Отправить"
					)}
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
