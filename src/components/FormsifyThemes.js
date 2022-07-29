import { useState } from "react";

const FormsifyThemes = (theme) => {
	const [globalFormsifyTheme, setGlobalFormsifyTheme] = useState("light");

	const formsifyThemesList = [
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

	if (theme !== "") {
		setGlobalFormsifyTheme(theme);
	}

	return globalFormsifyTheme;
};

export default FormsifyThemes;
