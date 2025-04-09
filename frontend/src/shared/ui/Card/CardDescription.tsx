import { cn } from "@shared/lib/utils/cn"
import React from "react"

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn('text-sm text-muted-foreground', className)}
		{...props}
	/>
))
CardDescription.displayName = 'CardDescription'

export {
    CardDescription
}