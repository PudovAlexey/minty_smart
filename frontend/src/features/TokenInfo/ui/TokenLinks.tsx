'use client'

import { CardLg } from "@entities/Statistics/ui/CardLg"
import { Discord, Instagram, Telegram, X } from "@shared/assets/icons"
import { openTelegramLink, openLink } from '@telegram-apps/sdk-react'

export type LinksProps = {
	[key: string]: string
}

export const Links = ({ ...links }: LinksProps) => {

	const linksWithoutOdd = Object.entries(links).filter(
		([key]) =>
			key === 'discord' ||
			key === 'telegram' ||
			key === 'x' ||
			key === 'instagram',
	)

	if (linksWithoutOdd.length === 0) return null

	const iconMap: { [key: string]: JSX.Element } = {
		discord: <Discord />,
		telegram: <Telegram />,
		x: <X />,
		instagram: <Instagram />,
	}

	return (
		<CardLg title="Links">
			<div className="flex justify-start gap-3.5">
				{linksWithoutOdd.map(([key, value]) => (
					<button
						type="button"
						key={key}
						onClick={() => {
							if (key === 'telegram') return openTelegramLink(value)

							return openLink(value, { tryInstantView: true })
						}}
					>
						{iconMap[key]}
					</button>
				))}
			</div>
		</CardLg>
	)
}
