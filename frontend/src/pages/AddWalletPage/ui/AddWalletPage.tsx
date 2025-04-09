import { AddWalletBanner } from "@entities/AddWalletBanner/ui/AddWalletBanner";
import { WalletInit } from "@entities/WalletInit/ui/WalletInit"
import { BalanceTab } from "@features/BalanceTab/ui/BalanceTab";
import { cn } from "@shared/lib/utils/cn";
import { VSpace } from "@shared/ui/Space/Space"
import { Tabs } from "@shared/ui/Tabs/Tabs"
import { useTonAddress, } from "@tonconnect/ui-react";
import { useMemo } from "react"
import { useSearchParams } from "react-router";

function AddWalletPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const address = useTonAddress();
    

    const activeKey = useMemo(() => searchParams.get('active_tab') || 'balance', [searchParams]);

    const walletCreated = !!address
    return (
        <div
            className={cn(
                'h-full w-full bg-gradient-to-t to-destructive flex flex-col',
                walletCreated
                    ? 'from-positive from-50%'
                    : 'from-[#209A80] to-80%',
            )}
        >
            <div className="flex gap-4 px-4 pt-6 mb-[22px]">
                <Tabs
                    onActiveKeyChange={(key) => setSearchParams({
                        "active_tab": key
                    })}
                    activeKey={activeKey}
                    items={[
                        {
                            key: 'balance',
                            label: 'Balance'
                        },
                        {
                            key: 'wallet',
                            label: 'Wallet'
                        },
                    ]} />
            </div>
            {activeKey === "balance" ? (
                <BalanceTab/>
            ) : (
                <VSpace space={4}>
                    <WalletInit token="ton" />
                    <WalletInit token="sol" />
                </VSpace>
            )}
        </div>
    )
}

export {
    AddWalletPage
}