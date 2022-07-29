import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { ThemeContext } from "../helper/ThemeContext";
import { UserContext } from "../helper/UserContext";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase-config";
import { useAccount } from "wagmi";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

const Navigation = () => {
	const { User, setUser } = useContext(UserContext);
	const { address, isConnected } = useAccount();

	// const [user, setUser] = useState({
	// 	deployedForms: {
	// 		deployedFormId: {
	// 			formAddress: "",
	// 			formChain: "",
	// 			extraInfo: "",
	// 		},
	// 	},
	// 	undeployedForms: {
	// 		undeployedFormId: {
	// 			headersInfo: "",
	// 			extraInfo: "",
	// 		},
	// 	},
	// });

	useEffect(() => {
		const getUserData = async () => {
			if (isConnected) {
				const userDocRef = doc(db, "users", address);
				const userDoc = await getDoc(userDocRef);

				if (userDoc.data() === undefined) {
					const createUserDoc = await setDoc(
						doc(db, "users", address),
						User
					);
				} else {
					setUser(userDoc.data());
				}
			}
		};

		getUserData();
	}, [address]);

	const navigate = useNavigate();

	const { FormsifyTheme, setFormsifyTheme } = useContext(ThemeContext);

	const formThemes = [
		"light",
		"dark",
		"cupcake",
		"bumblebee",
		"emerald",
		"corporate",
		"synthwave",
		"retro",
		"cyberpunk",
		"valentine",
		"halloween",
		"garden",
		"forest",
		"aqua",
		"lofi",
		"pastel",
		"fantasy",
		"wireframe",
		"black",
		"luxury",
		"dracula",
		"cmyk",
		"autumn",
		"business",
		"acid",
		"lemonade",
		"night",
		"coffee",
		"winter",
	];

	const changeTheme = (theme) => {
		setFormsifyTheme(theme);
	};

	const formsifyCustomRainbowConnectWallet = () => {
		return (
			<ConnectButton.Custom>
				{({
					account,
					chain,
					openAccountModal,
					openChainModal,
					openConnectModal,
					mounted,
				}) => {
					return (
						<div
							{...(!mounted && {
								"aria-hidden": true,
								style: {
									opacity: 0,
									pointerEvents: "none",
									userSelect: "none",
								},
							})}
						>
							{(() => {
								if (!mounted || !account || !chain) {
									return (
										<button
											className="btn btn-primary btn-sm h-fit w-fit px-2 py-0 sm:px-3 sm:py-1 items-center capitalize font-black text-md sm:text-lg border-4 border-accent shadow-sm shadow-accent-focus"
											onClick={openConnectModal}
											type="button"
										>
											Connect Wallet
										</button>
									);
								}
								if (chain.unsupported) {
									return (
										<button
											className="btn btn-error btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-warning shadow-sm shadow-warning-focus"
											onClick={openChainModal}
											type="button"
										>
											Wrong network
										</button>
									);
								}
								return (
									<div
										className="justify-center flex flex-row items-center"
										style={{ display: "flex", gap: 12 }}
									>
										<button
											className="btn btn-accent btn-sm h-fit w-fit px-1 sm:px-3 py-1 capitalize font-black text-lg border-4 border-primary shadow-sm shadow-primary-focus"
											onClick={openChainModal}
											style={{
												display: "flex",
												alignItems: "center",
											}}
											type="button"
										>
											{/* {chain.hasIcon && (
												<div
													style={{
														background:
															chain.iconBackground,
														width: 12,
														height: 12,
														borderRadius: 999,
														overflow: "hidden",
														marginRight: 4,
													}}
												>
													{chain.iconUrl && (
														<img
															alt={
																chain.name ??
																"Chain icon"
															}
															src={chain.iconUrl}
															style={{
																width: 12,
																height: 12,
															}}
														/>
													)}{" "}
												</div>
											)}{" "}
											&nbsp; &nbsp; */}
											{chain.name}
										</button>
										<button
											className="btn btn-primary btn-sm h-fit w-fit px-2 sm:px-3 py-1 capitalize font-black text-lg border-4 border-accent shadow-sm shadow-accent-focus"
											onClick={openAccountModal}
											type="button"
										>
											{account.displayName}
											{/* {account.displayBalance
												? ` (${account.displayBalance})`
												: ""} */}
										</button>
									</div>
								);
							})()}
						</div>
					);
				}}
			</ConnectButton.Custom>
		);
	};

	const formsifyNavBar = () => {
		return (
			<>
				<div className="navbar bg-base-200 pl-1 text-xl font-black flex flex-col sm:flex-row">
					<div className="navbar-start justify-center sm:justify-start">
						<div className="dropdown justify-start">
							<label
								tabindex="0"
								className="btn btn-ghost lg:hidden ml-2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width={3}
										d="M4 6h16M4 12h8m-8 6h16"
									/>
								</svg>
							</label>
							<ul
								tabindex="0"
								className="menu menu-compact dropdown-content w-fit mt-3 p-2 shadow bg-base-100 rounded-box"
							>
								<li>
									<a>About</a>
								</li>
								<li>
									<a
										onClick={() => {
											navigate(`/dashboard`);
										}}
									>
										Dashboard
									</a>
								</li>
								<li tabindex="0">
									<a>Theme</a>
									<ul className=" w-28 h-60 z-20 overflow-y-scroll bg-base-100 capitalize">
										{formThemes.map((theme, index) => {
											return (
												<>
													<li key={index}>
														<a
															onClick={() => {
																changeTheme(
																	theme
																);
															}}
														>
															{theme}
														</a>
													</li>
												</>
											);
										})}
									</ul>
								</li>
							</ul>
						</div>
						<a
							className="btn btn-ghost normal-case font-black text-lg sm:text-xl text-start rounded-xl mr-2"
							onClick={() => {
								navigate(`/`);
							}}
						>
							Formsify
						</a>
					</div>
					<div className="navbar-center hidden lg:flex">
						<ul className="menu menu-horizontal p-0">
							<li>
								<a>About</a>
							</li>
							<li>
								<a
									onClick={() => {
										navigate(`/dashboard`);
									}}
								>
									Dashboard
								</a>
							</li>
							<li tabindex="0">
								<a>Theme</a>
								<ul className="p-2 w-48 h-60 z-20 overflow-y-scroll bg-base-100 capitalize">
									{formThemes.map((theme, index) => {
										return (
											<>
												<li key={index}>
													<a
														onClick={() => {
															changeTheme(theme);
														}}
													>
														{theme}
													</a>
												</li>
											</>
										);
									})}
								</ul>
							</li>
						</ul>
					</div>
					<div className="navbar-end sm:pr-2 justify-center sm:justify-end">
						{formsifyCustomRainbowConnectWallet()}
					</div>
				</div>
			</>
		);
	};

	return <>{formsifyNavBar()}</>;
};

export default Navigation;
