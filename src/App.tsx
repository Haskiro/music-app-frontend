import LoginForm from "@components/LoginForm";
import RegisterForm from "@components/RegisterForm";
import ArtistDetailsPage from "@pages/ArtistDetailsPage";
import ArtistListPage from "@pages/ArtistListPage";
import AuthPage from "@pages/AuthPage";
import ContentPageLayout from "@pages/ContentPageLayout";
import PlaylistsPage from "@pages/PlaylistsPage";
import TrackListPage from "@pages/TrackListPage";
import UserProfile from "@pages/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ContentPageLayout />}>
						<Route index element={<UserProfile />} />
						<Route path="tracks" element={<TrackListPage />} />
						<Route path="artists" element={<ArtistListPage />} />
						<Route
							path="artists/:id"
							element={<ArtistDetailsPage />}
						/>
						<Route path="genres" element={<>genres</>} />
						<Route path="playlists" element={<PlaylistsPage />} />
					</Route>
					<Route path="/auth" element={<AuthPage />}>
						<Route index element={<LoginForm />} />
						<Route path="reg" element={<RegisterForm />} />
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
