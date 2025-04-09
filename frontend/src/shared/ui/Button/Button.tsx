import { Slot } from '@radix-ui/react-slot'
import { cn } from '@shared/lib/utils/cn'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-17 font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-foreground text-accent hover:bg-foreground/90 shadow-btn',
				accent: 'bg-positive text-accent hover:bg-positive/90',
				destructive: 'bg-secondary text-[#FF0235] hover:bg-secondary/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				badge: 'bg-[#25282D] border border-transparent',
				link: 'text-primary underline-offset-4 hover:underline',
				ghost: 'text-[#FF0235]',
			},
			size: {
				default: 'h-12 px-12',
				lg: 'h-[56px] rounded-18',
				badge: 'h-[42px] px-4 rounded-9',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
