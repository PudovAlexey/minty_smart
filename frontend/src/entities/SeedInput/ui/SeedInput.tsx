
import { Input, InputProps } from '@shared/ui/Input/Input'
import { forwardRef } from 'react'

type SeedInputProps = InputProps & {
	index: number
}

export const SeedInput = forwardRef<HTMLInputElement, SeedInputProps>(
	({ index, ...props }, ref) => {
		return (
			<div className="relative">
				<div className="absolute left-3.5 top-1/2 -translate-y-1/2 font-medium text-lg opacity-50">
					{index < 9 ? `0${index + 1}.` : `${index + 1}.`}
				</div>

				<Input
					type="text"
					inputMode="text"
					autoCapitalize="off"
					autoComplete="off"
					autoCorrect="off"
					spellCheck="false"
					ref={ref}
					{...props}
					className="h-[59px] rounded-18 pl-14 text-lg placeholder:text-lg border border-foreground/5"
				/>
			</div>
		)
	},
)
