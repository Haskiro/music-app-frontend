import HeaderAuth from "@components/HeaderAuth";
import HeaderMain from "@components/HeaderMain";
import LoginForm from "@components/LoginForm";
import AuthPage from "@pages/AuthPage";
import ContentPageLayout from "@pages/ContentPageLayout";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ContentPageLayout />}>
						<Route index element={<>Profile</>} />
						<Route path="tracks" element={<>tracks</>} />
						<Route path="artists" element={<>artists</>} />
						<Route path="genres" element={<>genres</>} />
						<Route path="playlists" element={<>playlists</>} />
					</Route>
					<Route path="/auth" element={<AuthPage />}>
						<Route index element={<LoginForm />} />
						<Route path="reg" element={"Регистрация"} />
					</Route>
					<Route
						path="*"
						element={
							<h1
								style={{
									fontSize: "30px",
									textAlign: "center",
									marginTop: "20px",
								}}
							>
								404 Page Not Found
							</h1>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
