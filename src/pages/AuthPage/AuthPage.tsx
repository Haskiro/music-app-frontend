import { FC } from "react";
import HeaderAuth from "@pages/AuthPage/components/HeaderAuth";
import { Outlet } from "react-router-dom";

const AuthPage: FC = () => {
	return (
		<>
			<HeaderAuth />
			<main className="container">
				<Outlet />
			</main>
		</>
	);
};

export default AuthPage;
