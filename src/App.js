import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { injectStyle } from "react-toastify/dist/inject-style";

import Dashboard from "./pages/Dashboard";
import FormFill from "./pages/FormFill";
import FormView from "./pages/FormView";
import Error from "./pages/Error";
import Home from "./pages/Home";
import About from "./pages/About";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FormDesign from "./components/FormDesign";

import { ThemeContext } from "./helper/ThemeContext";
import { UserContext } from "./helper/UserContext";

function App() {
	if (typeof window !== "undefined") {
		injectStyle();
	}

	const [FormsifyTheme, setFormsifyTheme] = useState(`light`);
	const [User, setUser] = useState({});

	return (
		<>
			<UserContext.Provider value={{ User, setUser }}>
				<ThemeContext.Provider
					value={{ FormsifyTheme, setFormsifyTheme }}
				>
					<BrowserRouter>
						<Routes>
							<>
								<Route
									path="/about"
									element={
										<>
											<div data-theme={FormsifyTheme}>
												<Navigation />
												<About />
												<Footer />
											</div>
										</>
									}
								/>

								<Route
									path="/form/:id"
									element={
										<>
											<div data-theme={FormsifyTheme}>
												<Navigation />
											</div>
											<FormDesign />
										</>
									}
								/>

								<Route
									path="/"
									element={
										<>
											<div data-theme={FormsifyTheme}>
												<Navigation />
												<Home />
												<Footer />
											</div>
										</>
									}
								/>
								<Route
									path="dashboard"
									element={
										<>
											<div data-theme={FormsifyTheme}>
												<Navigation />
												<Dashboard />
											</div>
										</>
									}
								/>
								<Route
									path="*"
									element={
										<>
											<div data-theme={FormsifyTheme}>
												<Navigation />
												<Error />
											</div>
										</>
									}
								/>

								<Route
									path="/:formOwner/:formId"
									element={
										<>
											<FormFill />
										</>
									}
								/>
								<Route
									path="/:formOwner/:formId/:preview"
									element={
										<>
											<FormFill />
										</>
									}
								/>
								<Route
									path="/:formOwner/:formId/responses"
									element={
										<>
											<div data-theme={FormsifyTheme}>
												<Navigation />
												<FormView />
											</div>
										</>
									}
								/>
							</>
						</Routes>
					</BrowserRouter>
				</ThemeContext.Provider>
			</UserContext.Provider>
		</>
	);
}

export default App;
