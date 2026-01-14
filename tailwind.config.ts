
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Gamification Colors
				game: {
					gold: 'hsl(var(--game-gold))',
					orange: 'hsl(var(--game-orange))',
					purple: 'hsl(var(--game-purple))',
					pink: 'hsl(var(--game-pink))',
					teal: 'hsl(var(--game-teal))',
					indigo: 'hsl(var(--game-indigo))',
				},
				// Level Colors
				level: {
					bronze: 'hsl(var(--level-bronze))',
					silver: 'hsl(var(--level-silver))',
					gold: 'hsl(var(--level-gold))',
					platinum: 'hsl(var(--level-platinum))',
					diamond: 'hsl(var(--level-diamond))',
				},
				// Score Colors
				score: {
					excellent: 'hsl(var(--score-excellent))',
					good: 'hsl(var(--score-good))',
					fair: 'hsl(var(--score-fair))',
					poor: 'hsl(var(--score-poor))',
				},
				// Dark theme specific
				dark: {
					bg: 'hsl(var(--dark-bg))',
					border: 'hsl(var(--dark-border))',
					card: 'hsl(var(--dark-card))',
				},
			},
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'xl': '1rem',
				'2xl': '1.25rem',
				'3xl': '1.5rem',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' }
				},
				'shine': {
					'100%': { left: '125%' },
				},
				'bounce-soft': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.85' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-2deg)' },
					'50%': { transform: 'rotate(2deg)' }
				},
				'pop': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'50%': { transform: 'scale(1.02)' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s infinite ease-in-out',
				'shine': 'shine 1.5s',
				'bounce-soft': 'bounce-soft 2s infinite ease-in-out',
				'pulse-soft': 'pulse-soft 2s infinite ease-in-out',
				'wiggle': 'wiggle 0.3s ease-in-out',
				'pop': 'pop 0.3s ease-out forwards',
				'slide-up': 'slide-up 0.4s ease-out forwards',
				'fade-in': 'fade-in 0.3s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out forwards',
				'spin-slow': 'spin-slow 3s linear infinite',
			},
			boxShadow: {
				// Apple-style soft shadows
				'apple-sm': '0 1px 3px rgba(0, 0, 0, 0.08)',
				'apple': '0 2px 10px rgba(0, 0, 0, 0.08)',
				'apple-md': '0 4px 20px rgba(0, 0, 0, 0.1)',
				'apple-lg': '0 10px 40px rgba(0, 0, 0, 0.12)',
				'apple-xl': '0 20px 60px rgba(0, 0, 0, 0.15)',
				// Card shadows
				'card': '0 2px 8px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 8px 30px rgba(0, 0, 0, 0.1)',
				// Glow effects for gamification
				'glow-blue': '0 0 20px rgba(0, 122, 255, 0.3)',
				'glow-gold': '0 0 20px rgba(255, 214, 10, 0.4)',
				'glow-green': '0 0 20px rgba(52, 199, 89, 0.3)',
				'glow-purple': '0 0 20px rgba(175, 82, 222, 0.3)',
				// Inner shadows for inputs
				'inner-soft': 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-apple': 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
				'gradient-gold': 'linear-gradient(135deg, #FFD60A 0%, #FF9500 100%)',
				'gradient-success': 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
				'gradient-hero': 'linear-gradient(180deg, #000000 0%, #0A0A0A 100%)',
				'gradient-rainbow': 'linear-gradient(90deg, #FF3B30, #FF9500, #FFD60A, #34C759, #007AFF, #5856D6, #AF52DE)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
