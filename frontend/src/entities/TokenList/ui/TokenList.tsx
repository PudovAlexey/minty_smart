import { useCallback, useEffect, useState } from "react";
import { TokenItem, TokenItemProps } from "./TokenItem";
import { useInstructionsContext } from "@app/context/InstructionsContext/InstructionsContext";
import {PublicKey} from '@solana/web3.js';
import { useGetTokens } from "../lib/hooks/useGetTokens";

// {
// 	image: DogeIcon,
// 	token: 'ton',
// 	symbol: 'DOGE',
// 	name: 'DOGE Coin',
// 	price: 0.5,
// 	change: -0.15,
// 	chart: [20, 50, 30, 100, 77, 30, 50, 40, 80, 95, 10],
// },

type TokensListProps = {
	searchValue: string,
}

function TokensList({
	searchValue,
}: TokensListProps) {
	const { tokens } = useGetTokens({
		searchValue,
		page: 1,
	});

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