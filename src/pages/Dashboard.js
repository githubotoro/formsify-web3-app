import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useContext } from "react";

import { db } from "../firebase-config";
import {
	collection,
	getDocs,
	doc,
	getDoc,
	setDoc,
	deleteDoc,
	deleteField,
	updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { UserContext } from "../helper/UserContext";

const Dashboard = () => {
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

	// useEffect(() => {
	// 	const getUserData = async () => {
	// 		if (address !== undefined) {
	// 			const userDocRef = doc(db, "users", address);
	// 			const userDoc = await getDoc(userDocRef);

	// 			if (userDoc.data() === undefined) {
	// 				const createUserDoc = await setDoc(
	// 					doc(db, "users", address),
	// 					user
	// 				);
	// 			} else {
	// 				setUser(userDoc.data());
	// 				console.log(user);
	// 			}
	// 		}
	// 	};

	// 	getUserData();
	// }, [address]);

	const navigate = useNavigate();

	const createForm = (templateFormType) => {
		const id = uuid();
		navigate(`/form/${id}`, {
			state: {
				formType: templateFormType,
			},
		});
	};

	const [activeTab, setActiveTab] = useState(`createTab`);

	const changeActiveTab = (tabName) => {
		setActiveTab(tabName);
	};

	const forsmifyTabs = () => {
		return (
			<>
				<div className="tabs tabs-boxed w-full bg-base-200 rounded-none font-black justify-around  py-2 overflow-hidden">
					<a
						className={`w-3/12 px-10 md:px-14 tab btn btn-sm btn-accent shadow-md capitalize font-black rounded-lg text-lg md:text-2xl py-0 md:py-1 h-fit hover:bg-primary hover:text-primary-content border-none ${
							activeTab === "viewTab" ? "tab-active" : ""
						}`}
						onClick={() => {
							setActiveTab(`viewTab`);
						}}
					>
						View
					</a>
					<a
						className={`w-3/12 px-10 md:px-14 tab btn btn-sm btn-accent shadow-md capitalize font-black rounded-lg text-lg md:text-2xl py-0 md:py-1 h-fit hover:bg-primary hover:text-primary-content border-none ${
							activeTab === "createTab" ? "tab-active" : ""
						}`}
						onClick={() => {
							setActiveTab(`createTab`);
						}}
					>
						Create
					</a>
					{/* <a
						className={`w-3/12 px-14 tab btn btn-sm btn-accent shadow-md capitalize font-black rounded-lg text-xl md:text-2xl py-1 h-fit hover:bg-primary hover:text-primary-content border-none ${
							activeTab === "statsTab" ? "tab-active" : ""
						}`}
						onClick={() => {
							setActiveTab(`statsTab`);
						}}
					>
						Stats
					</a> */}
				</div>
			</>
		);
	};

	const deleteForm = async (deletingFormId) => {
		try {
			const userDocRef = doc(db, "users", address);
			await updateDoc(userDocRef, {
				[deletingFormId]: deleteField(),
			});

			toast(
				<div className="flex flex-col font-bold items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 stroke-info"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={3}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<div>
						Form has been&nbsp;
						<span className="font-black">deleted!</span>
					</div>
				</div>,
				{
					progressClassName: "border-4 border-info",
				}
			);

			const userDoc = await getDoc(userDocRef);
			setUser(userDoc.data());
		} catch (err) {
			console.log(err);
			toast(
				<div className="flex flex-col font-bold items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 stroke-error"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={3}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<div>
						<span className="font-black">
							Something went Wrong!
						</span>
					</div>
				</div>,
				{
					progressClassName: "border-4 border-error",
				}
			);
		}
	};

	const viewTab = () => {
		return (
			<>
				<div className="my-2 md:my-3 lg:my-4 flex flex-col items-center justify-center">
					{isConnected ? (
						<>
							{Object.keys(User).length === 0 ? (
								<>
									<h1 className="font-black text-lg md:text-2xl lg:text-3xl">
										You
										<div className="ml-1 md:ml-2 h-fit items-center badge badge-error font-black text-lg md:text-2xl lg:text-3xl py-0 md:py-1 rounded-lg content-center shadow-md">
											haven't
										</div>{" "}
										created any Forms yet!
									</h1>
								</>
							) : (
								<>
									<h1 className="font-black text-xl md:text-2xl lg:text-3xl">
										Select your
										<div className="ml-1 md:ml-2 h-fit items-center badge badge-accent font-black text-xl md:text-2xl lg:text-3xl py-0 md:py-1 rounded-lg content-center shadow-md">
											Formsify
										</div>{" "}
										Form
									</h1>

									<div className="mt-2 sm:mt-4 justify-start items-center w-full px-2 sm:px-4 space-y-3 md:space-y-5 pb-1">
										{Object.keys(User).map((key, index) => (
											<div key={index}>
												<div className="w-full card px-2 py-2 bg-base-200 shadow-md">
													{/* <div className="template-svg">
													<figure className="pt-0">
														{
															formTemplate.templateSVG
														}
													</figure>
												</div> */}

													<div className="template-body">
														<div className="card-body p-1 md:p-3">
															<h2 className="font-black capitalize text-lg md:text-2xl lg:text-3xl items-center justify-self-center">
																{
																	User[key]
																		.formHead[0]
																		.formTitle
																}
															</h2>{" "}
															{User[key]
																.formDeployed ? (
																<>
																	<h2 className="w-full font-bold text-sm md:text-lg lg:text-xl">
																		<span className="font-black">
																			Status:
																		</span>
																		&nbsp;Deployed
																	</h2>

																	{/* <h2 className="w-full font-bold text-sm md:text-lg lg:text-xl">
																		<span className="font-black">
																			Contract
																			Address:
																		</span>
																		&nbsp;
																		{
																			JSON.parse(
																				User[
																					key
																				]
																					.deployTransaction
																			)
																				.creates
																		}
																	</h2> */}
																</>
															) : (
																<>
																	<h2 className="w-full font-bold text-sm md:text-lg lg:text-xl">
																		<span className="font-black">
																			Status:
																		</span>
																		&nbsp;Not
																		Deployed
																	</h2>
																</>
															)}
															<h2 className="w-full font-bold text-sm md:text-lg lg:text-xl">
																<span className="font-black">
																	Form ID:
																</span>{" "}
																{key}
															</h2>
															<h2 className="w-full font-bold text-sm md:text-lg lg:text-xl">
																<span className="font-black">
																	Last Saved:
																</span>{" "}
																{
																	User[key]
																		.lastSaved
																}
															</h2>
															{User[key]
																.formDeployed ? (
																<div className="mt-1 flex flex-row">
																	<button
																		onClick={() => {
																			navigate(
																				`/${address}/${key}/responses`
																			);
																		}}
																		className="btn btn-sm btn-primary h-fit w-fit px-3 py-1 capitalize font-black text-sm md:text-lg lg:text-xl shadow-md"
																	>
																		Responses
																	</button>
																	<button
																		onClick={() => {
																			navigate(
																				`/${address}/${key}`
																			);
																		}}
																		className="ml-2 md:ml-3 btn btn-sm btn-secondary h-fit w-fit px-3 py-1 capitalize font-black text-sm md:text-lg lg:text-xl shadow-md"
																	>
																		View
																	</button>
																	<label
																		for="deleteFormModalDeployed"
																		className="ml-2 md:ml-3 btn btn-sm btn-accent h-fit w-fit px-3 py-1 capitalize font-black text-sm md:text-lg lg:text-xl shadow-md"
																	>
																		Delete
																	</label>

																	<>
																		<input
																			type="checkbox"
																			id="deleteFormModalDeployed"
																			class="modal-toggle"
																		/>
																		<div className="modal">
																			<div className="modal-box justify-center items-center flex flex-col">
																				<h1 className="font-black text-lg md:text-xl lg:text-2xl">
																					Are
																					you
																					sure
																					you
																					want
																					to
																					Delete?
																				</h1>
																				<center>
																					<h1 className="mt-2 font-bold text-sm md:text-lg lg:text-xl justify-center items-center flex">
																						Form
																						will
																						only
																						be
																						removed
																						from
																						our
																						database.
																					</h1>

																					<h1 className="font-black text-sm md:text-lg lg:text-xl">
																						NOTE:
																						It
																						will
																						still
																						exist
																						on
																						deployed
																						chain!
																					</h1>
																				</center>

																				<div className="flex flex-row space-x-2 md:space-x-3 pt-2 md:pt-4">
																					<label
																						onClick={() => {
																							deleteForm(
																								key
																							);
																						}}
																						for="deleteFormModalDeployed"
																						className="btn btn-sm md:btn-md capitalize font-bold text-lg md:text-xl lg:text-2xl"
																					>
																						Yes,
																						Delete
																						it!
																					</label>
																					<label
																						for="deleteFormModalDeployed"
																						className="btn btn-sm md:btn-md capitalize btn-error font-black text-lg md:text-xl lg:text-2xl"
																					>
																						Cancel
																					</label>
																				</div>
																			</div>
																		</div>
																	</>
																</div>
															) : (
																<>
																	<div className="mt-1 flex flex-row">
																		<button
																			onClick={() => {
																				navigate(
																					`/form/${key}`
																				);
																			}}
																			className="btn btn-sm btn-primary h-fit w-fit px-3 py-1 capitalize font-black text-sm md:text-lg lg:text-xl shadow-md"
																		>
																			Edit
																			&
																			Deploy
																		</button>
																		<label
																			for="deleteFormModal"
																			className="ml-2 md:ml-3 btn btn-sm btn-secondary h-fit w-fit px-3 py-1 capitalize font-black text-sm md:text-lg lg:text-xl shadow-md"
																		>
																			Delete
																		</label>

																		<>
																			<input
																				type="checkbox"
																				id="deleteFormModal"
																				class="modal-toggle"
																			/>
																			<div className="modal">
																				<div className="modal-box justify-center items-center flex flex-col">
																					<h1 className="font-black text-lg md:text-xl lg:text-2xl">
																						Are
																						you
																						sure
																						you
																						want
																						to
																						Delete?
																					</h1>

																					<h1 className="font-bold text-lg md:text-xl lg:text-2xl">
																						This
																						action
																						can't
																						be
																						undone!
																					</h1>

																					<div className="flex flex-row space-x-2 md:space-x-3 pt-2 md:pt-4">
																						<label
																							onClick={() => {
																								deleteForm(
																									key
																								);
																							}}
																							for="deleteFormModal"
																							className="btn btn-sm md:btn-md capitalize font-bold text-lg md:text-xl lg:text-2xl"
																						>
																							Yes,
																							Delete
																							it!
																						</label>
																						<label
																							for="deleteFormModal"
																							className="btn btn-sm md:btn-md capitalize btn-error font-black text-lg md:text-xl lg:text-2xl"
																						>
																							Cancel
																						</label>
																					</div>

																					{/* <div className="modal-action">
																						<label
																							for="deleteFormModal"
																							className="btn"
																						>
																							Yay!
																						</label>
																					</div> */}
																				</div>
																			</div>
																		</>
																	</div>
																</>
															)}
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</>
							)}
						</>
					) : (
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-2/12 w-2/12 md:h-1/12 md:w-1/12 stroke-error-content fill-error drop-shadow-md"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</svg>
							<h1 className="mt-2 font-black text-lg md:text-2xl lg:text-3xl pb-2">
								<center>
									<div className="ml-1 md:ml-2 h-fit items-center badge badge-error font-black text-lg md:text-2xl lg:text-3xl py-0 md:py-1 rounded-lg content-center shadow-md">
										Connect
									</div>
									&nbsp;Wallet to view your Forms!
								</center>
							</h1>
						</>
					)}
				</div>
			</>
		);
	};

	const formTemplates1 = [
		{
			templateName: `blankTemplate`,
			templateTitle: `Blank Form`,
			templateDescription: `Start from Scratch... ✒️`,
			templateSVG: (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 sm:h-14 sm:w-14 fill-secondary drop-shadow-md"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
						<path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
					</svg>
				</>
			),
		},
		{
			templateName: `meetTemplate`,
			templateTitle: `Meet Form`,
			templateDescription: `Organize a Meetup! 👋`,
			templateSVG: (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 sm:h-14 sm:w-14 fill-secondary drop-shadow-md"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
				</>
			),
		},
		{
			templateName: `contactTemplate`,
			templateTitle: `Contact Form`,
			templateDescription: `Have any queries? ☎️`,
			templateSVG: (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 sm:h-14 sm:w-14 fill-secondary drop-shadow-md"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
					</svg>
				</>
			),
		},
	];

	const formTemplates2 = [
		{
			templateName: `partyTemplate`,
			templateTitle: `Party Form`,
			templateDescription: `Where's the Party at? 🥳`,
			templateSVG: (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 sm:h-14 sm:w-14 fill-secondary drop-shadow-md"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
							clipRule="evenodd"
						/>
					</svg>
				</>
			),
		},
		{
			templateName: `rsvpTemplate`,
			templateTitle: `RSVP Form`,
			templateDescription: `Are you coming? 👀`,
			templateSVG: (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 sm:h-14 sm:w-14 fill-secondary drop-shadow-md"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
							clipRule="evenodd"
						/>
					</svg>
				</>
			),
		},
		{
			templateName: `signupTemplate`,
			templateTitle: `Sign Up Form`,
			templateDescription: `Let's go! 📝`,
			templateSVG: (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 sm:h-14 sm:w-14 fill-secondary drop-shadow-md"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
						<path
							fillRule="evenodd"
							d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
							clipRule="evenodd"
						/>
					</svg>
				</>
			),
		},
	];

	const createTab = () => {
		return (
			<>
				<div className="my-2 md:my-3 lg:my-4 flex flex-col items-center justify-center">
					<h1 className="font-black text-xl md:text-2xl lg:text-3xl">
						Create New
						<div className="ml-1 md:ml-2 h-fit items-center badge badge-accent font-black text-xl md:text-2xl lg:text-3xl py-0 md:py-1 rounded-lg content-center shadow-md">
							Formsify
						</div>
						&nbsp;Form
					</h1>

					<div className="mt-1 sm:mt-1 flex flex-col sm:flex-row justify-around sm:justify-center items-center w-full px-2 sm:px-4">
						{formTemplates1.map((formTemplate, index) => {
							return (
								<>
									<div className="sm:h-48 md:h-56 lg:h-48 px-2 py-2 flex flex-row sm:flex-col justify-between items-center m-2 sm:m-3 card w-full bg-base-200 shadow-md">
										<div className="template-svg">
											<figure className="pt-0">
												{formTemplate.templateSVG}
											</figure>
										</div>

										<div className="template-body">
											<div className="pt-0 pb-0 sm:pb-5 card-body items-center text-center">
												<h2 className="font-black capitalize text-lg md:text-2xl lg:text-3xl">
													{formTemplate.templateTitle}
												</h2>
												<h2 className="-mt-2 w-full font-bold text-sm md:text-lg lg:text-xl">
													{
														formTemplate.templateDescription
													}
												</h2>
											</div>
										</div>
										<button
											onClick={() => {
												createForm(
													formTemplate.templateName
												);
											}}
											className="sm:-mt-2 sm:mb-2 btn btn-sm btn-primary h-fit w-fit px-3 py-1 capitalize font-black text-sm md:text-lg lg:text-xl shadow-md"
										>
											Create
										</button>
									</div>
								</>
							);
						})}
					</div>
					<div className="mt-0 flex flex-col sm:flex-row justify-around sm:justify-center items-center w-full px-2 sm:px-4">
						{formTemplates2.map((formTemplate, index) => {
							return (
								<>
									<div className="sm:h-48 md:h-56 lg:h-48 px-2 py-2 flex flex-row sm:flex-col justify-between items-center m-2 sm:m-3 card w-full bg-base-200 shadow-md">
										<div className="template-svg">
											<figure className="pt-0">
												{formTemplate.templateSVG}
											</figure>
										</div>

										<div className="template-body">
											<div className="pt-0 pb-0 sm:pb-5 card-body items-center text-center">
												<h2 className="font-black capitalize text-lg md:text-2xl lg:text-3xl">
													{formTemplate.templateTitle}
												</h2>
												<h2 className="-mt-2 w-full font-bold text-sm md:text-lg lg:text-xl">
													{
														formTemplate.templateDescription
													}
												</h2>
											</div>
										</div>
										<button
											onClick={() => {
												createForm(
													formTemplate.templateName
												);
											}}
											className="sm:-mt-2 sm:mb-2 btn btn-sm btn-primary h-fit w-fit px-3 py-1 capitalize font-black text-sm md:text-lg lg:text-xl shadow-md"
										>
											Create
										</button>
									</div>
								</>
							);
						})}
					</div>
				</div>
			</>
		);
	};

	const statsTab = () => {
		return (
			<>
				<div className="w-full items-center">
					<h1 className="">Stats Tab</h1>
				</div>
			</>
		);
	};

	const contextClass = {
		success: "bg-success",
		error: "bg-error",
		info: "bg-info",
		warning: "bg-warning",
		default: "bg-success",
		dark: "bg-success",
	};

	return (
		<>
			<ToastContainer
				toastClassName={({ type }) =>
					contextClass[type || "default"] +
					"relative flex flex-col p-1 rounded-xl justify-between overflow-hidden cursor-pointer m-2 bg-base-100 ease-in-out"
				}
				bodyClassName={() =>
					"text-md block p-1 text-base-content justify-center items-center"
				}
				position="top-right"
				autoClose={1200}
				closeButton={false}
				hideProgressBar={true}
			/>

			<div className="w-full min-h-screen bg-base-200 justify-center items-center">
				{forsmifyTabs()}

				<div className="h-fit mx-1 mt-2 md:mx-2 lg:mx-3 card bg-base-100 shadow-md">
					{activeTab === `viewTab` ? <>{viewTab()}</> : <></>}
					{activeTab === `createTab` ? <>{createTab()}</> : <></>}
					{activeTab === `statsTab` ? <>{statsTab()}</> : <></>}
				</div>

				<div className="blankDiv pt-5 w-full" />
			</div>
		</>
	);
};

export default Dashboard;
