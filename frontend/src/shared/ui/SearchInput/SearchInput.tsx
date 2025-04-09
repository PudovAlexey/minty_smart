import { Search } from "@shared/assets/icons";
import { Input } from "../Input/Input";

type TokensSearchProps = {
	value: string
	onChange: (value: string) => void
}


function SearchInput({
	value,
	onChange,
}: TokensSearchProps) {
	return (
		<div className="w-full relative">
			<div className="relative mb-3">
				<Search className="absolute left-3.5 top-1/2 -translate-y-1/2" />

				<Input
					value={value}
					onChange={(evt) => onChange && onChange(evt.target.value)}
					className="h-[46px] pl-10 w-full"
					placeholder="Search by token name, symbol or token"
					type="text"
					inputMode="search"
					autoCapitalize="off"
					autoCorrect="off"
					spellCheck="false"
				/>
			</div>
		</div>
	)
}

export {
	SearchInput
}
