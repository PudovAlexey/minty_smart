import { TokensList } from "@entities/TokenList/ui/TokenList";
import { TokensSearch } from "@entities/TokensSearch/ui/TokensSearch";
import { ChainFilters, Filter } from "@shared/ui/ChainFilters/ChainFilters";
import { useEffect, useState } from "react"

export const AssetsList = () => {
	const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<Filter>('all')

	console.log(search)

	// useEffect(() => {
	// 	;(async () => {
	// 		const tokens = await getTokens()
	// 		setTokens(tokens)
	// 	})()
	// }, [])

	return (
		<div className="bg-[#1D2025] rounded-t-24 h-auto px-4 py-[26px] grow flex flex-col">
			<h1 className="font-bold text-xl leading-none mb-3">My assets</h1>
			<ChainFilters activeFilter={filter} setFilter={setFilter} />
			<TokensSearch value={search} onChange={(val) => setSearch(val)} />

			<div className="grow shrink" id="token-list-box">
				<TokensList searchValue={search} />
			</div>
		</div>
	)
}
