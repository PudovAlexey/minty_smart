import ImportSOLKey from "@features/ImportSolKey/ui/ImportSolKey";
import ImportSOLSeed from "@features/ImportSOLSeed/ui/ImportSOLSeed";
import { Button } from "@shared/ui/Button/Button"
import { HeaderText } from "@shared/ui/HeaderText/ui/HeaderText"
import { NavTabs } from "@shared/ui/NavTabs/ui/NavTabs"
import { Tabs } from "@shared/ui/Tabs/Tabs"
import { useSearchParams } from "react-router";

function ImportWalletPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const activeKey = searchParams.get('active_tab') || '';

    return (
        //  <div>
        <HeaderText
            title="Import Solana wallet"
            description="Enter the private key or secret 12 phrases"
        >
            <NavTabs
                activeKey={activeKey}
                onActiveKeyChange={(key) => setSearchParams({
                    active_tab: key
                })}
                items={[
                    {
                        key: 'key',
                        label: 'PrivateKey'
                    },
                    {
                        key: 'seed',
                        label: 'SecretPhrase'
                    },
                ]}
            />
            {activeKey === 'key' ?
                <ImportSOLKey /> :
                <ImportSOLSeed />
            }
        </HeaderText>

        //  </div>
    )
}

export {
    ImportWalletPage
}