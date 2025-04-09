import { cn } from "@shared/lib/utils/cn"
import { Link } from "react-router"

type NavigationItem = {
    name: string,
    icon: React.ReactNode,
    href: string,
    disabled?: boolean
}

type NavigationPanelProps = {
    items: NavigationItem[]
}

function NavigationPanel({items}: NavigationPanelProps) {
	const pathname = window.location.pathname;

	return (
		<nav className="fixed z-50 left-1/2 -translate-x-1/2 bottom-5 py-2.5 px-[18px] bg-secondary rounded-full flex items-center justify-between gap-3.5">
			{items.map(({ name, href, icon, disabled }) => (
				<Link
					key={href}
					to={href}
					className={cn(
						'flex items-center w-[54px] justify-center flex-col gap-0.5 stroke-foreground pb-px',
						pathname === href &&
							'text-primary-foreground stroke-primary-foreground',
						disabled && 'opacity-50 pointer-events-none',
					)}
				>
					{icon}
					<span className="text-[10px] font-bold">{name}</span>
				</Link>
			))}
		</nav>
	)
}

export {
    NavigationPanel
}