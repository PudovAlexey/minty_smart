import { ArrowSwap } from "@shared/assets/icons"

type SwitchButtonProps = {
	onClick?: () => void
}

export const SwitchButton = ({ onClick }: SwitchButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex items-center justify-center font-medium my-4 gap-1.5"
		>
			<ArrowSwap />
			SWITCH
		</button>
	)
}
