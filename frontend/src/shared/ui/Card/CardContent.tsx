import React from "react"

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={className} {...props} />
))
CardContent.displayName = 'CardContent'

export {
    CardContent
}