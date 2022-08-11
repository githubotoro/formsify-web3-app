import FillRender from "../components/FillRender";

import { useAccount, useSigner } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { chain, chainId, useNetwork } from "wagmi";

import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";

import { db } from "../firebase-config";
import {
	collection,
	getDocs,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	query,
	where,
} from "firebase/firestore";

import MainFormsifyContract from "../helper/Formsify.json";
import TextareaAutosize from "react-textarea-autosize";
import { UserContext } from "../helper/UserContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CryptoJS from "crypto-js";

const FormView = () => {
	const { User, setUser } = useContext(UserContext);

	const params = useParams();
	const FORM_OWNER = params.formOwner;
	const FORM_ID = params.formId;
	const FORM_ABI = MainFormsifyContract.abi;

	const { address, isConnected, connector } = useAccount();
	const { chain } = useNetwork();

	const [formParameters, setFormParameters] = useState({});
	const [formChain, setFormChain] = useState();
	const [formTheme, setFormTheme] = useState("light");
	const [formsifyContract, setFormsifyContract] = useState();
	const [formHead, setFormHead] = useState([]);
	const [formAddress, setFormAddress] = useState();

	const [fields, setFields] = useState([]);
	const [responses, setResponses] = useState();

	const [formSigner, setFormSigner] = useState();
	const [formProvider, setFormProvider] = useState();

	const [isLoading, setIsLoading] = useState(true);

	const { data: signer } = useSigner();

	const location = useLocation();

	// ==============
	// FORM COUNTDOWN
	// ==============

	const [currTime, setCurrTime] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 60,
	});

	const [hasFormEnded, setHasFormEnded] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			let newCurrTime = currTime;
			if (currTime.seconds === 0) {
				if (currTime.minutes === 0) {
					if (currTime.hours === 0) {
						if (currTime.days === 0) {
							setHasFormEnded(true);
						} else {
							setCurrTime((prevTime) => ({
								...prevTime,
								days: currTime.days - 1,
								hours: 23,
								minutes: 59,
								seconds: 59,
							}));
						}
					} else {
						setCurrTime((prevTime) => ({
							...prevTime,
							hours: currTime.hours - 1,
							minutes: 59,
							seconds: 59,
						}));
					}
				} else {
					setCurrTime((prevTime) => ({
						...prevTime,
						minutes: currTime.minutes - 1,
						seconds: 59,
					}));
				}
			} else {
				setCurrTime((prevTime) => ({
					...prevTime,
					seconds: currTime.seconds - 1,
				}));
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [currTime]);

	const formCountdown = () => {
		return (
			<>
				<div className="grid grid-flow-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 text-center auto-cols-max">
					<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
						<span className="countdown font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
							<span
								style={{ "--value": `${currTime.days}` }}
							></span>
						</span>
						days
					</div>
					<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content items-center justify-center">
						<span className="countdown font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
							<span
								style={{ "--value": `${currTime.hours}` }}
							></span>
						</span>
						hours
					</div>
					<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
						<span className="countdown font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
							<span
								style={{ "--value": `${currTime.minutes}` }}
							></span>
						</span>
						min
					</div>
					<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
						<span className="countdown font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
							<span
								style={{ "--value": `${currTime.seconds}` }}
							></span>
						</span>
						sec
					</div>
				</div>
			</>
		);
	};

	// ==============
	// FORM COUNTDOWN
	// ==============

	useEffect(() => {
		const formatResponses = async () => {
			if (isConnected) {
				const userDocRef = doc(db, "users", address);
				const userDoc = await getDoc(userDocRef);
				setUser(userDoc.data());
			} else {
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
								Wallet Not Connected!
							</span>
							&nbsp;
						</div>
					</div>,
					{
						progressClassName: "border-4 border-error",
					}
				);
			}
		};

		formatResponses();
	}, [fields]);

	useEffect(() => {
		const getFormData = async () => {
			if (formsifyContract !== undefined) {
				try {
					const fetchedFormParameters =
						await formsifyContract.getParameters();

					const fetchedRecords = await formsifyContract.getRecords();

					const Owner = fetchedFormParameters[0].toString();
					const Fills = parseInt(fetchedFormParameters[1]);
					const MaxFills = parseInt(fetchedFormParameters[2]);
					const StartTime = parseInt(fetchedFormParameters[3]);
					const EndTime = parseInt(fetchedFormParameters[4]);
					const AllowedTotalFills = parseInt(
						fetchedFormParameters[5]
					);

					const cryptoKey =
						User[FORM_ID].formParameters.formCryptoKey;

					setFormParameters({
						fills: Fills,
						maxFills: MaxFills,
						startTime: StartTime,
						endTime: EndTime,
						allowedTotalFills: AllowedTotalFills,
						cryptoKey: cryptoKey,
					});

					// =================
					// SETTING COUNTDOWN
					// =================

					const currDate = new Date();
					const endDate = new Date(EndTime * 1000);

					let timeDiff = (endDate - currDate) / 1000;

					if (timeDiff <= 0) {
						setHasFormEnded(true);
					} else {
						setCurrTime((prevTime) => ({
							...prevTime,
							days: Math.floor(timeDiff / 86400),
							hours: Math.floor(timeDiff / 3600) % 24,
							minutes: Math.floor(timeDiff / 60) % 60,
							seconds: Math.floor(timeDiff % 60),
						}));
					}

					// =================
					// SETTING COUNTDOWN
					// =================

					const rawFormHead = fetchedFormParameters[6];
					setFormHead(JSON.parse(rawFormHead));

					const rawFields = fetchedFormParameters[7];
					setFields(JSON.parse(rawFields));

					setResponses(fetchedRecords);

					setIsLoading(false);
				} catch (err) {
					console.log(err);
				}
			}
		};

		getFormData();
	}, [formsifyContract]);

	useEffect(() => {
		const getFormsifyContract = async () => {
			if (formSigner !== undefined) {
				const fetchedFormsifyContract = new ethers.Contract(
					formAddress,
					FORM_ABI,
					formSigner
				);
				setFormsifyContract(fetchedFormsifyContract);
			}
		};

		getFormsifyContract();
	}, [formSigner]);

	useEffect(() => {
		const getFormSigner = async () => {
			if (formProvider !== undefined) {
				const formSigner = formProvider.getSigner(
					"0xD5a63CCE627372481b30AE24c31a3Fb94913D5Be"
				);
				setFormSigner(formSigner);
			}
		};

		getFormSigner();
	}, [formProvider]);

	useEffect(() => {
		const getFormProvider = async () => {
			if (formChain === 80001) {
				const polygonMumbaiProvider =
					new ethers.providers.JsonRpcProvider(
						process.env.REACT_APP_POLYGON_MUMBAI_API_KEY
					);

				setFormProvider(polygonMumbaiProvider);
			}
		};

		getFormProvider();
	}, [formChain]);

	useEffect(() => {
		const getFormsifyForm = async () => {
			try {
				const formDocRef = doc(db, "users", FORM_OWNER);
				const formDoc = await getDoc(formDocRef);

				const formDocData = formDoc.data();
				const formData = formDocData[FORM_ID];

				setFormTheme(formData.formTheme);

				const rawDeployChain = JSON.parse(formData.deployChain);
				setFormChain(rawDeployChain.id);

				const rawDeployTransaction = JSON.parse(
					formData.deployTransaction
				);
				setFormAddress(rawDeployTransaction.creates);
			} catch (err) {
				console.log(err);
			}
		};

		getFormsifyForm();
	}, []);

	const formLoader = () => {
		return (
			<>
				<div className="min-h-screen min-w-screen flex flex-col justify-center items-center space-y-2 bg-base-200">
					<div className="font-black text-2xl text-base-content">
						Loading Form...
					</div>
					<progress className="progress w-56 h-4"></progress>
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

	const getResponseFields = (res) => {
		const encryptedResponse = res;
		const decryptedResponse = CryptoJS.AES.decrypt(
			encryptedResponse,
			formParameters.cryptoKey
		);
		const decryptedJSON = JSON.parse(
			decryptedResponse.toString(CryptoJS.enc.Utf8)
		);

		return (
			<>
				{decryptedJSON.map((decryptedRes, decryptedResIndex) => {
					return <td>{decryptedRes}</td>;
				})}
			</>
		);
	};

	const getLocaleTimestamp = (blockTimestamp) => {
		const localTime = new Date(blockTimestamp * 1000);
		return localTime.toString();
	};

	const viewResponses = () => {
		return (
			<>
				<div className="relative overflow-scroll shadow-lg">
					<div classname="bg-base-300 overflow-x-auto ">
						<table className="table table-compact w-full border-8 border-base-100">
							<thead>
								<tr>
									<th></th>
									<th className="capitalize">Address</th>
									<th className="capitalize">Timestamp</th>
									{fields.map((field, fieldIndex) => {
										return (
											<th className="capitalize">
												Field-{fieldIndex + 1}
											</th>
										);
									})}
								</tr>
							</thead>
							<tbody>
								{responses.map((response, responseIndex) => {
									return (
										<tr>
											<th>{responseIndex + 1}</th>
											<td>{response.fillAddress}</td>
											<td>
												{getLocaleTimestamp(
													response.fillTimestamp.toNumber()
												)}
											</td>
											{getResponseFields(
												response.fillData
											)}
										</tr>
									);
								})}
							</tbody>
							<tfoot>
								<tr>
									<th></th>
									<th className="capitalize">Address</th>
									<th className="capitalize">Timestamp</th>
									{fields.map((field, fieldIndex) => {
										return (
											<th className="capitalize">
												Field-{fieldIndex + 1}
											</th>
										);
									})}
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</>
		);
	};

	const legends = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl sticky">
					<div className="card-body px-5 py-3">
						<h2 className="uppercase card-title font-black drop-shadow-sm">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 fill-base-content"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
								<path
									fillRule="evenodd"
									d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
									clipRule="evenodd"
								/>
							</svg>
							Legends
						</h2>
						<div className="flex justify-start flex-col">
							{fields.map((field, fieldIndex) => {
								return (
									<>
										<div className="flex justify-start items-center">
											<div className="capitalize badge badge-secondary font-bold shadow-md">
												Field-{fieldIndex + 1}
											</div>
											&nbsp;&nbsp;
											<span className="font-bold">
												{field.fieldText}
											</span>
										</div>
									</>
								);
							})}
						</div>
					</div>
				</div>
			</>
		);
	};

	const countdownCard = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl">
					<div className="flex card-body px-5 py-3 w-full justify-center items-center">
						<div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">
							Form&nbsp;
							<div className="py-0 px-1 sm:px-2 badge badge-info font-extrabold tracking-wide text-xl sm:text-2xl md:text-3xl lg:text-4xl rounded-lg shadow-md w-fit h-fit items-center">
								Closes
							</div>
							&nbsp;In
						</div>
						<center>{formCountdown()}</center>
					</div>
				</div>
			</>
		);
	};

	const infoCard = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl sticky">
					<div className="card-body px-5 py-3">
						<h2 className="uppercase card-title font-black drop-shadow-sm">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 fill-base-content"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clipRule="evenodd"
								/>
							</svg>
							Form Info
						</h2>
						<div className="flex justify-start flex-col">
							<div className="flex justify-start items-center">
								<div className="capitalize badge badge-primary font-bold shadow-md w-fit h-fit">
									Address
								</div>
								&nbsp;<span className="font-black">:</span>
								&nbsp;
								<span className="font-bold truncate">
									{formAddress}
								</span>
								&nbsp;
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 fill-secondary stroke-secondary hover:fill-accent hover:stroke-accent cursor-pointer"
										viewBox="0 0 20 20"
										fill="currentColor"
										onClick={() => {
											navigator.clipboard.writeText(
												`${formAddress}`
											);

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
														Form Address has
														been&nbsp;
														<span className="font-black">
															Copied.
														</span>
													</div>
												</div>,
												{
													progressClassName:
														"border-4 border-info",
												}
											);
										}}
									>
										<path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
										<path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
									</svg>
								</div>
								&nbsp;
								<a
									href={`https://mumbai.polygonscan.com/address/${formAddress}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 fill-accent stroke-accent hover:fill-primary hover:stroke-primary cursor-pointer"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
										<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
									</svg>
								</a>
							</div>

							<div className="mt-[0.1rem] flex justify-start items-center">
								<div className="capitalize badge badge-primary font-bold shadow-md w-fit h-fit">
									Id
								</div>
								&nbsp;<span className="font-black">:</span>
								&nbsp;
								<span className="font-bold truncate">
									{FORM_ID}
								</span>
								&nbsp;
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 fill-secondary stroke-secondary hover:fill-accent hover:stroke-accent cursor-pointer sha"
										viewBox="0 0 20 20"
										fill="currentColor"
										onClick={() => {
											navigator.clipboard.writeText(
												`${FORM_ID}`
											);

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
														Form ID has been&nbsp;
														<span className="font-black">
															Copied.
														</span>
													</div>
												</div>,
												{
													progressClassName:
														"border-4 border-info",
												}
											);
										}}
									>
										<path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
										<path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
									</svg>
								</div>
								&nbsp;
								<a
									href={`https://formsify.vercel.app/${FORM_OWNER}/${FORM_ID}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 fill-accent stroke-accent hover:fill-primary hover:stroke-primary cursor-pointer"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
										<path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<div>
				{isLoading ? (
					<>
						<div className="bg-primary">{formLoader()}</div>
					</>
				) : (
					<>
						<div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-primary to-accent">
							<center>
								<div className="p-5 w-full">
									{hasFormEnded === false ? (
										<>{countdownCard()}</>
									) : (
										<>Form has ended</>
									)}

									<div className="blankDiv pt-4" />

									{infoCard()}

									<div className="blankDiv pt-4" />

									{legends()}

									<div className="blankDiv pt-4" />

									{viewResponses()}
								</div>
							</center>
						</div>
					</>
				)}
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
			</div>
		</>
	);
};

export default FormView;
