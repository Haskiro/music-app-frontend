import { FC, useEffect } from "react";
import HeaderMain from "@components/HeaderMain";
import { useAppSelector } from "@store/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./ContentPageLayout.module.scss";

const ContentPageLayout: FC = () => {
	const navigate = useNavigate();
	const accessToken = useAppSelector((state) => state.user.accessToken);

	useEffect(() => {
		if (!accessToken) {
			navigate("/auth");
		}
	}, [accessToken]);

	return (
		<>
			<HeaderMain />
			<main className="container">
				<Outlet />
			</main>
		</>
	);
};

export default ContentPageLayout;
