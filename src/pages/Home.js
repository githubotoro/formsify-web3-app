import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import TextareaAutosize from "react-textarea-autosize";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Blank from "../emojis/blank.svg";
import Contact from "../emojis/contact.svg";
import Meet from "../emojis/meet.svg";
import Party from "../emojis/party.svg";
import Rsvp from "../emojis/rsvp.svg";
import SignUp from "../emojis/signUp.svg";

const Home = () => {
	const defaultFormOwner = `0xD5a63CCE627372481b30AE24c31a3Fb94913D5Be`;
	const defaultFormId = `a5de186-dab5-60-1c23-d84174cb714`;
	const defaultFormAddress = `0x8F95C88B280BdE52A3B704FabCEd7A81F77003c7`;
	const defaultFormTransaction = `0x30753d10657b50c1f17c3cbb1c28f3ff0eb9206343ead4e95d4645fc6e166a8b`;

	const navigate = useNavigate();

	const formsifyHero = () => {
		return (
			<>
				<div className="hero bg-base-200">
					<div className="hero-content text-center">
						<div className="max-w-3xl md:max-w-5xl lg:max-w-8xl">
							<h1 className="mt-2 sm:mt-14 md:mt-16 lg:mt-20 text-5xl md:text-6xl lg:text-7xl font-black drop-shadow-sm space-y-2">
								<div className="inline">Let's Create&nbsp;</div>
								<div className="py-0 px-2 badge font-extrabold text-5xl md:text-6xl lg:text-7xl rounded-lg shadow-lg w-fit h-fit items-center">
									Better
								</div>
								<div className="inline">&nbsp;Forms</div>
							</h1>

							<div className="mt-5 md:mt-4 lg:mt-3 space-y-2 sm:space-y-2 md:space-y-3 lg:space-y-4 md:p-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-sm">
								<div className="inline">
									Formsify helps you create&nbsp;
								</div>
								<div className="py-0 px-1 sm:px-2 badge badge-ghost font-extrabold tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl rounded-lg shadow-md w-fit h-fit items-center shadow-primary-focus">
									decentralized
								</div>
								&nbsp;
								<div className="py-0 px-1 sm:px-2 badge badge-ghost font-extrabold tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl rounded-lg shadow-md w-fit h-fit items-center shadow-secondary-focus">
									trustless
								</div>
								&nbsp;&&nbsp;
								<div className="py-0 px-1 sm:px-2 badge badge-ghost font-extrabold tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl rounded-lg shadow-md w-fit h-fit items-center shadow-accent-focus">
									distributed
								</div>
								<div className="inline">&nbsp;Forms.</div>
							</div>

							<div className="mt-8 md:mt-10">
								<button
									className="btn btn-primary btn-sm h-fit w-fit px-3 lg:px-5 py-2 lg:py-3 text-xl lg:text-2xl items-center rounded-xl lg:rounded-2xl font-black shadow-lg"
									onClick={() => {
										navigate(`/dashboard`);
									}}
									type="button"
								>
									Get Started
								</button>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};

	// ==============
	// FORM COUNTDOWN
	// ==============

	const [currTime, setCurrTime] = useState({
		days: 21,
		hours: 20,
		minutes: 19,
		seconds: 18,
	});

	useEffect(() => {
		const interval = setInterval(() => {
			let newCurrTime = currTime;
			if (currTime.seconds === 0) {
				if (currTime.minutes === 0) {
					if (currTime.hours === 0) {
						if (currTime.days === 0) {
							setCurrTime((prevTime) => ({
								...prevTime,
								days: 21,
								hours: 20,
								minutes: 19,
								seconds: 18,
							}));
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

	const countdownCard = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl border-t-8 border-warning">
					<div className="flex card-body px-5 py-3 w-full justify-center items-center">
						<div className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-black">
							Form&nbsp;
							<div className="py-0 px-1 sm:px-2 badge badge-error font-extrabold tracking-wide text-2xl sm:text-2xl md:text-3xl lg:text-4xl rounded-lg shadow-md w-fit h-fit items-center">
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

	// ==============
	// FORM COUNTDOWN
	// ==============

	const infoCard = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl border-t-8 border-info">
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
									Transaction
								</div>
								&nbsp;<span className="font-black">:</span>
								&nbsp;
								<span className="font-bold truncate">
									{defaultFormTransaction}
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
												`${defaultFormTransaction}`
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
														Form Transaction has
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
									href={`https://mumbai.polygonscan.com/tx/${defaultFormTransaction}`}
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
									Address
								</div>
								&nbsp;<span className="font-black">:</span>
								&nbsp;
								<span className="font-bold truncate">
									{defaultFormAddress}
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
												`${defaultFormAddress}`
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
									href={`https://mumbai.polygonscan.com/address/${defaultFormAddress}`}
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
									Owner
								</div>
								&nbsp;<span className="font-black">:</span>
								&nbsp;
								<span className="font-bold truncate">
									{defaultFormOwner}
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
												`${defaultFormOwner}`
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
														Owner address has
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
									href={`https://mumbai.polygonscan.com/address/${defaultFormOwner}`}
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
									{defaultFormId}
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
												`${defaultFormId}`
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
									href={`https://formsify.vercel.app/${defaultFormOwner}/${defaultFormId}`}
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

	// ===========
	// FIELDS CARD
	// ===========

	// Form Fields
	const [fields, setFields] = useState([
		{
			fieldText: `What's your favorite emoji? (P.S. We might just judge you!) 👀`,
			fieldType: `shortResponse`,
			required: true,
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
				fieldText: `Question Goes Here... ✍️`,
				fieldType: `${fieldTypes[fieldTypeIndex]}`,
				choices: [{ choiceText: `Option 👋` }],
				required: true,
			};
		} else {
			newField = {
				fieldText: `Question Goes Here... ✍️`,
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
						placeholder="Response Goes Here... 📋"
						className="mt-1 font-semibold text-lg w-full input border-4 input-bordered"
					/>
				</>
			);
		} else if (field.fieldType === `longResponse`) {
			return (
				<>
					<textarea
						className="mt-1 font-semibold text-lg w-full textarea border-4 textarea-bordered"
						placeholder="Response Goes Here... 📋"
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
													className="label-text text-lg font-bold w-full appearance-none focus:outline-none focus:border-b-4 focus:border-primary overflow-hidden bg-transparent resize-none whitespace-pre-wrap"
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
						<center>
							<button
								className="btn btn-sm h-fit w-fit px-3 btn-secondary capitalize font-bold text-lg mt-2 border-4 border-neutral shadow-sm shadow-neutral-focus"
								onClick={() => {
									addChoice(index);
								}}
							>
								Add Option
							</button>
						</center>
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
													className="label-text text-lg font-bold w-full appearance-none focus:outline-none focus:border-b-4 focus:border-primary overflow-hidden bg-transparent resize-none whitespace-pre-wrap"
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
					Choice has been&nbsp;
					<span className="font-black">Deleted.</span>
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
			choiceText: `Option 👋`,
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
					<span className="font-black">Added.</span>
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
					<div
						className="tooltip font-bold"
						data-tip="Customize Field"
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
					</div>

					<div className="tooltip font-bold" data-tip="Add Field">
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
					</div>
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
					<div className="tooltip font-bold" data-tip="Delete Field">
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
										className="w-full shadow-lg collapse collapse-open bg-base-200 rounded-box border-t-8 border-secondary space-y-0"
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
												className="w-full appearance-none focus:outline-none focus:border-b-4 focus:border-primary overflow-hidden bg-transparent resize-none whitespace-pre-wrap"
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

	const fieldCard = () => {
		return <>{formUI()}</>;
	};

	// ===========
	// FIELDS CARD
	// ===========

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
				<center>
					<div>
						Form theme has been changed to{" "}
						<span className="font-black capitalize">{theme}.</span>
					</div>
				</center>
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
				<div className="dropdown dropdown-hover dropdown-right font-bold">
					<div className="tooltip font-bold" data-tip="Change Theme">
						<label
							tabIndex="0"
							className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-md shadow-neutral-focus"
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
					</div>
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
				<div className="flex flex-row md:flex-col space-x-2 space-y-0 md:space-x-0 md:space-y-2">
					{selectTheme()}

					<div className="tooltip font-bold" data-tip="Add Field">
						<button
							className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-md shadow-neutral-focus"
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
					</div>

					{/* FORM INFO */}
					<div className="tooltip font-bold" data-tip="Info">
						<label
							for="formInfoModal"
							className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-md shadow-neutral-focus"
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
					</div>
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
									{`INFINITE`}
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
									{`INFINITE`}
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
									{defaultFormId}
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

					<div className="tooltip font-bold" data-tip="View">
						<button
							className="btn btn-sm h-fit w-fit px-3 py-1 capitalize font-black text-lg border-4 border-neutral-content shadow-md shadow-neutral-focus"
							onClick={() => {
								navigate(
									`/${defaultFormOwner}/${defaultFormId}`
								);
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
					</div>
				</div>
			</>
		);
	};

	// ==================
	// FORM MAIN SETTINGS
	// ==================

	const emojiCard = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl border-t-8 border-primary">
					<div className="flex flex-row card-body bg-accent px-5 py-3 w-full justify-center items-center space-x-0 md:space-x-5">
						<img className="w-1/6 drop-shadow-md" src={Party} />
						<img className="w-1/6 drop-shadow-md" src={Contact} />
						<img className="w-1/6 drop-shadow-md" src={Meet} />
						<img className="w-1/6 drop-shadow-md" src={Blank} />
						<img className="w-1/6 drop-shadow-md" src={Rsvp} />
						<img className="w-1/6 drop-shadow-md" src={SignUp} />
					</div>
				</div>
			</>
		);
	};

	const formsifyWindow = () => {
		return (
			<>
				<div className="p-5 bg-base-200">
					<div>
						<div
							data-theme={formTheme}
							className="mockup-window bg-accent shadow-md py-4"
						>
							<div className="blankDiv pt-3 bg-base-300" />
							<div className="flex flex-col items-center md:items-stretch md:flex-row justify-center px-4 bg-base-300 space-y-3 md:space-y-0 space-x-0 md:space-x-3">
								{emojiCard()}
							</div>
							<div className="blankDiv pt-3 bg-base-300" />
							<div className="flex flex-col items-center md:items-stretch md:flex-row justify-center px-4 bg-base-300 space-y-3 md:space-y-0 space-x-0 md:space-x-3">
								{countdownCard()}
								{formSettingsMenu()}
								{infoCard()}
							</div>
							<div className="blankDiv pt-3 bg-base-300" />
							<div className="flex flex-col md:flex-row justify-center px-4 bg-base-300 space-y-3 md:space-y-0 space-x-0 md:space-x-3">
								{fieldCard()}
							</div>
							<div className="blankDiv pt-3 bg-base-300" />
						</div>
					</div>
				</div>
			</>
		);
	};

	const formsifySelfReliant = () => {
		return (
			<>
				<div className="flex flex-col justify-center items-center bg-base-200 px-4">
					<center>
						<div className="text-3xl sm:text-4xl md:text-5xl font-black drop-shadow-sm">
							Self-Reliant
						</div>
						<div className="text-md sm:text-lg mt-2">
							You don't need us to interact with your Forms.
							<br />
							They are stored on blockchain and have their{" "}
							<span className="kbd kbd-sm text-md sm:text-lg">
								own
							</span>{" "}
							digital identity!
						</div>
					</center>
				</div>

				<div className="flex flex-col lg:flex-row px-2 sm:px-4 bg-base-200 py-4 -mt-2 sm:mt-0">
					<div className="px-1 grid flex-grow h-36 w-full card bg-base-300 rounded-box place-items-center shadow-md text-md sm:text-lg font-bold">
						<center>
							<span className="font-black badge badge-error rounded-lg text-lg sm:text-xl p-4 shadow-md">
								Without Formsify
							</span>
							<br />
							The <span className="font-black">SERVER</span> you
							are trying to Contact 📡
							<br /> Is currently{" "}
							<span className="font-black">BUSY</span> 💢
							<br />
							<span className="font-extrabold ">
								Please Try Again Later! ⏳
							</span>
						</center>
					</div>
					<div className="divider lg:divider-horizontal font-black text-xl">
						vs
					</div>
					<div className="px-1 grid flex-grow h-36 w-full card bg-base-300 rounded-box place-items-center shadow-md text-md sm:text-lg font-bold">
						<center>
							<span className="font-black badge badge-success rounded-lg text-lg sm:text-xl p-4 shadow-md">
								With Formsify
							</span>
							<br />
							Our Forms are{" "}
							<span className="font-black">DECENTRALIZED</span> 📌
							<br />
							Even&nbsp;
							<span className="font-black">IF</span>&nbsp;we go
							Down 👀
							<br />
							<span className="font-extrabold ">
								They are still accessible, without Us! ✅
							</span>
						</center>
					</div>
				</div>
			</>
		);
	};

	const formsifyImmutable = () => {
		return (
			<>
				<div className="flex flex-col justify-center items-center bg-base-200 px-4">
					<center>
						<div className="text-3xl sm:text-4xl md:text-5xl font-black drop-shadow-sm">
							Immutable
						</div>
						<div className="text-md sm:text-lg mt-2">
							You own your forms, no one else does.
							<br />
							Even NASA's Super Computer&nbsp;
							<span className="kbd kbd-sm text-md sm:text-lg">
								cannot
							</span>
							&nbsp;alter your forms! We mean it...
						</div>
					</center>
				</div>

				<div className="flex flex-col lg:flex-row px-2 sm:px-4 bg-base-200 py-4 -mt-2 sm:mt-0">
					<div className="px-1 grid flex-grow h-36 w-full card bg-base-300 rounded-box place-items-center shadow-md text-md sm:text-lg font-bold">
						<center>
							<span className="font-black badge badge-error rounded-lg text-lg sm:text-xl p-4 shadow-md">
								Without Formsify
							</span>
							<br />
							Let's <span className="font-black">HACK</span>
							&nbsp;& alter those Forms 🤖
							<br />
							After all, it can't be that{" "}
							<span className="font-black">COMPLEX</span> 🤓
							<br />
							<span className="font-extrabold ">
								We are the well-known Anonymous! 💀
							</span>
						</center>
					</div>
					<div className="divider lg:divider-horizontal font-black text-xl">
						vs
					</div>
					<div className="px-1 grid flex-grow h-36 w-full card bg-base-300 rounded-box place-items-center shadow-md text-md sm:text-lg font-bold">
						<center>
							<span className="font-black badge badge-success rounded-lg text-lg sm:text-xl p-4 shadow-md">
								With Formsify
							</span>
							<br />
							Well, it will take{" "}
							<span className="font-black">
								10^24 (Septillion)
							</span>{" "}
							Years 🌌
							<br />
							To&nbsp;
							<span className="font-black">HACK</span>&nbsp;and
							alter those Forms! 😨
							<br />
							<span className="font-extrabold ">
								Good Luck with that! 😏
							</span>
						</center>
					</div>
				</div>
			</>
		);
	};

	const formsifyCaptchaFree = () => {
		return (
			<>
				<div className="flex flex-col justify-center items-center bg-base-200 px-4">
					<center>
						<div className="text-3xl sm:text-4xl md:text-5xl font-black drop-shadow-sm">
							Captcha-Free
						</div>
						<div className="text-md sm:text-lg mt-2">
							Do your forms require Captcha protection?
							<br />
							We ensure they are captcha-free and still{" "}
							<span className="kbd kbd-sm text-md sm:text-lg">
								prevent
							</span>{" "}
							spamming!
						</div>
					</center>
				</div>

				<div className="flex flex-col lg:flex-row px-2 sm:px-4 bg-base-200 py-4 -mt-2 sm:mt-0">
					<div className="px-1 grid flex-grow h-36 w-full card bg-base-300 rounded-box place-items-center shadow-md text-md sm:text-lg font-bold">
						<center>
							<span className="font-black badge badge-error rounded-lg text-lg sm:text-xl p-4 shadow-md">
								Without Formsify
							</span>
							<br />
							Here comes that annoying&nbsp;
							<span className="font-black">CAPTCHA</span>&nbsp;😩
							<br /> Captcha took&nbsp;
							<span className="font-black">TIME</span>
							&nbsp;& deadline passed 😭
							<br />
							<span className="font-extrabold ">
								I Ain't a Bot, I promise! 🥺
							</span>
						</center>
					</div>
					<div className="divider lg:divider-horizontal font-black text-xl">
						vs
					</div>
					<div className="px-1 grid flex-grow h-36 w-full card bg-base-300 rounded-box place-items-center shadow-md text-md sm:text-lg font-bold">
						<center>
							<span className="font-black badge badge-success rounded-lg text-lg sm:text-xl p-4 shadow-md">
								With Formsify
							</span>
							<br />
							Each form submit is backed by&nbsp;
							<span className="font-black">GAS</span>&nbsp;⛽
							<br />
							Only&nbsp;
							<span className="font-black">SUPER-RICH</span>
							&nbsp;bots can spam the form 💰
							<br />
							<span className="font-extrabold ">
								Good-Bye, Bots! 👋
							</span>
						</center>
					</div>
				</div>
			</>
		);
	};

	const formsifyContactUs = () => {
		return (
			<>
				<div className="hero bg-base-200 -mt-12 -mb-8">
					<div className="hero-content flex-col lg:flex-row-reverse">
						<div className="p-10 text-center">
							<div className="text-3xl sm:text-4xl md:text-5xl font-black drop-shadow-sm">
								Contact Us! 👋
							</div>
							<div className="py-6 font-semibold sm:text-lg">
								Drop an&nbsp;
								<span className="font-bold">Email</span>&nbsp;📧
								or&nbsp;
								<span className="font-bold">Schedule</span>
								&nbsp;a 30 min one-to-one meeting 📡 directly
								with&nbsp;
								<span className="font-bold">Us</span>
								&nbsp;via Calendly!
							</div>
							<div className="-mt-3 space-x-3 space-y-3">
								<button
									className="btn btn-accent btn-sm h-fit w-fit px-3 lg:px-4 py-1 lg:py-2 text-lg lg:text-xl items-center rounded-xl lg:rounded-2xl font-black shadow-lg"
									onClick={() => {
										window.open(
											"https://calendly.com/uday-khokhariya/30min",
											"_blank"
										);
									}}
								>
									Schedule a Meeting
								</button>

								<button
									className="btn btn-accent btn-sm h-fit w-fit px-3 lg:px-4 py-1 lg:py-2 text-lg lg:text-xl items-center rounded-xl lg:rounded-2xl font-black shadow-lg"
									onClick={() => {
										window.open(
											"mailto: formsifying@gmail.com",
											"_blank"
										);
									}}
								>
									Send Email
								</button>
							</div>
						</div>
					</div>
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
			{formsifyHero()}
			<div className="blankDiv pt-5 bg-base-200" />
			{formsifyWindow()}
			<div className="blankDiv pt-5 bg-base-200" />
			{formsifyCaptchaFree()}
			<div className="blankDiv pt-5 bg-base-200" />
			{formsifySelfReliant()}
			<div className="blankDiv pt-5 bg-base-200" />
			{formsifyImmutable()}
			<div className="blankDiv pt-5 bg-base-200" />
			{formsifyContactUs()}
			<div className="blankDiv pt-5 bg-base-200" />
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
		</>
	);
};

export default Home;
