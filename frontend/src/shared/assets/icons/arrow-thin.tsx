import type { SVGProps } from 'react'

export const ArrowThin = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M14.5741 18.0103L5.98982 18.0103L5.98982 9.42598"
				strokeWidth="1.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M18.0107 5.98975L6.11014 17.8904"
				strokeWidth="1.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
