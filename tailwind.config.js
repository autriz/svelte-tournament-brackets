import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,ts,svelte}"],
	darkMode: "class",
	theme: {
		screens: {
			xs: "475px",
			sm: "650px",
			md: "868px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1540px",
			"3xl": "1792px",
			"4xl": "2048px",
			"5xl": "2304px",
			"6xl": "2560px",
			...defaultTheme.screens,
		},
		// fontSize: {
		//   'tiny': '.65rem',
		//   'xs': '.75rem',
		//   'sm': '.80rem',
		//   'base': '1rem',
		//   'lg': '1.125rem',
		//   'xl': '1.25rem',
		//   '2xl': '1.5rem',
		//   '3xl': '1.875rem',
		//   '4xl': '2.25rem',
		//   '5xl': '3rem',
		//   '6xl': '4rem',
		//   '7xl': '5rem'
		// },
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground:
						"hsl(var(--primary-foreground) / <alpha-value>)",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground:
						"hsl(var(--secondary-foreground) / <alpha-value>)",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground:
						"hsl(var(--destructive-foreground) / <alpha-value>)",
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground:
						"hsl(var(--popover-foreground) / <alpha-value>)",
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
			},
			keyframes: {
				animatedgradient: {
					"0%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
					"100%": { backgroundPosition: "0% 50%" },
				},
			},
			boxShadow: {
				navlink: "inset 0 -4px hsl(var(--primary), <alpha-value>)",
				low: "0.1px 0.1px 0.2px hsl(var(--shadow-color) / 0),\
					0.3px 0.3px 0.6px hsl(var(--shadow-color) / 0.2),\
					0.5px 0.5px 1.1px hsl(var(--shadow-color) / 0.41)",
				medium: "0.1px 0.1px 0.2px hsl(var(--shadow-color) / 0),\
					0.7px 0.7px 1.5px hsl(var(--shadow-color) / 0.16),\
					1.3px 1.3px 2.8px hsl(var(--shadow-color) / 0.32),\
					2.7px 2.7px 5.7px hsl(var(--shadow-color) / 0.48)",
				high: "0.1px 0.1px 0.2px hsl(var(--shadow-color) / 0),\
					1.3px 1.3px 2.8px hsl(var(--shadow-color) / 0.07),\
					2.4px 2.3px 5px hsl(var(--shadow-color) / 0.15),\
					3.5px 3.4px 7.3px hsl(var(--shadow-color) / 0.22),\
					4.8px 4.8px 10.2px hsl(var(--shadow-color) / 0.3),\
					6.7px 6.6px 14.1px hsl(var(--shadow-color) / 0.37),\
					9.3px 9.1px 19.5px hsl(var(--shadow-color) / 0.45),\
					12.8px 12.6px 26.9px hsl(var(--shadow-color) / 0.52)",
			},
			backgroundSize: {
				"200%": "200%",
				"300%": "300%",
			},
			animation: {
				gradient: "animatedgradient 1s ease infinite alternate",
			},
		},
	},
	plugins: [],
};
