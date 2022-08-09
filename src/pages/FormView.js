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

	const viewResponses = () => {
		return (
			<>
				<div classname="overflow-x-auto">
					<table className="table table-compact w-full">
						<thead>
							<tr>
								<th></th>
								<th>Address</th>
								<th>Timestamp</th>
								{fields.map((field, fieldIndex) => {
									return <th>Field-{fieldIndex + 1}</th>;
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
											{response.fillTimestamp.toString()}
										</td>
										{getResponseFields(response.fillData)}
									</tr>
								);
							})}
						</tbody>
						<tfoot>
							<tr>
								<th></th>
								<th>Address</th>
								<th>Timestamp</th>
								{fields.map((field, fieldIndex) => {
									return <th>Field-{fieldIndex + 1}</th>;
								})}
							</tr>
						</tfoot>
					</table>
				</div>
			</>
		);
	};

	return (
		<>
			<div data-theme={formTheme}>
				{isLoading ? (
					<>
						<div className="bg-primary">{formLoader()}</div>
					</>
				) : (
					<>
						{" "}
						<div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-primary to-accent">
							<center>
								<div className="p-5 w-full overflow-auto">
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
