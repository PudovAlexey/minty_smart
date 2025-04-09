import { TokenImage } from '@entities/TokenList/ui/TokenImage'
import { Input, InputProps } from '@shared/ui/Input/Input'
import { forwardRef } from 'react'

type InputFieldProps = InputProps & {
	pic?: 'token' | 'dollar'
	token?: 'ton' | 'sol'
	image?: string
	label: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
	({ token, pic, image, label, ...props }, ref) => {
		return (
			<label className="h-[70px] w-full bg-input border border-foreground/5 rounded-18 p-4 flex items-center justify-between">
				{image && token && <TokenImage image={image} token={token} size={38} />}

				{pic === 'dollar' && (
					<span className="min-w-[38px] h-[38px] text-2xl flex items-center justify-center font-medium opacity-50">
						$
					</span>
				)}

				<Input
					className="text-2xl placeholder:text-2xl ml-3 focus-visible:ring-0 border-none focus-visible:outline-none focus-visible:ring-offset-0 w-full p-0"
					type="number"
					inputMode="decimal"
					autoCapitalize="off"
					autoComplete="off"
					autoCorrect="off"
					spellCheck="false"
					placeholder="10.00"
					ref={ref}
					{...props}
				/>

				<span className="font-medium opacity-50 text-base grow shrink-0 mr-2">
					{label}
				</span>
			</label>
		)
	},
)
