'use client'

import { CardLg } from "@entities/Statistics/ui/CardLg"
import { Copy } from "@shared/assets/icons"
import { handleCopy } from "@shared/lib/utils/handleCopy"

// import { Copy } from '@/components/icons'
// import { handleCopy } from '@/lib/utils'
// import { CardLg } from './card-lg'

export type AddressProps = {
	address: string
}

export const Address = ({ address }: AddressProps) => {
	return (
		<CardLg title="Token Address" className="mb-3">
			<div className="font-normal">
				{address.slice(0, 4)}...{address.slice(-4)}
			</div>

			<button
				type="button"
				onClick={() => handleCopy(address)}
				className="text-sm text-accent-foreground flex items-start gap-0.5 leading-none"
			>
				Copy
				<Copy />
			</button>
		</CardLg>
	)
}
