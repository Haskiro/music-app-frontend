import { FC } from "react";
import HeaderMain from "@components/HeaderMain";
import { Outlet } from "react-router-dom";
import styles from "./ContentPageLayout.module.scss";

const ContentPageLayout: FC = () => {
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
