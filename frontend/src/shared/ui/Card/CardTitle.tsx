import React from "react"

const CardTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			'text-2xl font-semibold leading-none tracking-tight',
			className,
		)}
		{...props}
	/>
))
CardTitle.displayName = 'CardTitle'

export {
    CardTitle
}