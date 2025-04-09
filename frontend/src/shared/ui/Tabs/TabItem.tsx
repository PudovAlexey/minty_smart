import { cn } from "@shared/lib/utils/cn";
import { PropsWithChildren } from "react";

const TabItem = ({
	children,
	active,
	onClick,
}: PropsWithChildren<{ active?: boolean; onClick: () => void }>) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'opacity-50 capitalize',
				active && 'text-accent-foreground opacity-100',
			)}
		>
			{children}
		</button>
	)
}

export {
    TabItem
}