import { useNavigate } from "react-router-dom";

const Home = () => {
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
									className="btn btn-primary btn-sm h-fit w-fit px-2 py-0 sm:px-3 md:px-3 lg:px-5 sm:py-1 md:py-2 lg:py-3 text-md sm:text-lg md:text-xl lg:text-2xl items-center rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl font-black shadow-lg"
									onClick={() => {
										navigate(`/dashboard`);
									}}
									type="button"
								>
									Get Started
								</button>
							</div>

							<div className="pt-10 text-md sm:text-lg md:text-xl font-bold">
								<span className="text-md sm:text-lg md:text-xl badge badge-info h-fit w-fit items-center font-black shadow-md">
									NOTE:
								</span>{" "}
								This site is currently under active
								development...
								<br />
								So some things will definitely{" "}
								<span className="text-md sm:text-lg md:text-xl badge badge-error h-fit w-fit items-center font-black shadow-md">
									BREAK!
								</span>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};

	const formsifyWindow = () => {
		return (
			<>
				<div className="p-5 bg-base-200">
					<div className="mockup-window bg-accent shadow-md">
						<div className="flex justify-center px-4 py-16 bg-base-300">
							{/* <select className="select select-bordered w-full max-w-xs">
								<option>GTFOL</option>
								<option>WAGMI</option>
								<option>LFG</option>
							</select> */}
							{/* TEMP */}

							{/* TEMP */}
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
							They are stored on{" "}
							<span className="kbd kbd-sm text-md sm:text-lg">
								Blockchain
							</span>{" "}
							and have their own digital identity!
						</div>
					</center>
				</div>

				<div className="flex flex-col lg:flex-row px-2 sm:px-4 bg-base-200 py-4 -mt-2 sm:mt-0">
					<div className="px-1 grid flex-grow h-32 w-full card bg-base-300 rounded-box place-items-center shadow-md text-md sm:text-lg font-bold">
						<center>
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
					<div className="px-1 grid flex-grow h-32 w-full card bg-base-300 rounded-box place-items-center shadow-md text-md sm:text-lg font-bold">
						<center>
							Our Forms are{" "}
							<span className="font-black">DECENTRALIZED</span> 📌
							<br />
							Even&nbsp;
							<span className="font-black">IF</span>&nbsp;we go
							down 👀
							<br />
							<span className="font-extrabold ">
								They are still accessible, without us! ✅
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
					<div className="px-1 grid flex-grow h-32 w-full card bg-base-300 rounded-box place-items-center shadow-md text-md sm:text-lg font-bold">
						<center>
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
					<div className="px-1 grid flex-grow h-32 w-full card bg-base-300 rounded-box place-items-center shadow-md text-md sm:text-lg font-bold">
						<center>
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

	return (
		<>
			{formsifyHero()}
			<div className="blankDiv pt-5 bg-base-200" />
			{formsifySelfReliant()}
			<div className="blankDiv pt-5 bg-base-200" />
			{formsifyImmutable()}
			<div className="blankDiv pt-5 bg-base-200" />
		</>
	);
};

export default Home;
