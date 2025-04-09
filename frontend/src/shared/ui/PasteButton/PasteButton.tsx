type PasteButtonProps = {
	onClick: () => void
	disabled: boolean
}

export const PasteButton = ({ onClick, disabled }: PasteButtonProps) => {
	return (
		<button
			type="button"
			className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 h-14 px-14 font-bold rounded-full flex items-center justify-center border border-positive/5 bg-secondary"
			disabled={disabled}
			onClick={onClick}
		>
			Paste
		</button>
	)
}
