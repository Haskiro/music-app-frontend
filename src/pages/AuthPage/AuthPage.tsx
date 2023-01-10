import { FC } from "react";
import HeaderAuth from "@components/HeaderAuth";
import { useAppSelector } from "@store/hooks";
import { Outlet } from "react-router-dom";
import styles from "./AuthPage.module.scss";

const AuthPage: FC = () => {
	return (
		<>
			<HeaderAuth />
			<Outlet />
		</>
	);
};

export default AuthPage;
