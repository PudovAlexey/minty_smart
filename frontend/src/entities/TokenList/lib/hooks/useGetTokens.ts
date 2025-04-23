// import { TokenProps } from "@entities/TokenList/api/types";
import { useEffect, useState } from "react";
import {tokens as MockTockens} from '../const/mockTokens';
import { io } from "socket.io-client";
import { useGetSuppliedTokenListHandlerInfinite } from "@shared/api/api_schema/queries/infiniteQueries";
import { GetSupplietListResponse, MarketPairToPriceUpdate, SortByVariants } from "@shared/api/api_schema/requests";

const SOCKET_SERVER_URL = 'http://0.0.0.0:8000/prices.io';

type UseGetTokensProps = {
    searchValue: string,
    page: number,
    tokenFilters: SortByVariants
}

export const useGetTokens = ({
    searchValue,
    page,
    tokenFilters
}: Partial<UseGetTokensProps>) => {
	const [tokens, setTokens] = useState<GetSupplietListResponse[]>([]);
    const {data, fetchNextPage} = useGetSuppliedTokenListHandlerInfinite({
        query: {
            page: 1,
            page_size: 100,
            search_value: searchValue,
            sort_by: tokenFilters
        }
    });

    useEffect(() => {
        console.log('data', data);
        if (data) {
            const flatData = data.pages.flatMap(page => page);
            setTokens(flatData as GetSupplietListResponse[]);
        }
    }, [data])

    useEffect(() => {
        const socket = io(SOCKET_SERVER_URL);

        socket.on("new_prices", (message: MarketPairToPriceUpdate[]) => {
            const tokensToUpdate = tokens.map((item) => {
                const foundTokenToUpdate = message.find((priceUpdate) => priceUpdate.id === item.id);

                if (foundTokenToUpdate) {
                    return {
                        ...item,
                        current_price: foundTokenToUpdate.new_price,
                        history: [...item.history, foundTokenToUpdate.new_price],
                        price_spread: foundTokenToUpdate.new_price - item.current_price

                    }
                } else {
                    return item
                }
            })
            setTokens(tokensToUpdate)
          });
    })

	return {
        tokens
    }
}
