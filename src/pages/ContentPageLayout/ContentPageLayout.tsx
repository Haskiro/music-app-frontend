import { FC, useEffect } from "react";
import { useAppSelector } from "@store/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderMain from "./components/HeaderMain";

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
			<Footer />
		</>
	);
};

export default ContentPageLayout;
