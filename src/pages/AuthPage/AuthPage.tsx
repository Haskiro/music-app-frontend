import { FC } from "react";
import Footer from "@components/Footer";
import { Outlet } from "react-router-dom";
import HeaderAuth from "./components/HeaderAuth";

const AuthPage: FC = () => {
	return (
		<>
			<HeaderAuth />
			<main className="container">
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default AuthPage;
