import { useState, useEffect } from "react";

const FormDesign = () => {
	const [formColors, setFormColors] = useState({
		formColor1: "#0B0505",
		formColor2: "#F72585",
		formColor3: "#7209B7",
		formColor4: "#3A0CA3",
		formColor5: "#4361EE",
		formColor6: "#4CC9F0",
		formColor7: "#F9FAFA",
	});

	const [fields, setFields] = useState([
		{
			fieldText: `What's your name?`,
			fieldType: `shortResponse`,
			// options: [{ optionText: `` }],
		},
		// {
		// 	fieldText: `Your favorite Web3 greeting?`,
		// 	fieldType: `multipleChoice`,
		// 	choices: [
		// 		{ choiceText: `GTFOL` },
		// 		{ choiceText: `GM` },
		// 		{ choiceText: `WAGMI` },
		// 		{ choiceText: `LFG` },
		// 	],
		// 	open: true,
		// 	required: false,
		// },
		// {
		// 	fieldText: `This is second question.`,
		// 	fieldType: `longResponse`,
		// },
		// {
		// 	fieldText: `Your favorite Web3 greeting?`,
		// 	fieldType: `checkBoxes`,
		// 	choices: [
		// 		{ choiceText: `GTFOL` },
		// 		{ choiceText: `GM` },
		// 		{ choiceText: `WAGMI` },
		// 		{ choiceText: `LFG` },
		// 	],
		// 	open: true,
		// 	required: false,
		// },
		// {
		// 	fieldText: `When should we organize next Web3 Meet?`,
		// 	fieldType: `timeResponse`,
		// 	open: true,
		// 	required: true,
		// },
		// {
		// 	fieldText: `When should we organize next Web3 Meet?`,
		// 	fieldType: `dateResponse`,
		// 	open: true,
		// 	required: true,
		// },
	]);

	const shortResponse = {
		fieldText: `What's your short name?`,
		fieldType: `shortResponse`,
		required: true,
	};

	const longResponse = {
		fieldText: `What's your long name?`,
		fieldType: `longResponse`,
		required: true,
	};

	const multipleChoice = {
		fieldText: `Your favorite Web3 greeting?`,
		fieldType: `multipleChoice`,
		choices: [
			{ choiceText: `GTFOL` },
			{ choiceText: `GM` },
			{ choiceText: `WAGMI` },
			{ choiceText: `LFG` },
		],
		required: true,
	};

	const checkBoxes = {
		fieldText: `Your favorite Web3 greeting?`,
		fieldType: `checkBoxes`,
		choices: [
			{ choiceText: `GTFOL` },
			{ choiceText: `GM` },
			{ choiceText: `WAGMI` },
			{ choiceText: `LFG` },
		],
		required: true,
	};

	const timeResponse = {
		fieldText: `When should we organize next Web3 Meet?`,
		fieldType: `timeResponse`,
		required: true,
	};

	const dateResponse = {
		fieldText: `When should we organize next Web3 Meet?`,
		fieldType: `dateResponse`,
		required: true,
	};

	const fieldMap = new Map();
	fieldMap.set("shortResponse", shortResponse);
	fieldMap.set("longResponse", longResponse);
	fieldMap.set("multipleChoice", multipleChoice);
	fieldMap.set("checkBoxes", checkBoxes);
	fieldMap.set("timeResponse", timeResponse);
	fieldMap.set("dateResponse", dateResponse);

	const getFieldInput = (field, index) => {
		if (field.fieldType === `shortResponse`) {
			return (
				<>
					<div className="flex font-bold">
						<div className="mb-3 w-full">
							<input
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Response goes here."
							/>
						</div>
					</div>
				</>
			);
		} else if (field.fieldType === `longResponse`) {
			return (
				<>
					<div className="flex font-bold">
						<div className="mb-3 w-full  ">
							<textarea
								className="form-control block w-full px-3 py-1.5 text-base  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								rows="3"
								placeholder="Response goes here."
							></textarea>
						</div>
					</div>
				</>
			);
		} else if (field.fieldType === `multipleChoice`) {
			return (
				<>
					<div className="flex font-bold">
						<div>
							{field.choices.map((choice, choiceIndex) => {
								return (
									<>
										<div
											className="form-check"
											key={choiceIndex}
										>
											<input
												className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
												type="radio"
												name="flexRadioDefault"
												id={`flexRadioDefault${choiceIndex}`}
											/>
											<label
												className="form-check-label inline-block text-gray-800"
												for={`flexRadioDefault${choiceIndex}`}
											>
												{choice.choiceText}
											</label>
										</div>
									</>
								);
							})}
						</div>
					</div>
				</>
			);
		} else if (field.fieldType === `checkBoxes`) {
			return (
				<>
					<div className="flex font-bold">
						<div>
							{field.choices.map((choice, choiceIndex) => {
								return (
									<>
										<div className="form-check">
											<input
												className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
												type="checkbox"
												value=""
												id={`flexCheckDefault${choiceIndex}`}
											/>
											<label
												className="form-check-label inline-block text-gray-800"
												for={`flexCheckDefault${choiceIndex}`}
											>
												{choice.choiceText}
											</label>
										</div>
									</>
								);
							})}
						</div>
					</div>
				</>
			);
		} else if (field.fieldType === `timeResponse`) {
			return (
				<>
					<div className="flex font-bold">
						<div
							className="timepicker relative form-floating mb-3 xl:w-96"
							data-mdb-with-icon="true"
							id="input-toggle-timepicker"
						>
							<input
								type="time"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Select a time"
								data-mdb-toggle="input-toggle-timepicker"
							/>

							<label
								for="floatingInput"
								className="text-gray-700"
							>
								Select a time
							</label>
						</div>
					</div>
				</>
			);
		} else if (field.fieldType === `dateResponse`) {
			return (
				<>
					<div className="flex items-center font-bold">
						<div
							className="datepicker relative form-floating mb-3 xl:w-96"
							data-mdb-toggle-button="true"
						>
							<input
								type="date"
								className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
								placeholder="Select a date"
								data-mdb-toggle="datepicker"
							/>
							<label
								for="floatingInput"
								className="text-gray-700"
							>
								Select a date
							</label>
						</div>
					</div>
				</>
			);
		}
	};

	const changeFieldType = (index, newFieldType) => {
		let newFields = [...fields];
		newFields[index] = fieldMap.get(newFieldType);
		console.log(newFields);
		setFields(newFields);
	};

	const addField = (index, newFieldType) => {
		// let newFields = [...fields];
		// newFields.push(fieldMap.get(newFieldType));
		// console.log(newFields);
		setFields([...fields, fieldMap.get(newFieldType)]);
	};

	const accordianElement = (field, index) => {
		return (
			<>
				<div className="accordion-item shadow-md bg-blue-50">
					<h2
						className="accordion-header mb-0"
						id={`heading${index}`}
					>
						<button
							className="rounded-lg relative flex items-center w-full py-4 px-5 text-lg font-bold text-white text-left bg-blue-600  border-0  transition ease-in-out focus:outline-none"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target={`#collapse${index}`}
							aria-expanded="false"
							aria-controls={`collapse${index}`}
						>
							{field.fieldText}
						</button>
					</h2>
					<div
						id={`collapse${index}`}
						className=" accordion-collapse collapse show"
						aria-labelledby={`heading${index}`}
						data-bs-parent="#formAccordian"
					>
						<div className="accordion-body py-4 px-5">
							{getFieldInput(field, index)}
						</div>
					</div>
				</div>
			</>
		);
	};

	const settingsElement = (field, index) => {
		return (
			<>
				<div className="-mt-12 w-fit  accordion-item shadow-lg ">
					<h2
						className="rounded-lg accordion-header mb-0"
						id={`heading${index}`}
					>
						<button
							className="relative flex items-center w-auto  px-5 text-lg font-bold text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target={`#collapse${index}`}
							aria-expanded="false"
							aria-controls={`collapse${index}`}
						></button>
					</h2>
					<div
						id={`collapse${index}`}
						className=" accordion-collapse collapse show"
						aria-labelledby={`heading${index}`}
						data-bs-parent="#formAccordian"
					>
						<div className="accordion-body py-4 px-5 space-x-3">
							{/* CHANGE TYPE MODAL */}

							<button
								type="button"
								className="font-bold w-fit px-2.5 py-2.5 bg-purple-600 text-white text-m leading-tight rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
								data-bs-toggle="modal"
								data-bs-target={`#modalChangeType${index}`}
							>
								{/* CHANGE TYPE ICON */}

								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
									/>
								</svg>

								{/* CHANGE TYPE ICON */}
							</button>

							<div
								className="backdrop-blur-md modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
								id={`modalChangeType${index}`}
								aria-labelledby={`modalChangeTypeLabel${index}`}
								aria-hidden="true"
							>
								<div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
									<div className="modal-content border-none shadow-md relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
										<div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
											<h5
												className="text-xl font-bold leading-normal text-gray-800"
												id={`modalChangeTypeLabel${index}`}
											>
												Change the current Field
											</h5>
											<button
												type="button"
												className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
												data-bs-dismiss="modal"
												aria-label="Close"
											></button>
										</div>
										<div className="modal-body relative p-4">
											{/* MODAL OPTIONS */}

											<div className="flex flex-col space-y-2 justify-center">
												<button
													onClick={() => {
														changeFieldType(
															index,
															`shortResponse`
														);
													}}
													type="button"
													className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-lg leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
												>
													Short Response
												</button>

												<button
													onClick={() => {
														changeFieldType(
															index,
															`longResponse`
														);
													}}
													type="button"
													className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-lg leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
												>
													Long Response
												</button>

												<button
													onClick={() => {
														changeFieldType(
															index,
															`dateResponse`
														);
													}}
													type="button"
													className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-lg leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
												>
													Date
												</button>

												<button
													onClick={() => {
														changeFieldType(
															index,
															`timeResponse`
														);
													}}
													type="button"
													className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-lg leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
												>
													Time
												</button>

												<button
													onClick={() => {
														changeFieldType(
															index,
															`checkBoxes`
														);
													}}
													type="button"
													className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-lg leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
												>
													Check Boxes
												</button>

												<button
													onClick={() => {
														changeFieldType(
															index,
															`multipleChoice`
														);
													}}
													type="button"
													className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-lg leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
												>
													Multiple Choice
												</button>
											</div>

											{/* MODAL OPTIONS */}
										</div>
										<div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
											<button
												type="button"
												className="px-6 py-2.5 bg-purple-600 text-white font-bold text-m leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												data-bs-dismiss="modal"
											>
												Close
											</button>
										</div>
									</div>
								</div>
							</div>

							{/* CHANGE TYPE MODAL */}

							{/* ADD FIELD MODAL */}

							<button
								type="button"
								className="font-bold w-fit px-2.5 py-2.5 bg-purple-600 text-white text-m leading-tight rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
								data-bs-toggle="modal"
								data-bs-target={`#modalAddField${index}`}
							>
								{/* ADD FIELD ICON */}

								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>

								{/* ADD FIELD ICON */}
							</button>

							<div
								className="backdrop-blur-md modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
								id={`modalAddField${index}`}
								aria-labelledby={`modalAddFieldLabel${index}`}
								aria-hidden="true"
							>
								<div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
									<div className="modal-content border-none shadow-md relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
										<div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
											<h5
												className="text-xl font-bold leading-normal text-gray-800"
												id={`modalAddFieldLabel${index}`}
											>
												Add a new Field:
											</h5>
											<button
												type="button"
												className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
												data-bs-dismiss="modal"
												aria-label="Close"
											></button>
										</div>
										<div className="modal-body relative p-4">
											{/* MODAL OPTIONS */}

											<div className="flex flex-col space-y-2 justify-center">
												<button
													onClick={() => {
														addField(
															index,
															`shortResponse`
														);
													}}
													type="button"
													className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-lg leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
												>
													Short Response
												</button>

												<button
													onClick={() => {
														addField(
															index,
															`longResponse`
														);
													}}
													type="button"
													className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-lg leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
												>
													Long Response
												</button>

												<button
													onClick={() => {
														addField(
															index,
															`dateResponse`
														);
													}}
													type="button"
													className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-lg leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
												>
													Date
												</button>

												<button
													onClick={() => {
														addField(
															index,
															`timeResponse`
														);
													}}
													type="button"
													className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-lg leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
												>
													Time
												</button>

												<button
													onClick={() => {
														addField(
															index,
															`checkBoxes`
														);
													}}
													type="button"
													className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-lg leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
												>
													Check Boxes
												</button>

												<button
													onClick={() => {
														addField(
															index,
															`multipleChoice`
														);
													}}
													type="button"
													className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-lg leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
												>
													Multiple Choice
												</button>
											</div>

											{/* MODAL OPTIONS */}
										</div>
										<div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
											<button
												type="button"
												className="px-6 py-2.5 bg-purple-600 text-white font-bold text-m leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												data-bs-dismiss="modal"
											>
												Close
											</button>
										</div>
									</div>
								</div>
							</div>

							{/* ADD FIELD MODAL */}
						</div>
					</div>
				</div>
			</>
		);
	};

	const temp = () => {
		{
			/* BUTTONS */
		}

		<div className="flex items-center justify-center">
			<div
				className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
				role="toolbar"
			>
				{/* CHANGE FIELD */}
				{/* <button
		type="button"
		className="rounded-l inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
	>
		Change Field
	</button> */}

				{/* CHANGE FIELD */}

				<button
					type="button"
					className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
				>
					2
				</button>
				<button
					type="button"
					className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
				>
					3
				</button>
				<button
					type="button"
					className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
				>
					4
				</button>
				<button
					type="button"
					className=" rounded-r inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
				>
					5
				</button>
			</div>
		</div>;

		{
			/* BUTTONS */
		}
	};

	const formUI = () => {
		return (
			<>
				<h1>Formsify Form</h1>

				<hr />
				<div className="bg-blue-300 flex justify-center">
					<div
						className="accordion w-full m-3 space-y-3 flex flex-col pt-3 max-w-screen-md"
						id="formAccordian"
					>
						{fields.map((field, index) => {
							return (
								<>
									<div
										key={index}
										className="flex flex-col w-full justify-center items-center space-y-3"
									>
										<h1 className="w-full">
											{accordianElement(field, index)}
										</h1>

										<h1 className="w-fit ">
											{settingsElement(field, index)}
										</h1>
									</div>
								</>
							);
						})}
					</div>
				</div>

				<hr />
			</>
		);
	};

	return (
		<>
			<h1>Form Design</h1>
			<br />
			{formUI()}
			<hr />
		</>
	);
};

export default FormDesign;
