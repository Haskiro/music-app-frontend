import { FC } from "react";
import HeaderAuth from "@components/HeaderAuth";
import { Outlet } from "react-router-dom";

const AuthPage: FC = () => {
	return (
		<>
			<HeaderAuth />
			<body className="container">
				<Outlet />
			</body>
		</>
	);
};

export default AuthPage;
