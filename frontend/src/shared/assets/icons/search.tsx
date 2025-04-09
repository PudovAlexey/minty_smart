import type { SVGProps } from 'react'

export const Search = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M10.7401 14.3026C10.7401 14.7601 10.44 15.3601 10.0575 15.5926L9.00005 16.2751C8.01755 16.8826 6.65254 16.2001 6.65254 14.9851V10.9726C6.65254 10.4401 6.35254 9.75757 6.04504 9.38257L3.16502 6.35256C2.78252 5.97006 2.48254 5.29507 2.48254 4.83757V3.09756C2.48254 2.19006 3.16506 1.50757 3.99756 1.50757H14.0025C14.835 1.50757 15.5175 2.19006 15.5175 3.02256V4.68756C15.5175 5.29506 15.135 6.05257 14.76 6.42757"
				stroke="white"
				strokeOpacity="0.3"
				strokeWidth="1.5"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12.0525 12.3901C13.378 12.3901 14.4525 11.3156 14.4525 9.9901C14.4525 8.66461 13.378 7.59009 12.0525 7.59009C10.727 7.59009 9.65247 8.66461 9.65247 9.9901C9.65247 11.3156 10.727 12.3901 12.0525 12.3901Z"
				stroke="white"
				strokeOpacity="0.3"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M14.9025 12.8401L14.1525 12.0901"
				stroke="white"
				strokeOpacity="0.3"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
