const Footer = () => {
	const FooterContent = () => {
		return (
			<>
				<footer className="footer footer-center p-5 bg-primary text-primary-content">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 400 400"
							className="h-8 w-8 sm:h-11 sm:w-11 fill-primary-content"
						>
							<g id="Layer_3" data-name="Layer 3">
								<path d="M200.16,0Q274.56,0,349,0c29,0,50.86,21.32,51,49.63.17,28.47-22.11,50.47-51.34,50.48q-148.8.08-297.6,0c-28.76,0-50.91-21.8-51-49.91C-.11,21.55,21.86,0,51.36,0Q125.76,0,200.16,0Z" />
								<path d="M149.56,249.34q-49.47,0-98.95,0c-28.68,0-50.68-21.91-50.6-50.17s22.22-49.92,51-49.94q99-.08,197.9,0c28.87,0,50.89,21.64,51,49.88.07,28.47-21.65,50.17-50.46,50.24C216.11,249.41,182.84,249.34,149.56,249.34Z" />
								<path d="M49.87,400C21.87,399.94.09,378.15,0,350.14a50,50,0,0,1,50.59-50.28A49.9,49.9,0,0,1,100.43,350C100.44,378.39,78.52,400.06,49.87,400Z" />
							</g>
						</svg>
						<div className="font-bold text-md sm:text-lg">
							<span className="text-lg sm:text-xl">Formsify</span>
							<br />
							Let's Create Better Forms
						</div>
						<div>Copyright © 2022 - All Rights Reserved</div>
					</div>
					<div>
						<div className="-mt-4 grid grid-flow-col gap-4">
							<a
								href="https://twitter.com/formsifying"
								target="_blank"
								rel="noreferrer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									className="fill-primary-content hover:shadow-lg"
								>
									<title>Twitter</title>
									<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
								</svg>
							</a>
							<a
								href="https://github.com/githubotoro/formsify-web3-app"
								target="_blank"
								rel="noreferrer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									className="fill-primary-content hover:shadow-lg"
								>
									<title>GitHub</title>
									<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
								</svg>
							</a>
							<a href="" target="_blank" rel="noreferrer">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									className="fill-primary-content hover:shadow-lg"
								>
									<title>Hashnode</title>
									<path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z" />
								</svg>
							</a>
						</div>
					</div>
				</footer>
			</>
		);
	};

	return <>{FooterContent()}</>;
};

export default Footer;
