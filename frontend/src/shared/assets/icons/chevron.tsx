import type { SVGProps } from 'react'

export const Chevron = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M13.28 5.9668L8.93333 10.3135C8.42 10.8268 7.58 10.8268 7.06667 10.3135L2.72 5.9668"
				stroke="#22E1B7"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
