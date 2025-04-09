import { cn } from '@shared/lib/utils/cn'
import * as React from 'react'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-14 bg-input px-3 py-2 text-base text-foreground ring-offset-background file:border-0 file:bg-transparent font-medium focus-visible:outline-none placeholder:text-foreground/30 placeholder:text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				ref={ref}
				{...props}
			/>
		)
	},
)
Input.displayName = 'Input'

export { Input }