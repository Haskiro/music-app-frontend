import { HeaderMain } from "@components/HeaderMain/HeaderMain";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HeaderMain />} />
					<Route path="/tracks" element={<>tracks</>} />
					<Route path="/artists" element={<>artists</>} />
					<Route path="/genres" element={<>genres</>} />
					<Route path="/playlists" element={<>playlists</>} />
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
