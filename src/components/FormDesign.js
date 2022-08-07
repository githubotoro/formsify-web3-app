import validator from "validator";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { current, success } from "daisyui/src/colors";
import { useState, useEffect, useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { ethers } from "ethers";

import { useLocation, useParams } from "react-router-dom";

import { UserContext } from "../helper/UserContext";
import { db } from "../firebase-config";
import { chain, chainId, useNetwork } from "wagmi";
import {
	collection,
	getDocs,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "firebase/firestore";

import MainFormsifyContract from "../helper/Formsify.json";
import { useAccount, useWebSocketProvider, useSigner } from "wagmi";
import { ContractFactory } from "ethers";

import { useNavigate } from "react-router-dom";

const FormDesign = () => {
	const navigate = useNavigate();

	const params = useParams();
	const location = useLocation();
	const { User, setUser } = useContext(UserContext);

	const { chain } = useNetwork();

	const { address, isConnected, connector } = useAccount();
	const { data: signer } = useSigner();

	const CONTRACT_ABI = MainFormsifyContract.abi;
	const CONTRACT_BYTECODE = MainFormsifyContract.bytecode;

	const [imageUrl, setImageUrl] = useState("");

	// const setBanner = () => {
	// 	return (
	// 		<>
	// 			<ImageUpload setUrl={setImageUrl} />
	// 			ImageUrl :{" "}
	// 			<a href={imageUrl} target="_blank" rel="noopener noreferrer">
	// 				{imageUrl}
	// 			</a>
	// 		</>
	// 	);
	// };

	// ===============
	// FORM PARAMETERS
	// ===============

	const INFINITE = 100000000;

	const defaultTime = new Date();
	const formatDate = (DateObject) => {
		let yearObject = DateObject.getFullYear().toString();
		let monthObject = (DateObject.getMonth() + 1).toString();
		let dateObject = DateObject.getDate().toString();
		let hoursObject = DateObject.getHours().toString();
		let minutesObject = DateObject.getMinutes().toString();

		if (monthObject.length < 2) {
			monthObject = monthObject.padStart(2, "0");
		}
		if (dateObject.length < 2) {
			dateObject = dateObject.padStart(2, "0");
		}
		if (hoursObject.length < 2) {
			hoursObject = hoursObject.padStart(2, "0");
		}
		if (minutesObject.length < 2) {
			minutesObject = minutesObject.padStart(2, "0");
		}

		return `${yearObject}-${monthObject}-${dateObject}T${hoursObject}:${minutesObject}`;
	};

	const [formParameters, setFormParameters] = useState({
		formMaxFills: INFINITE,
		formAllowedTotalFills: INFINITE,
		formStartTime: formatDate(defaultTime),
		formEndTime: formatDate(defaultTime),
		formPublicKey: "some public key",
		formPrivateKey: "some private key",
	});

	const [formDeployed, setFormDeployed] = useState(false);

	useEffect(() => {
		if (formParameters.formAllowedTotalFills === ``) {
			let newFormParameters = { ...formParameters };
			newFormParameters[`formAllowedTotalFills`] = INFINITE;
			setFormParameters(newFormParameters);
		}
	}, [formParameters.formAllowedTotalFills]);

	useEffect(() => {
		if (formParameters.formAllowedTotalFills === ``) {
			let newFormParameters = { ...formParameters };
			newFormParameters[`formMaxFills`] = INFINITE;
			setFormParameters(newFormParameters);
		}
	}, [formParameters.formMaxFills]);

	const changeFormParameter = (e, parameter) => {
		let newFormParameters = { ...formParameters };
		newFormParameters[parameter] = e.target.value;
		setFormParameters(newFormParameters);
	};

	// ===============
	// FORM PARAMETERS
	// ===============

	// ==============
	// FORM TEMPLATES
	// ==============

	// const formTemplatesFields = {
	// 	meetTemplate : [

	// 	]
	// }

	// ==============
	// FORM TEMPLATES
	// ==============

	// ====================
	// INITIAL FORM LOADING
	// ====================

	useEffect(() => {
		const loadFormData = async () => {
			if (isConnected) {
				try {
					const userDocRef = doc(db, "users", address);
					const userDoc = await getDoc(userDocRef);
					setUser(userDoc.data());

					if (User[params.id] !== undefined) {
						toast(
							<div className="flex flex-col font-bold items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 stroke-neutral"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={3}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/>
								</svg>
								<div>
									<span className="font-black">
										Loading Form...
									</span>
								</div>
							</div>,
							{
								toastId: "loadingForm",
								progressClassName: "border-4 border-neutral",
							}
						);

						setFields(User[params.id].fields);
						setFormHead(User[params.id].formHead);
						setFormParameters(User[params.id].formParameters);
						setFormTheme(User[params.id].formTheme);

						toast.update("loadingForm", {
							render: (
								<div className="flex flex-col font-bold items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 stroke-success"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={3}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<div>
										Form has been&nbsp;
										<span className="font-black">
											Loaded.
										</span>
									</div>
								</div>
							),

							progressClassName: "border-4 border-success",
						});
					}
				} catch (err) {
					console.log(err);
				}

				// if (User[params.id] === undefined) {
				// }
			}
		};

		loadFormData();
	}, []);

	// ====================
	// INITIAL FORM LOADING
	// ====================

	const [deployed, setDeployed] = useState("pending");

	useEffect(() => {
		if (deployed !== undefined) {
			toast.update("deployingForm", {
				render: (
					<div className="flex flex-col font-bold items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 stroke-success"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={3}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<div>
							Form has been&nbsp;
							<span className="font-black">Deployed.</span>
						</div>
					</div>
				),

				autoClose: 1500,
				closeOnClick: true,
				progressClassName: "border-4 border-success",
			});
			setDeployed("pending");
		}

		if (deployed === "error") {
			toast.update("deployingForm", {
				render: (
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
					</div>
				),

				autoClose: 1500,
				closeOnClick: true,
				progressClassName: "border-4 border-error",
			});
			setDeployed("pending");
		}
	}, [deployed]);

	const deployContract = async () => {
		if (isConnected) {
			try {
				saveContract();

				const FormsifyContractFactory = new ContractFactory(
					CONTRACT_ABI,
					CONTRACT_BYTECODE,
					signer
				);

				const FormsifyContract = await FormsifyContractFactory.deploy(
					formParameters.formMaxFills,
					getUnixTimestampStartTime(),
					getUnixTimestampEndTime(),
					formParameters.formAllowedTotalFills,
					formParameters.formPublicKey,
					JSON.stringify(formHead),
					JSON.stringify(fields)
				);

				toast(
					<div className="flex flex-col font-bold items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 stroke-neutral animate-spin"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={3}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
						<div>
							Deploying Form
							<br />
							<span className="font-black">Please Wait...</span>
						</div>
					</div>,
					{
						closeOnClick: false,
						autoClose: false,
						toastId: "deployingForm",
						progressClassName: "border-4 border-neutral",
					}
				);

				const FormsifyContractReceipt =
					await FormsifyContract.deployed();

				if (FormsifyContractReceipt.address !== undefined) {
					setDeployed("success");
				} else {
					setDeployed("error");
				}

				const userDocRef = doc(db, "users", address);

				await updateDoc(userDocRef, {
					[`${params.id}.formDeployed`]: true,
					[`${params.id}.deployChain`]: JSON.stringify(chain),
					[`${params.id}.deployTransaction`]: JSON.stringify(
						FormsifyContractReceipt.deployTransaction
					),
				});

				const userDoc = await getDoc(userDocRef);
				setUser(userDoc.data());
			} catch (err) {
				setDeployed("error");
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

	const saveContract = async () => {
		if (isConnected) {
			try {
				toast(
					<div className="flex flex-col font-bold items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 stroke-neutral"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={3}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
						<div>
							<span className="font-black">Saving</span>&nbsp;
							Draft...
						</div>
					</div>,
					{
						autoClose: false,
						toastId: "savingDraft",
						progressClassName: "border-4 border-neutral",
					}
				);

				const userDocRef = doc(db, "users", address);
				const updateUserDoc = await updateDoc(userDocRef, {
					[params.id]: {
						formTheme: formTheme,
						formParameters: formParameters,
						formDeployed: formDeployed,
						fields: fields,
						formHead: formHead,
						lastSaved: Date(),
					},
				});

				const userDoc = await getDoc(userDocRef);
				setUser(userDoc.data());

				toast.update("savingDraft", {
					render: (
						<div className="flex flex-col font-bold items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 stroke-success"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={3}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<div>
								Draft has been&nbsp;
								<span className="font-black">Saved.</span>
							</div>
						</div>
					),

					autoClose: 1200,
					progressClassName: "border-4 border-success",
				});
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
						autoClose: 1200,
						progressClassName: "border-4 border-error",
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
	};

	// console.log("Form Type is", location.state.formType);

	// console.log(
	// 	`Got form id from useParams as ${params.id} and its type is ${params.formType}`
	// );

	// console.log(params.formType);

	// const templateFormFields = {
	// 	blankTemplate: [...fields],
	// };

	// const setTemplateFormFields = (formType) => {};

	// Form Fields
	const [fields, setFields] = useState([
		{
			fieldText: `Untitled Field`,
			fieldType: `shortResponse`,
			required: `true`,
		},
	]);

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

	// Get field input based on field type
	const getFieldInput = (field, index) => {
		if (field.fieldType === `shortResponse`) {
			return (
				<>
					<input
						type="text"
						placeholder="Type Your Response..."
						className="mt-1 font-semibold text-lg w-full input border-4 input-bordered"
					/>
				</>
			);
		} else if (field.fieldType === `longResponse`) {
			return (
				<>
					<textarea
						className="mt-1 font-semibold text-lg w-full textarea border-4 textarea-bordered"
						placeholder="Type Your Response..."
					></textarea>
				</>
			);
		} else if (field.fieldType === `dateResponse`) {
			return (
				<>
					<input
						type="date"
						className="mt-1 font-bold text-lg w-full textarea border-4 textarea-bordered"
					></input>
				</>
			);
		} else if (field.fieldType === `timeResponse`) {
			return (
				<>
					<input
						type="time"
						className="mt-1 font-bold text-lg w-full textarea border-4 textarea-bordered"
					></input>
				</>
			);
		} else if (field.fieldType === `dateAndTime`) {
			return (
				<>
					<input
						type="datetime-local"
						className="mt-1 font-bold text-lg w-full textarea border-4 textarea-bordered"
					></input>
				</>
			);
		} else if (field.fieldType === `numberResponse`) {
			return (
				<>
					<input
						type="number"
						className="mt-1 font-semibold text-lg w-full textarea border-4 textarea-bordered"
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
										<button
											className="flex h-fit w-fit py-1 px-3 btn btn-sm btn-secondary shadow-sm border-4 border-neutral shadow-neutral-focus"
											onClick={() => {
												deleteChoice(
													index,
													choiceIndex
												);
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 stroke-secondary-content"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={2.5}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</button>
										<div className="form-control w-full">
											<label className="justify-start space-x-3 label cursor-pointer items-center">
												<input
													type="checkbox"
													className="checkbox shadow-sm shadow-accent"
												/>

												<TextareaAutosize
													className="label-text text-lg font-bold w-full appearance-none focus:outline-none focus:border-b-4 focus:border-primary overflow-hidden bg-transparent resize-none"
													value={choice.choiceText}
													onChange={(e) => {
														changeChoiceText(
															e,
															index,
															choiceIndex
														);
													}}
												/>
											</label>
										</div>
									</div>
								</>
							);
						})}
					</div>
					<div>
						<button
							className="btn btn-sm h-fit w-fit px-3 btn-secondary capitalize font-bold text-lg mt-2 border-4 border-neutral shadow-sm shadow-neutral-focus"
							onClick={() => {
								addChoice(index);
							}}
						>
							Add Option
						</button>
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
										<button
											className="flex h-fit w-fit py-1 px-3 btn btn-sm btn-secondary shadow-sm border-4 border-neutral shadow-neutral-focus"
											onClick={() => {
												deleteChoice(
													index,
													choiceIndex
												);
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 stroke-secondary-content"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={2.5}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</button>
										<div className="form-control w-full">
											<label className="justify-start space-x-3 label cursor-pointer items-center">
												<input
													type="radio"
													name={`radio${index}`}
													className="radio border-neutral shadow-sm shadow-accent"
												/>

												<TextareaAutosize
													className="label-text text-lg font-bold w-full appearance-none focus:outline-none focus:border-b-4 focus:border-primary overflow-hidden bg-transparent resize-none"
													value={choice.choiceText}
													onChange={(e) => {
														changeChoiceText(
															e,
															index,
															choiceIndex
														);
													}}
												/>
											</label>
										</div>
									</div>
								</>
							);
						})}
					</div>
					<div>
						<button
							className="btn btn-sm h-fit w-fit px-3 btn-secondary capitalize font-bold text-lg mt-2 border-4 border-neutral shadow-sm shadow-neutral-focus"
							onClick={() => {
								addChoice(index);
							}}
						>
							Add Option
						</button>
					</div>
				</>
			);
		}
	};

	// =============================
	// Choice Manipulation Functions
	// =============================

	const changeChoiceText = (e, index, choiceIndex) => {
		let newFields = [...fields];
		newFields[index].choices[choiceIndex].choiceText = e.target.value;
		setFields(newFields);
	};

	const deleteChoice = (index, choiceIndex) => {
		let newFields = [...fields];
		newFields[index].choices.splice(choiceIndex, 1);
		setFields(newFields);
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
					Choice has been <span className="font-black">deleted</span>
				</div>
			</div>,
			{
				progressClassName: "border-4 border-info",
			}
		);
	};

	const addChoice = (index) => {
		let newFields = [...fields];
		let newChoice = {
			choiceText: `Option`,
		};
		newFields[index].choices.push(newChoice);
		setFields(newFields);
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
					New Choice has been{" "}
					<span className="font-black">added</span>
				</div>
			</div>,
			{
				progressClassName: "border-4 border-info",
			}
		);
	};

	// =============================
	// Choice Manipulation Functions
	// =============================

	// ============================
	// Field Manipulation Functions
	// ============================

	const changeField = (index, newFieldType) => {
		let newFields = [...fields];
		newFields[index] = fieldMap.get(newFieldType);
		setFields(newFields);
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
					Field has been changed to{" "}
					<span className="font-black capitalize">
						{fieldTypesNames[newFieldType]}.
					</span>
				</div>
			</div>,
			{
				progressClassName: "border-4 border-info",
			}
		);
	};

	const addField = (index, newFieldType) => {
		let newFields = [...fields];
		newFields.splice(index + 1, 0, fieldMap.get(newFieldType));
		setFields(newFields);
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
					New field has been{" "}
					<span className="font-black">Added.</span>
				</div>
			</div>,
			{
				progressClassName: "border-4 border-info",
			}
		);
	};

	const duplicateField = (index) => {
		let newFields = [...fields];
		newFields.splice(index + 1, 0, newFields[index]);
		setFields(newFields);
	};

	const deleteField = (index) => {
		let newFields = [...fields];
		newFields.splice(index, 1);
		setFields(newFields);
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
					Field has been <span className="font-black">Deleted.</span>
				</div>
			</div>,
			{
				progressClassName: "border-4 border-info",
			}
		);
	};

	// ============================
	// Field Manipulation Functions
	// ============================

	// ===============================
	// Field Selection Menu & Settings
	// ===============================

	const getSectionHeading = (fieldType) => {
		if (fieldType === `shortResponse`) {
			return (
				<>
					<div className="text-xl font-black">Text Based </div>
				</>
			);
		}

		if (fieldType === `multipleChoice`) {
			return (
				<>
					<div className="pt-3 text-xl font-black">Choice Based </div>
				</>
			);
		}

		if (fieldType === `dateResponse`) {
			return (
				<>
					<div className="pt-3 text-xl font-black">Number Based </div>
				</>
			);
		}
	};

	const getAddFieldMenu = (index) => {
		let tempCounter = 0;
		return (
			<>
				<center>
					<div className="justify-center space-x-2 space-y-1">
						{fieldTypes.map((fieldType, fieldTypeIndex) => {
							return (
								<>
									{getSectionHeading(fieldType)}
									<button
										className="btn btn-sm capitalize font-bold text-lg"
										onClick={() => {
											addField(index, fieldType);
										}}
									>
										{fieldTypesNames[fieldType]}
									</button>
								</>
							);
						})}
					</div>
				</center>
			</>
		);
	};

	const getChangeFieldMenu = (index) => {
		return (
			<>
				<center>
					<div className="justify-center space-x-2 space-y-1">
						{fieldTypes.map((fieldType, fieldTypeIndex) => {
							return (
								<>
									{getSectionHeading(fieldType)}
									<button
										className="btn btn-sm capitalize font-bold text-lg"
										onClick={() => {
											changeField(index, fieldType);
										}}
									>
										{fieldTypesNames[fieldType]}
									</button>
								</>
							);
						})}
					</div>
				</center>
			</>
		);
	};

	const handleRequiredChange = (index) => {
		let newFields = [...fields];
		newFields[index].required = !newFields[index].required;
		setFields(newFields);
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
					Field has been set to{" "}
					<span className="font-black">
						{fields[index].required === true
							? "Required"
							: "Not Required"}
						.
					</span>
				</div>
			</div>,
			{
				progressClassName: "border-4 border-info",
			}
		);
	};

	const getFieldSettings = (field, index) => {
		return (
			<>
				<div
					className={`btn-group${field.fieldType}${index} text-lg font-bold pt-3 space-x-3 items-center justify-center flex`}
				>
					<label
						for={`adjustmentsModal${field.fieldType}${index}`}
						className="btn btn-sm h-fit w-fit px-3 py-1 shadow-sm border-4 border-primary shadow-primary-focus"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 stroke-neutral-content"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
							/>
						</svg>
					</label>
					<label
						for={`addFieldModal${field.fieldType}${index}`}
						className="btn btn-sm h-fit w-fit px-3 py-1 shadow-sm border-4 border-secondary shadow-secondary-focus"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 stroke-neutral-content"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</label>
					{/* <button
						className="btn bg-secondary shadow-md border-4 border-neutral"
						onClick={() => {
							duplicateField(index);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
					</button> */}
					<button
						className="btn btn-sm h-fit w-fit px-3 py-1 shadow-sm border-4 border-accent shadow-accent-focus"
						onClick={() => {
							deleteField(index);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 stroke-neutral-content"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>
				</div>

				{/* ADD FIELD MODAL */}

				<input
					type="checkbox"
					id={`addFieldModal${field.fieldType}${index}`}
					className="modal-toggle"
				/>
				<div className="modal backdrop-blur-sm">
					<div className="modal-box w-11/12 max-w-xl">
						<center>
							<h3 className="h-fit badge rounded-xl py-1 w-full uppercase font-black text-xl">
								Add New Field
							</h3>
						</center>

						{/* <hr className="border-4 border-neutral rounded-lg mt-2" /> */}

						<p className="pt-2">{getAddFieldMenu(index)}</p>

						<div className="modal-action">
							<label
								for={`addFieldModal${field.fieldType}${index}`}
								className="btn btn-sm font-bold text-lg capitalize"
							>
								Close
							</label>
						</div>
					</div>
				</div>

				{/* ADJUSTMENTS MODAL */}

				<input
					type="checkbox"
					id={`adjustmentsModal${field.fieldType}${index}`}
					className="modal-toggle"
				/>
				<div className="modal backdrop-blur-sm">
					<div className="modal-box w-11/12 max-w-xl">
						<div className="form-control">
							<label className="label cursor-pointer justify-center">
								<span className="label-text font-black text-2xl">
									Field Required &nbsp;
								</span>
								<input
									id={``}
									type="checkbox"
									className="checkbox"
									checked={field.required}
									onChange={() => {
										handleRequiredChange(index);
									}}
								/>
							</label>
						</div>

						{/* <hr className="border-4 border-neutral rounded-lg my-2" /> */}

						<center>
							<h3 className="h-fit badge rounded-xl py-1 uppercase w-full font-black text-xl mt-1">
								Change Current Field
							</h3>
						</center>

						<p className="pt-2">{getChangeFieldMenu(index)}</p>

						<div className="modal-action">
							<label
								for={`adjustmentsModal${field.fieldType}${index}`}
								className="btn btn-sm font-bold text-lg capitalize"
							>
								Close
							</label>
						</div>
					</div>
				</div>

				{/* TEMP */}
			</>
		);
	};

	const changeFieldText = (e, index) => {
		let newFields = [...fields];
		newFields[index].fieldText = e.target.value;
		setFields(newFields);
	};

	// ===============================
	// Field Selection Menu & Settings
	// ===============================

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
											{index + 1}. &nbsp;
											<TextareaAutosize
												className="w-full appearance-none focus:outline-none focus:border-b-4 focus:border-primary overflow-hidden bg-transparent resize-none"
												value={field.fieldText}
												onChange={(e) => {
													changeFieldText(e, index);
												}}
											/>
										</div>
										<div className="collapse-content text-md font-semibold">
											<p>{getFieldInput(field, index)}</p>
											<p>
												{getFieldSettings(field, index)}
											</p>
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

	// ===================
	// Form Theme Settings
	// ===================

	const [formTheme, setFormTheme] = useState("light");

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
		setFormTheme(theme);
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
					Form theme has been changed to{" "}
					<span className="font-black capitalize">{theme}.</span>
				</div>
			</div>,
			{
				progressClassName:
					"border-4 border-info rounded-xl overflow-hidden",
			}
		);
	};

	const selectTheme = () => {
		return (
			<>
				<div className="dropdown dropdown-hover font-bold">
					<label
						tabIndex="0"
						className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-sm shadow-neutral-focus"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 stroke-neutral-content"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
							/>
						</svg>
					</label>
					<ul
						tabIndex="0"
						className="dropdown-content font-black menu p-2 shadow bg-base-100 rounded-box w-48 capitalize overflow-y-scroll h-60"
					>
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
				</div>
			</>
		);
	};

	// ==================
	// FORM MAIN SETTINGS
	// ==================

	const formSettingsMenu = () => {
		return (
			<>
				{selectTheme()}
				&nbsp;&nbsp;
				<button
					className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-sm shadow-neutral-focus"
					onClick={() => {
						addField(-1, `shortResponse`);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 stroke-neutral-content"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
						/>
					</svg>
				</button>
				&nbsp;&nbsp;
				{/* FORM SETTINGS */}
				<label
					for="formSettingsModal"
					className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-sm shadow-neutral-focus"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 stroke-neutral-content"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</label>
				<input
					type="checkbox"
					id="formSettingsModal"
					className="modal-toggle"
				/>
				<div className="modal backdrop-blur-sm">
					<div className="modal-box w-11/12 max-w-xl">
						<center>
							<h3 className="h-fit badge rounded-xl py-1 uppercase w-full font-black text-xl mt-1">
								FORM SETTINGS
							</h3>
						</center>

						<div className="form-control mt-4">
							<label className="input-group input-group-vertical ">
								<span className="items-center flex flex-col justify-center text-xl font-bold py-1">
									Max Fills of Form
								</span>

								<input
									value={
										formParameters.formMaxFills === INFINITE
											? ``
											: formParameters.formMaxFills
									}
									type="number"
									placeholder={
										formParameters.formMaxFills ===
											INFINITE ||
										formParameters.formMaxFills === ``
											? `INFINITE (By Default)`
											: formParameters.formMaxFills
									}
									className="input input-bordered font-bold text-lg w-full"
									onChange={(e) => {
										changeFormParameter(e, `formMaxFills`);
									}}
								/>
							</label>
						</div>

						<div className="form-control mt-4">
							<label className="input-group input-group-vertical ">
								<span className="items-center flex flex-col justify-center text-xl font-bold py-1">
									Max Fills per Address
								</span>

								<input
									value={
										formParameters.formAllowedTotalFills ===
										INFINITE
											? ``
											: formParameters.formAllowedTotalFills
									}
									type="number"
									placeholder={
										formParameters.formAllowedTotalFills ===
											INFINITE ||
										formParameters.formAllowedTotalFills ===
											``
											? `INFINITE (By Default)`
											: formParameters.formAllowedTotalFills
									}
									className="input input-bordered font-bold text-lg w-full"
									onChange={(e) => {
										changeFormParameter(
											e,
											`formAllowedTotalFills`
										);
									}}
								/>
							</label>
						</div>

						{/* <p className="pt-2">
							<input
								value={formParameters.formMaxFills}
								type="number"
								className="mt-1 font-bold text-lg w-full textarea border-4 textarea-bordered"
							></input>
						</p> */}

						<div className="modal-action">
							<label
								for={`formSettingsModal`}
								className="btn btn-sm font-bold text-lg capitalize"
							>
								Close
							</label>
						</div>
					</div>
				</div>
				{/* FORM SETTINGS */}
				&nbsp;&nbsp;
				{/* FORM INFO */}
				<label
					for="formInfoModal"
					className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-sm shadow-neutral-focus"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 stroke-neutral-content"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</label>
				<input
					type="checkbox"
					id="formInfoModal"
					className="modal-toggle"
				/>
				<div className="modal backdrop-blur-sm">
					<div className="modal-box w-11/12 max-w-xl">
						<center>
							<h3 className="h-fit badge rounded-xl py-1 uppercase w-full font-black text-xl mt-1">
								FORM INFO
							</h3>
						</center>

						<div className="mt-3">
							<h1 className="font-bold text-lg sm:text-xl sm:mt-2 capitalize">
								<span className="font-black">
									Form Theme
									<span className="hidden sm:inline">
										:&nbsp;
									</span>
								</span>
								<br className="sm:hidden" />
								{formTheme}
							</h1>

							<hr className="rounded-lg border-2 sm:border-4 bg-neutral border-neutral my-0 sm:my-2 sm:hidden" />

							<h1 className="font-bold text-lg sm:text-xl sm:mt-2">
								<span className="font-black">
									Max Fills of Form
									<span className="hidden sm:inline">
										:&nbsp;
									</span>
								</span>
								<br className="sm:hidden" />
								{formParameters.formMaxFills === INFINITE
									? `INFINITE`
									: formParameters.formMaxFills}{" "}
							</h1>

							<hr className="rounded-lg border-2 sm:border-4 bg-neutral border-neutral my-0 sm:my-2 sm:hidden" />

							<h1 className="font-bold text-lg sm:text-xl sm:mt-2">
								<span className="font-black">
									Max Fills per Address
									<span className="hidden sm:inline">
										:&nbsp;
									</span>
								</span>
								<br className="sm:hidden" />
								{formParameters.formAllowedTotalFills ===
								INFINITE
									? `INFINITE`
									: formParameters.formAllowedTotalFills}{" "}
							</h1>

							<hr className="rounded-lg border-2 sm:border-4 bg-neutral border-neutral my-0 sm:my-2 sm:hidden" />

							<h1 className="font-bold text-lg sm:text-xl sm:mt-2">
								<span className="font-black">
									Form Opening Time
									<span className="hidden sm:inline">
										:&nbsp;
									</span>
								</span>
								<br className="sm:hidden" />
								{formParameters.formStartTime} (
								{defaultTime.getTimezoneOffset()} Offset)
							</h1>

							<hr className="rounded-lg border-2 sm:border-4 bg-neutral border-neutral my-0 sm:my-2 sm:hidden" />

							<h1 className="font-bold text-lg sm:text-xl sm:mt-2">
								<span className="font-black">
									Form Closing Time
									<span className="hidden sm:inline">
										:&nbsp;
									</span>
								</span>
								<br className="sm:hidden" />
								{formParameters.formEndTime} (
								{defaultTime.getTimezoneOffset()} Offset)
							</h1>

							<hr className="rounded-lg border-2 sm:border-4 bg-neutral border-neutral my-0 sm:my-2 sm:hidden" />

							<h1 className="font-bold text-lg sm:text-xl sm:mt-2">
								<span className="font-black">
									Form ID
									<span className="hidden sm:inline">
										:&nbsp;
									</span>
								</span>
								<br className="sm:hidden" />
								{params.id}
							</h1>
						</div>

						<div className="modal-action">
							<label
								for={`formInfoModal`}
								className="btn btn-sm font-bold text-lg capitalize"
							>
								Close
							</label>
						</div>
					</div>
				</div>
				{/* FORM INFO */}
				&nbsp;&nbsp;
				<button
					className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-sm shadow-neutral-focus"
					onClick={async () => {
						if (isConnected) {
							saveContract().then((response) => {
								navigate(`/${address}/${params.id}/false`);
							});
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
									</div>
								</div>,
								{
									progressClassName: "border-4 border-error",
								}
							);
						}
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 stroke-neutral-content"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
						/>
					</svg>
				</button>
			</>
		);
	};

	// ==================
	// FORM MAIN SETTINGS
	// ==================

	// ============
	// FORM HEADERS
	// ============

	const [formHead, setFormHead] = useState([
		{
			formTitle: `Untitled Form`,
			formDescription: `Form Description`,
		},
	]);

	const changeFormTitle = (e) => {
		let newFormHead = [...formHead];
		newFormHead[0].formTitle = e.target.value;
		setFormHead(newFormHead);
	};

	const changeFormDescription = (e) => {
		let newFormHead = [...formHead];
		newFormHead[0].formDescription = e.target.value;
		setFormHead(newFormHead);
	};

	const formHeader = () => {
		return (
			<>
				<center>
					<div className="card w-11/12 bg-base-300 shadow-xl border-t-8 border-secondary-focus ">
						<div className="card-body px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5">
							<h2 className="card-title font-black text-2xl md:text-3xl lg:text-4xl justify-start focus:border-b-8">
								<TextareaAutosize
									className="content-center w-full appearance-none focus:outline-none focus:border-b-4 focus:border-primary overflow-hidden bg-transparent resize-none "
									value={formHead[0].formTitle}
									onChange={(e) => {
										changeFormTitle(e);
									}}
								/>
							</h2>
							<h2 className="card-title font-bold text-lg md:text-xl lg:text-2xl justify-start">
								<TextareaAutosize
									className="content-center w-full appearance-none focus:outline-none focus:border-b-4 focus:border-primary overflow-hidden bg-transparent resize-none "
									value={formHead[0].formDescription}
									onChange={(e) => {
										changeFormDescription(e);
									}}
								/>
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

	// ============
	// FORM TIMINGS
	// ============

	const formTimings = () => {
		return (
			<>
				<center>
					<div className="card w-11/12 bg-base-300 shadow-xl border-t-8 border-secondary-focus ">
						<div className="card-body px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5">
							<div className=" flex flex-col w-full md:flex-row items-center">
								<div className="-mt-6 grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
									<h2 className="card-title font-black text-lg md:text-xl justify-center items-center focus:border-b-8 flex-col">
										<h1 className="w-fit uppercase">
											Form Opening Time
										</h1>
										<input
											type="datetime-local"
											className="mx-1 input input-bordered border-4 text-md md:text-lg appearance-none z-10"
											value={formParameters.formStartTime}
											onChange={(e) => {
												changeFormParameter(
													e,
													`formStartTime`
												);
											}}
										/>
									</h2>
								</div>

								<div className="-mt-7 sm:-mt-6 grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
									<h2 className="card-title font-black text-lg md:text-xl justify-center items-center focus:border-b-8 flex-col">
										<h1 className="w-fit uppercase">
											Form Closing Time
										</h1>
										<input
											type="datetime-local"
											className="mx-1 input input-bordered border-4 text-md md:text-lg appearance-none"
											value={formParameters.formEndTime}
											onChange={(e) => {
												changeFormParameter(
													e,
													`formEndTime`
												);
											}}
										/>
									</h2>
								</div>
							</div>

							<h2 className="z-10 -mt-3 card-title font-bold text-sm md:text-md lg:text-lg justify-center items-center focus:border-b-8 flex-col">
								<h1 className="w-fit capitalize">
									<span className="font-black uppercase">
										Note:
									</span>{" "}
									<span className="underline">
										Form Timings are set to your Local
										Times.
									</span>
								</h1>
							</h2>
						</div>
					</div>
				</center>
			</>
		);
	};

	// ============
	// FORM TIMINGS
	// ============

	// ========================
	// UNIX TIMESTAMP FUNCTIONS
	// ========================

	const getUnixTimestampStartTime = () => {
		let newDate = new Date();
		newDate.setFullYear(formParameters.formStartTime.slice(0, 4));
		newDate.setMonth(
			parseInt(formParameters.formStartTime.slice(5, 7)) - 1
		);
		newDate.setDate(formParameters.formStartTime.slice(8, 10));
		newDate.setHours(formParameters.formStartTime.slice(11, 13));
		newDate.setMinutes(formParameters.formStartTime.slice(14, 16));
		newDate.setSeconds(0);
		newDate.setMilliseconds(0);

		let utcNewDate = new Date(newDate.toISOString());
		let unixTimestamp = utcNewDate.getTime();

		unixTimestamp = unixTimestamp.toString();
		unixTimestamp = unixTimestamp.slice(0, 10);
		unixTimestamp = parseInt(unixTimestamp);

		return unixTimestamp;
	};

	const getUnixTimestampEndTime = () => {
		let newDate = new Date();
		newDate.setFullYear(formParameters.formEndTime.slice(0, 4));
		newDate.setMonth(parseInt(formParameters.formEndTime.slice(5, 7)) - 1);
		newDate.setDate(formParameters.formEndTime.slice(8, 10));
		newDate.setHours(formParameters.formEndTime.slice(11, 13));
		newDate.setMinutes(formParameters.formEndTime.slice(14, 16));
		newDate.setSeconds(0);
		newDate.setMilliseconds(0);

		let utcNewDate = new Date(newDate.toISOString());
		let unixTimestamp = utcNewDate.getTime();

		unixTimestamp = unixTimestamp.toString();
		unixTimestamp = unixTimestamp.slice(0, 10);
		unixTimestamp = parseInt(unixTimestamp);

		return unixTimestamp;
	};

	// ========================
	// UNIX TIMESTAMP FUNCTIONS
	// ========================

	// ===============
	// Save and Deploy
	// ===============

	const saveDraft = () => {
		return (
			<>
				<button
					onClick={() => {
						saveContract();
					}}
					className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-sm shadow-neutral-focus"
				>
					Save Draft
				</button>
			</>
		);
	};

	const deployForm = () => {
		return (
			<>
				<button
					onClick={() => {
						deployContract();
					}}
					className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-sm shadow-neutral-focus"
				>
					Deploy Form
				</button>
			</>
		);
	};

	const saveAndDeploy = () => {
		return (
			<>
				<div className="flex px-12 justify-center md:justify-end space-x-3">
					{saveDraft()} {deployForm()}
				</div>
			</>
		);
	};

	// ===============
	// Save and Deploy
	// ===============

	const contextClass = {
		success: "bg-success",
		error: "bg-error",
		info: "bg-info",
		warning: "bg-warning",
		default: "bg-success",
		dark: "bg-success",
	};

	const formBanner = () => {
		return (
			<>
				<center>
					<div className="card w-11/12 bg-base-300 shadow-xl border-t-8 border-secondary-focus ">
						<div className="card-body p-0">
							<h2 className="card-title font-black text-2xl md:text-3xl lg:text-4xl justify-start focus:border-b-8">
								{/* <img
									className="h-72 w-full object-cover"
									src={}
								/> */}
							</h2>
							<h2 className="card-title font-bold text-lg md:text-xl lg:text-2xl justify-center -mt-20 pb-4">
								{/* CHANGE BANNER */}
								<label
									// onClick={() => {
									// 	deployContract();
									// }}
									for="formBannerModal"
									className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-sm shadow-neutral-focus"
								>
									Change Banner
								</label>
								{/* CHANGE BANNER */}
								<input
									type="checkbox"
									id="formBannerModal"
									className="modal-toggle"
								/>
								<div className="modal backdrop-blur-sm">
									<div className="modal-box w-11/12 max-w-xl">
										<center>
											<h3 className="h-fit badge rounded-xl py-1 uppercase w-full font-black text-xl mt-1">
												FORM BANNER
											</h3>
										</center>

										<div className="flex justify-center">
											<input
												// onChange={handleChange}
												className="flex py-2 text-md justify-center items-center"
												type="file"
												id="file"
												name="file"
												accept="image/*"
											/>
										</div>

										<div className="modal-action">
											<label
												// onClick={() => {
												// 	handleSubmit();
												// }}
												for={`formBannerModal`}
												className="btn btn-sm btn-primary font-bold text-lg capitalize"
											>
												Submit
											</label>
											<label
												for={`formBannerModal`}
												className="btn btn-sm font-bold text-lg capitalize"
											>
												Close
											</label>
										</div>
									</div>
								</div>
							</h2>
						</div>
					</div>
				</center>
			</>
		);
	};

	return (
		<>
			<div
				data-theme={formTheme}
				className="flex flex-col w-full min-h-screen bg-gradient-to-br from-primary to-accent"
			>
				<center>
					<div className="pt-5 pb-5 max-w-[75rem]">
						{formSettingsMenu()}

						<div className="blankDiv pt-4" />

						{formTimings()}

						{/* <div className="blankDiv pt-4" />

						{formBanner()} */}

						<div className="blankDiv pt-4" />

						{formHeader()}

						<div className="blankDiv pt-4" />

						{formUI()}

						<div className="blankDiv pt-4" />

						{saveAndDeploy()}

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

						{/* {setBanner()} */}
					</div>
				</center>
			</div>
		</>
	);
};

export default FormDesign;
