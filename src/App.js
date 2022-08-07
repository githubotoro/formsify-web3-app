import logo from "./logo.svg";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import FormHeader from "./components/FormHeader";
import Tabs from "./components/Tabs";
import FormDesign from "./components/FormDesign";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeContext } from "./helper/ThemeContext";
import { UserContext } from "./helper/UserContext";
import { useState } from "react";

import FormFill from "./pages/FormFill";

import { injectStyle } from "react-toastify/dist/inject-style";
import FormView from "./pages/FormView";

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
						{/* <>
							<div data-theme={FormsifyTheme}>
								<Navigation />
							</div>
						</> */}

						<Routes>
							<>
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
											</div>
											<div data-theme={FormsifyTheme}>
												<Dashboard />{" "}
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
											<Navigation />
											<FormView />
										</>
									}
								/>
							</>
						</Routes>
						{/* <Footer /> */}
					</BrowserRouter>
					{/* </div> */}
				</ThemeContext.Provider>
			</UserContext.Provider>
		</>
	);
}

export default App;
