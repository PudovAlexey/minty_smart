import { TokenProps } from "@entities/TokenList/api/types";
import { useEffect, useState } from "react";
import {tokens as MockTockens} from '../const/mockTokens';

export const useGetTokens = (page?: number) => {
	const [tokens, setTokens] = useState<TokenProps[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setTokens(MockTockens)
        }, 300);
    }, []);

	return {
        tokens
    }
}
