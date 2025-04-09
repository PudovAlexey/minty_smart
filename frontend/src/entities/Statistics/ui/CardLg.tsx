import { cn } from '@shared/lib/utils/cn';
import type { PropsWithChildren } from 'react'

type CardLgProps = PropsWithChildren<{ title: string; className?: string }>

export const CardLg = ({ title, children, className }: CardLgProps) => {
	return (
		<div
			className={cn(
				'bg-foreground/5 text-card-foreground rounded-22 font-medium w-full px-[22px] py-[18px] gap-3 flex flex-col items-start justify-start',
				className,
			)}
		>
			<h3 className="opacity-50 leading-none text-sm">
				{title}
			</h3>
			{children}
		</div>
	)
}
