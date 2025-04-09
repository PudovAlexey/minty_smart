import { HomeHeader } from "@entities/TokenHeader/ui/TokenHeader"
import { TokensList } from "@entities/TokenList/ui/TokenList"
import { DexBanner } from "@entities/ui/DexBanner"
import { BannerCaroucel } from "@shared/ui/BanerCaroucel/BannerCaroucel"
import { SearchInput } from "@shared/ui/SearchInput/SearchInput"
import { Tabs } from "@shared/ui/Tabs/Tabs"
import { useState } from "react"

function MarketPage() {
    const [search, setSearch] = useState('');

    return (
        <>
            <HomeHeader/>
            <BannerCaroucel items={[
                <DexBanner />,
                <DexBanner />,
            ]} />
            <Tabs
                title="Tokens"
                items={[
                    {
                        key: 'Trending',
                        label: 'Trending',
                    },
                    {
                        key: 'Top',
                        label: 'Top',
                    },
                    {
                        key: 'Favorites',
                        label: 'Favorites',
                    }
                ]}
            />
            <SearchInput value={search} onChange={(val) => setSearch(val)} />
            <TokensList searchValue={search} />
        </>
    )
}

export {
    MarketPage
}