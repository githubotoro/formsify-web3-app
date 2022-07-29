import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// RAINBOW KIT IMPORTS
import "@rainbow-me/rainbowkit/styles.css";
import {
	getDefaultWallets,
	RainbowKitProvider,
	lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// RAINBOW KIT IMPORTS

// RAINBOW KIT CONFIGURATIONS
const { chains, provider } = configureChains(
	[chain.polygonMumbai],
	[alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "Formsify",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});
// RAINBOW KIT CONFIGURATIONS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				chains={chains}
				theme={lightTheme({
					accentColor: "black",
					accentColorForeground: "white",
					borderRadius: "large",
				})}
			>
				<App />
			</RainbowKitProvider>
		</WagmiConfig>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
