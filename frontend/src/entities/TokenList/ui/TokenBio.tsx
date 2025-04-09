export type TokenBioProps = {
	symbol: string
	name: string
}

function TokenBio({ symbol, name }: TokenBioProps) {
	return (
		<div className="flex items-start text-xs justify-center flex-col font-bold">
			<span className="uppercase w-20 truncate">{symbol}</span>
			<span className="opacity-30 w-20 truncate">{name}</span>
		</div>
    )
}


export {
    TokenBio
}