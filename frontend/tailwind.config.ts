/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'

const config = {
	darkMode: ['class'],
	content: [
		'./index.html',
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'./src/app/ui/**/*.{js,jsx,ts,tsx}',
	],
	prefix: '',
	theme: {
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				positive: 'hsl(var(--positive))',
				negative: 'hsl(var(--negative))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				32: '32px',
				26: '26px',
				24: '24px',
				22: '22px',
				18: '18px',
				17: '17px',
				16: '16px',
				14: '14px',
				9: '9px',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			boxShadow: {
				btn: '0 4px 8px 10px rgba(0,0,0,0.1), 0 15px 15px 0px rgba(0,0,0,0.09), 0 34px 21px 0px rgba(0,0,0,0.05), 0 61px 24px 0px rgba(0,0,0,0.01)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
