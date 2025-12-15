/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				// Material Design 3 inspired colors
				primary: "#6750A4",
				onPrimary: "#FFFFFF",
				primaryContainer: "#EADDFF",
				onPrimaryContainer: "#21005D",
				secondary: "#625B71",
				onSecondary: "#FFFFFF",
				secondaryContainer: "#E8DEF8",
				onSecondaryContainer: "#1D192B",
				tertiary: "#7D5260",
				onTertiary: "#FFFFFF",
				tertiaryContainer: "#FFD8E4",
				onTertiaryContainer: "#31111D",
				error: "#B3261E",
				onError: "#FFFFFF",
				errorContainer: "#F9DEDC",
				onErrorContainer: "#410E0B",
				background: "#FEF7FF",
				onBackground: "#1D1B20",
				surface: "#FEF7FF",
				onSurface: "#1D1B20",
				surfaceVariant: "#E7E0EC",
				onSurfaceVariant: "#49454F",
				outline: "#79747E",
			},
			fontFamily: {
				sans: ["Roboto", "sans-serif"], // Or Inter/Outfit as per instructions, trying to stick to MD3 feel
				mono: ["Fira Code", "Roboto Mono", "monospace"],
			},
		},
	},
	plugins: [],
};
