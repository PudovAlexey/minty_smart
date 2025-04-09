import { useCallback, useEffect, useState } from "react";
import { TokenProps } from "../api/types"
import { useGetTokens } from "../lib/hooks/useGetTokens"
import { TokenItem } from "./TokenItem";
import { useInstructionsContext } from "@app/context/InstructionsContext/InstructionsContext";

// {
// 	image: DogeIcon,
// 	token: 'ton',
// 	symbol: 'DOGE',
// 	name: 'DOGE Coin',
// 	price: 0.5,
// 	change: -0.15,
// 	chart: [20, 50, 30, 100, 77, 30, 50, 40, 80, 95, 10],
// },

type TokenProps = {
	image: string,
	token: string,
	symbol: string,
	name: string,
	price: number,
	change: number,
	chart: number[],
}

type TokensListProps = {
	searchValue: string,
}

function TokensList({
	searchValue,
}: TokensListProps) {
	const { suppliedTokenInstructions } = useInstructionsContext();
	// const { tokens } = useGetTokens();
	const [tokens, setTokens] = useState<TokenProps[]>([])

	const handleFetchSuppliedTokens = useCallback(async () => {
		const data = await suppliedTokenInstructions?.getAllSearchingSuppliedTokens(searchValue);

		if (data) {
			setTokens(data.map(({
				name,
				symbol,
				token_mint,
			}) => ({
				image: '',
				token: name,
				symbol: symbol,
				name: name,
				price: 0,
				change: 0,
				chart: [],
			})))
		}
	}, [searchValue])

	useEffect(() => {
		handleFetchSuppliedTokens()
	}, [handleFetchSuppliedTokens]);

	return (
		<>
			<div className="flex flex-col gap-3 w-full px-4 h-auto overflow-y-scroll scrollbar-hide relative">
				{tokens.map((token, index) => (
					<TokenItem key={index} {...token} />
				))}
				{/* <InfiniteScroll /> */}
			</div>

			<div className="relative h-px w-full z-20">
				<div className="absolute bottom-0 w-full h-5 bg-gradient-to-t from-background" />
			</div>
			<div className="min-h-[90px] bg-background w-full" />
		</>
	)
}

export {
	TokensList
}