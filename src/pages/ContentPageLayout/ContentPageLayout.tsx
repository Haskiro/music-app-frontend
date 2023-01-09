import { FC, useEffect } from "react";
import HeaderMain from "@components/HeaderMain";
import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./ContentPageLayout.module.scss";

const ContentPageLayout: FC = () => {
	const navigate = useNavigate();
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);

	useEffect(() => {
		if (!accessToken) {
			navigate("/auth");
		}
	}, [accessToken]);

	return (
		<>
			<HeaderMain />
			<div className="container">
				<Outlet />
			</div>
		</>
	);
};

export default ContentPageLayout;
