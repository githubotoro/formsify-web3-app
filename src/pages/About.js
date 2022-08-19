const About = () => {
	const B = (content) => {
		return <span className="font-black">{content}</span>;
	};

	const introCard = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl border-t-8 border-primary py-4 px-4 md:px-6">
					<div className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-center">
						👉 {B("Formsify")} helps you in creating better forms,
						which are {B("Decentralized")}, {B("Trustless")} &{" "}
						{B("Distributed")}.
					</div>
				</div>
			</>
		);
	};

	const problemCard = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl border-t-8 border-info py-4 px-4 md:px-6">
					<div className="text-lg sm:text-md md:text-2xl lg:text-3xl font-black">
						The Problem 📌
					</div>

					<div className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-left mt-1">
						😕 Currently available {B("Online Survey Services")} are{" "}
						{B("Centralizd")}, {B("Trust-Based")} & {B("Dependent")}
						.
						<br />
						🙄 Thus, we have challenges of {B("Integrity")},{" "}
						{B("Transparency")} and {B("Accessibility")}.
						<br />
						🧐 Let's have a {B("discussion")} on the problems and
						drawbacks of {B("Online Survey Services")}.
					</div>
				</div>
			</>
		);
	};

	const problem1 = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl border-t-8 border-error py-4 px-4 md:px-6">
					<div className="text-lg sm:text-md md:text-2xl lg:text-3xl font-black">
						1. Integrity 🤔
					</div>

					<div className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-left mt-1">
						<div className="mt-2" />
						<span className="font-black badge badge-info rounded-md md:rounded-lg text-sm sm:text-md md:text-lg lg:text-xl p-1 md:p-4 shadow-md">
							Definition 👋
						</span>
						&nbsp;The quality of being {B("honest")} and having
						strong {B("moral")} principles.
						<div className="mt-3" />
						<span className="font-black badge badge-error rounded-md md:rounded-lg text-sm sm:text-md md:text-lg lg:text-xl p-1 md:p-4 shadow-md">
							Problems 💢
						</span>
						&nbsp;How do you make sure 👇
						<br />
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that the {B("server")} which holds your
								information wouldn't be {B("compromised")}?
							</div>
						</div>
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that the {B("platform")} which holds your forms,
								wouldn't go {B("down")}?
							</div>
						</div>
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that the {B("system")} which holds your data,
								wouldn't {B("betray")} you?
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};

	const problem2 = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl border-t-8 border-error py-4 px-4 md:px-6">
					<div className="text-lg sm:text-md md:text-2xl lg:text-3xl font-black">
						2. Transparency 👀
					</div>

					<div className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-left mt-1">
						<div className="mt-2" />
						<span className="font-black badge badge-info rounded-md md:rounded-lg text-sm sm:text-md md:text-lg lg:text-xl p-1 md:p-4 shadow-md">
							Definition 👋
						</span>
						&nbsp;Operating in such a way that it is easy for others
						to {B("see")} what actions were {B("performed")}.
						<div className="mt-3" />
						<span className="font-black badge badge-error rounded-md md:rounded-lg text-sm sm:text-md md:text-lg lg:text-xl p-1 md:p-4 shadow-md">
							Problems 💢
						</span>
						&nbsp;How do you confirm 👇
						<br />
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that your {B("data")} was {B("unaltered")}?
							</div>
						</div>
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that your {B("forms")} were {B("fair")} to all
								respondents?
							</div>
						</div>
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that no-one {B("filled")} forms on {B("behalf")}{" "}
								of others?
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};

	const problem3 = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl border-t-8 border-error py-4 px-4 md:px-6">
					<div className="text-lg sm:text-md md:text-2xl lg:text-3xl font-black">
						3. Accessibility 😟
					</div>

					<div className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-left mt-1">
						<div className="mt-2" />
						<span className="font-black badge badge-info rounded-md md:rounded-lg text-sm sm:text-md md:text-lg lg:text-xl p-1 md:p-4 shadow-md">
							Definition 👋
						</span>
						&nbsp;The {B("information")} that the user needs must be{" "}
						{B("perceivable")} to them.
						<div className="mt-3" />
						<span className="font-black badge badge-error rounded-md md:rounded-lg text-sm sm:text-md md:text-lg lg:text-xl p-1 md:p-4 shadow-md">
							Problems 💢
						</span>
						&nbsp;How do you ensure 👇
						<br />
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that your {B("data")} will be accessible, even
								when system goes {B("down")}?
							</div>
						</div>
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that your {B("forms")} can be{" "}
								{B("independently")} interacted with at all the
								times?
							</div>
						</div>
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that {B("access")} to your information cannot be{" "}
								{B("revoked")}?
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};

	const solutionCard = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl border-t-8 border-info py-4 px-4 md:px-6">
					<div className="text-lg sm:text-md md:text-2xl lg:text-3xl font-black">
						The Solution 📌
					</div>

					<div className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-left mt-1">
						👋 Formsify gives each form its own{" "}
						{B("digital identity")} in the form of{" "}
						{B("smart contract")} which gets stored {B("on-chain")}.
						<br />
						👉 Thus, we {B("solve")} the challenges of{" "}
						{B("Integrity")}, {B("Transparency")} and{" "}
						{B("Accessibility")}.
						<br />
						🧐 Let's have a {B("discussion")} on the how&nbsp;
						{B("Formsify")} solves the problems and drawbacks of
						Online Survey Services.
					</div>
				</div>
			</>
		);
	};

	const solution1 = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl border-t-8 border-success py-4 px-4 md:px-6">
					<div className="text-lg sm:text-md md:text-2xl lg:text-3xl font-black">
						1. Integrity 🤝
					</div>

					<div className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-left mt-1">
						<div className="mt-2" />
						<span className="font-black badge badge-success rounded-md md:rounded-lg text-sm sm:text-md md:text-lg lg:text-xl p-1 md:p-4 shadow-md">
							Solutions ✔️
						</span>
						&nbsp;We make sure 👇
						<br />
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that your data is {B("decentralized")} and
								therefore, it remains uncompromised because
								there isn't any single point of failure.
							</div>
						</div>
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that your forms are platform {B("independent")}{" "}
								and the interface can be re-built by anyone if
								we go down.
							</div>
						</div>
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that the system {B("isn't controlled")} by any
								single entity, therefore betrayal isn't possible
								until majority of the network gets compromised.
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};

	const solution2 = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl border-t-8 border-success py-4 px-4 md:px-6">
					<div className="text-lg sm:text-md md:text-2xl lg:text-3xl font-black">
						2. Transparency 📋
					</div>

					<div className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-left mt-1">
						<div className="mt-2" />
						<span className="font-black badge badge-success rounded-md md:rounded-lg text-sm sm:text-md md:text-lg lg:text-xl p-1 md:p-4 shadow-md">
							Solutions ✔️
						</span>
						&nbsp;We confirm 👇
						<br />
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that your data is {B("immutable")} by storing it
								on Blockchain.
							</div>
						</div>
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that your forms are {B("unbiased")} in all
								scenarios by ensuring that they cannot be
								altered.
							</div>
						</div>
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that {B("no-one")} can fill forms on behalf of
								others, until and unless respondent's wallet is
								compromised.
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};

	const solution3 = () => {
		return (
			<>
				<div className="card w-full bg-base-200 shadow-xl border-t-8 border-success py-4 px-4 md:px-6">
					<div className="text-lg sm:text-md md:text-2xl lg:text-3xl font-black">
						3. Accessibility ✅
					</div>

					<div className="text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-left mt-1">
						<div className="mt-2" />
						<span className="font-black badge badge-success rounded-md md:rounded-lg text-sm sm:text-md md:text-lg lg:text-xl p-1 md:p-4 shadow-md">
							Solutions ✔️
						</span>
						&nbsp;We ensure 👇
						<br />
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that your {B("data")} is {B("accessible")}, even
								if go down by storing it on-chain.
							</div>
						</div>
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that your {B("forms")} can be independently
								interacted with by representing them as separate{" "}
								{B("smart contracts")}.
							</div>
						</div>
						<div className="flex flex-row items-center mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-8 bg-warning rounded-md shadow-md px-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
								<path
									fillRule="evenodd"
									d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="pl-2">
								that {B("access")} to your information{" "}
								{B("cannot be revoked")} because no single
								entity can stop you from accessing it.
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};

	const aboutWindow = () => {
		return (
			<>
				<div className="p-5 bg-base-200">
					<div>
						<div className="mockup-window bg-accent shadow-md py-4">
							<div className="blankDiv pt-3 bg-base-300" />
							<div className="flex flex-col items-center md:items-stretch md:flex-row justify-center px-4 bg-base-300 space-y-3 md:space-y-0 space-x-0 md:space-x-3">
								{introCard()}
							</div>
							<div className="blankDiv pt-3 bg-base-300" />
							<div className="flex flex-col items-center  justify-center px-4 bg-base-300 space-y-3 ">
								{problemCard()}
								{problem1()}
								{problem2()}
								{problem3()}
								{solutionCard()}
								{solution1()}
								{solution2()}
								{solution3()}
							</div>
							<div className="blankDiv pt-3 bg-base-300" />
							<div className="flex flex-col md:flex-row justify-center px-4 bg-base-300 space-y-3 md:space-y-0 space-x-0 md:space-x-3">
								{/* {fieldCard()} */}
							</div>
							<div className="blankDiv pt-3 bg-base-300" />
						</div>
					</div>
				</div>
			</>
		);
	};

	return <>{aboutWindow()}</>;
};

export default About;
