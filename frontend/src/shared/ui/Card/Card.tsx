import { cn } from "@shared/lib/utils/cn"
import React from "react"

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('bg-card text-card-foreground', className)}
		{...props}
	/>
))
Card.displayName = 'Card'

export {
    Card
}