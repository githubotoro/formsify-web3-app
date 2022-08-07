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

const FormFill = () => {
	const { User, setUser } = useContext(UserContext);

	const params = useParams();
	const FORM_OWNER = params.formOwner;
	const FORM_ID = params.formId;
	const FORM_ABI = MainFormsifyContract.abi;

	const { address, isConnected, connector } = useAccount();
	const { chain } = useNetwork();

	const [formParameters, setFormParameters] = useState({});
	const [fields, setFields] = useState([]);
	const [formChain, setFormChain] = useState();
	const [formTheme, setFormTheme] = useState("light");
	const [formsifyContract, setFormsifyContract] = useState();
	const [formHead, setFormHead] = useState([]);
	const [formAddress, setFormAddress] = useState();

	const [formSigner, setFormSigner] = useState();
	const [formProvider, setFormProvider] = useState();

	const [isLoading, setIsLoading] = useState(true);

	const [responses, setResponses] = useState({});

	const { data: signer } = useSigner();

	const location = useLocation();

	const isFormDeployed = params.preview;

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

	useEffect(() => {
		if (fields.length !== 0) {
			let responseList = [];
			for (let i = 0; i < fields.length; i++) {
				if (
					fields[i].fieldType === `multipleChoice` ||
					fields[i].fieldType === `checkBoxes`
				) {
					let newResponseField = [];
					for (let j = 0; j < fields[i].choices.length; j++) {
						newResponseField.push(false);
					}

					responseList.push(newResponseField);
				} else {
					responseList.push("");
				}
			}

			setResponses(responseList);
		}
	}, [fields]);

	useEffect(() => {
		const getFormData = async () => {
			if (formsifyContract !== undefined) {
				try {
					const fetchedFormParameters =
						await formsifyContract.getParameters();

					const Owner = fetchedFormParameters[0].toString();
					const Fills = parseInt(fetchedFormParameters[1]);
					const MaxFills = parseInt(fetchedFormParameters[2]);
					const StartTime = parseInt(fetchedFormParameters[3]);
					const EndTime = parseInt(fetchedFormParameters[4]);
					const AllowedTotalFills = parseInt(
						fetchedFormParameters[5]
					);
					const PublicKey = fetchedFormParameters[6].toString();

					setFormParameters({
						fills: Fills,
						maxFills: MaxFills,
						startTime: StartTime,
						endTime: EndTime,
						allowedTotalFills: AllowedTotalFills,
						publicKey: PublicKey,
					});

					const rawFormHead = fetchedFormParameters[7];
					setFormHead(JSON.parse(rawFormHead));

					const rawFields = fetchedFormParameters[8];
					setFields(JSON.parse(rawFields));

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

		if (isFormDeployed === undefined) {
			getFormsifyForm();
		}
	}, []);

	useEffect(() => {
		if (isFormDeployed !== undefined) {
			setFormParameters({
				fills: 0,
				maxFills: User[FORM_ID].formParameters.formMaxFills,
				startTime: User[FORM_ID].formParameters.formStartTime,
				endTime: User[FORM_ID].formParameters.formEndTime,
				allowedTotalFills:
					User[FORM_ID].formParameters.formAllowedTotalFills,
				publicKey: User[FORM_ID].formParameters.formPublicKey,
			});

			setFormTheme(User[FORM_ID].formTheme);
			setFormHead(User[FORM_ID].formHead);
			setFields(User[FORM_ID].fields);

			setIsLoading(false);
		}
	}, [User]);

	const formLoader = () => {
		return (
			<>
				<div className="min-h-screen min-w-screen flex flex-col justify-center items-center space-y-2 bg-base-100">
					<div className="font-black text-2xl text-base-content">
						Loading Form...
					</div>
					<progress className="progress w-56 h-4"></progress>
				</div>
			</>
		);
	};

	// =========
	// VIEW FORM
	// =========

	// Types of Form Fields
	const fieldTypes = [
		`shortResponse`,
		`longResponse`,
		`multipleChoice`,
		`checkBoxes`,
		`dateResponse`,
		`timeResponse`,
		`numberResponse`,
		`dateAndTime`,
	];

	// Corresponding names for all Form Field Types
	const fieldTypesNames = {
		shortResponse: `Short`,
		longResponse: `Long`,
		multipleChoice: `MCQ`,
		checkBoxes: `Checkbox`,
		dateResponse: `Date`,
		timeResponse: `Time`,
		numberResponse: `Number`,
		dateAndTime: `Date & Time`,
	};

	// Field Map to set new fields
	const fieldMap = new Map();

	for (
		let fieldTypeIndex = 0;
		fieldTypeIndex < fieldTypes.length;
		fieldTypeIndex++
	) {
		let newField;

		if (
			`${fieldTypes[fieldTypeIndex]}` === "multipleChoice" ||
			`${fieldTypes[fieldTypeIndex]}` === "checkBoxes"
		) {
			newField = {
				fieldText: `Untitled Field`,
				fieldType: `${fieldTypes[fieldTypeIndex]}`,
				choices: [{ choiceText: `Option` }],
				required: true,
			};
		} else {
			newField = {
				fieldText: `Untitled Field`,
				fieldType: `${fieldTypes[fieldTypeIndex]}`,
				required: true,
			};
		}

		fieldMap.set(`${fieldTypes[fieldTypeIndex]}`, newField);
	}

	// Change Input Response
	const changeInputResponse = (e, index) => {
		let newResponses = [...responses];
		newResponses[index] = e.target.value;
		setResponses(newResponses);
	};

	// Change Input Choice MCQ
	const changeInputChoiceMCQ = (e, index, choiceIndex) => {
		let newResponses = [...responses];

		for (let j = 0; j < fields[index].choices.length; j++) {
			newResponses[index][j] = false;
		}

		newResponses[index][choiceIndex] = true;
		setResponses(newResponses);
	};

	// Change Input Choice Checkbox
	const changeInputChoiceCheckbox = (e, index, choiceIndex) => {
		let newResponses = [...responses];

		newResponses[index][choiceIndex] = !newResponses[index][choiceIndex];
		setResponses(newResponses);
	};

	// Get field input based on field type
	const getFieldInput = (field, index) => {
		if (field.fieldType === `shortResponse`) {
			return (
				<>
					<input
						type="text"
						placeholder="Type Your Response..."
						className="mt-1 font-semibold text-lg w-full input border-4 input-bordered"
						onChange={(e) => {
							changeInputResponse(e, index);
						}}
					/>
				</>
			);
		} else if (field.fieldType === `longResponse`) {
			return (
				<>
					<textarea
						className="mt-1 font-semibold text-lg w-full textarea border-4 textarea-bordered"
						placeholder="Type Your Response..."
						onChange={(e) => {
							changeInputResponse(e, index);
						}}
					></textarea>
				</>
			);
		} else if (field.fieldType === `dateResponse`) {
			return (
				<>
					<input
						type="date"
						className="mt-1 font-bold text-lg w-full textarea border-4 textarea-bordered"
						onChange={(e) => {
							changeInputResponse(e, index);
						}}
					></input>
				</>
			);
		} else if (field.fieldType === `timeResponse`) {
			return (
				<>
					<input
						type="time"
						className="mt-1 font-bold text-lg w-full textarea border-4 textarea-bordered"
						onChange={(e) => {
							changeInputResponse(e, index);
						}}
					></input>
				</>
			);
		} else if (field.fieldType === `dateAndTime`) {
			return (
				<>
					<input
						type="datetime-local"
						className="mt-1 font-bold text-lg w-full textarea border-4 textarea-bordered"
						onChange={(e) => {
							changeInputResponse(e, index);
						}}
					></input>
				</>
			);
		} else if (field.fieldType === `numberResponse`) {
			return (
				<>
					<input
						type="number"
						className="mt-1 font-semibold text-lg w-full textarea border-4 textarea-bordered"
						onChange={(e) => {
							changeInputResponse(e, index);
						}}
					></input>
				</>
			);
		} else if (field.fieldType === `checkBoxes`) {
			return (
				<>
					<div className="mt-1 font-semibold text-lg w-full space-y-2">
						{field.choices.map((choice, choiceIndex) => {
							return (
								<>
									<div className="choiceContainer flex flex-row space-x-2 items-center">
										<div className="form-control w-full">
											<label className="justify-start space-x-3 label cursor-pointer items-center">
												<input
													type="checkbox"
													className="checkbox shadow-sm shadow-accent"
													onChange={(e) => {
														changeInputChoiceCheckbox(
															e,
															index,
															choiceIndex
														);
													}}
												/>
												<div className="label-text text-lg font-bold">
													{choice.choiceText}
												</div>
											</label>
										</div>
									</div>
								</>
							);
						})}
					</div>
				</>
			);
		} else if (field.fieldType === `multipleChoice`) {
			return (
				<>
					<div className="mt-1 font-semibold text-lg w-full space-y-2">
						{field.choices.map((choice, choiceIndex) => {
							return (
								<>
									<div className="choiceContainer flex flex-row space-x-2 items-center">
										<div className="form-control w-full">
											<label className="justify-start space-x-3 label cursor-pointer items-center">
												<input
													type="radio"
													name={`radio${index}`}
													className="radio border-neutral shadow-sm shadow-accent"
													onChange={(e) => {
														changeInputChoiceMCQ(
															e,
															index,
															choiceIndex
														);
													}}
												/>
												<div className="label-text text-lg font-bold">
													{choice.choiceText}
												</div>
											</label>
										</div>
									</div>
								</>
							);
						})}
					</div>
				</>
			);
		}
	};

	// =========
	// VIEW FORM
	// =========

	// ============
	// FORM HEADERS
	// ============

	const formHeader = () => {
		return (
			<>
				<center>
					<div className="card w-11/12 bg-base-300 shadow-xl border-t-8 border-secondary-focus ">
						<div className="card-body px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5">
							<h2 className="card-title font-black text-2xl md:text-3xl lg:text-4xl justify-start focus:border-b-8">
								{formHead[0].formTitle}
							</h2>
							<h2 className="card-title font-bold text-lg md:text-xl lg:text-2xl justify-start">
								{formHead[0].formDescription}
							</h2>
						</div>
					</div>
				</center>
			</>
		);
	};

	// ============
	// FORM HEADERS
	// ============

	// Main Form UI
	const formUI = () => {
		return (
			<>
				<div className="flex flex-col items-center w-full">
					<div className="space-y-5 w-full items-center flex flex-col">
						{fields.map((field, index) => {
							return (
								<>
									<div
										tabIndex="0"
										className="w-11/12 shadow-lg collapse collapse-open bg-base-300 rounded-box border-t-8 border-secondary-focus space-y-0"
									>
										<div className="-mb-4 collapse-title text-xl font-bold flex-row flex">
											<div className="requiredField mr-1 -mt-1">
												{field.required ? (
													<>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-5 w-5 fill-primary stroke-primary"
															viewBox="0 0 24 24"
															strokeWidth={2}
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
															/>
														</svg>
													</>
												) : (
													<></>
												)}
											</div>
											{index + 1}.&nbsp;
											{field.fieldText}
										</div>
										<div className="collapse-content text-md font-semibold">
											<p>{getFieldInput(field, index)}</p>
										</div>
									</div>
								</>
							);
						})}
					</div>
				</div>
			</>
		);
	};

	const viewForm = () => {
		return <>{formUI()}</>;
	};

	const isFormFilled = () => {
		console.log(fields);
		for (let i = 0; i < fields.length; i++) {
			if (fields[i].required === "true" || fields[i].required === true) {
				if (
					fields[i].fieldType === `shortResponse` ||
					fields[i].fieldType === `longResponse` ||
					fields[i].fieldType === `dateResponse` ||
					fields[i].fieldType === `timeResponse` ||
					fields[i].fieldType === `numberResponse` ||
					fields[i].fieldType === `dateAndTime`
				) {
					if (responses[i] === ``) {
						return false;
					}
				} else if (
					fields[i].fieldType === `multipleChoice` ||
					fields[i].fieldType === `checkBoxes`
				) {
					let flag = 0;

					for (let j = 0; j < fields[i].choices.length; j++) {
						if (responses[i][j] === true) {
							flag += 1;
						}
					}

					if (flag === 0) {
						return false;
					}
				}
			}
		}

		return true;
	};

	const submitResponse = async () => {
		if (isFormFilled()) {
			try {
				const userSigner = formProvider.getSigner();
				const userFormsifyContract = new ethers.Contract(
					formAddress,
					FORM_ABI,
					signer
				);

				const addResponse = await userFormsifyContract.addRecord(
					JSON.stringify(responses)
				);
				await addResponse.wait();
			} catch (err) {
				console.log(err);
			}
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
							Fill All Required Fields!
						</span>
					</div>
				</div>,
				{
					progressClassName: "border-4 border-error",
				}
			);
		}
	};

	const submitForm = () => {
		return (
			<>
				<button
					onClick={() => {
						if (isConnected) {
							if (chain.id === 80001) {
								submitResponse();
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
												Wrong Chain!
											</span>
											&nbsp;
										</div>
									</div>,
									{
										progressClassName:
											"border-4 border-error",
									}
								);
							}
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
					}}
					className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-sm shadow-neutral-focus"
				>
					Submit
				</button>
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
			<div data-theme={formTheme}>
				{isLoading ? (
					<>{formLoader()}</>
				) : (
					<>
						{" "}
						<div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-primary to-accent">
							<center>
								<div className="bg-base-200 py-4">
									{formsifyCustomRainbowConnectWallet()}
								</div>
								<div className="pt-5 pb-5 max-w-[75rem]">
									{formHeader()}
									<div className="blankDiv pt-4" />
									{viewForm()}
									<div className="blankDiv pt-4" />
									{submitForm()}
									{/* {formParameters.fills} */}
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

export default FormFill;
