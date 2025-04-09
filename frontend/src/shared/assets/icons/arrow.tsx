import type { SVGProps } from 'react'

export const Arrow = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="9"
			height="9"
			viewBox="0 0 9 9"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M2.22375 3.58887L4.5 1.31262L6.77625 3.58887"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M4.5 7.6875L4.5 1.37625"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
