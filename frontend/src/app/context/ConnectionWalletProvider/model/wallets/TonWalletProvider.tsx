import { BOT_INVITE_LINK } from "@entities/WalletInit/lib/botInviteLink";
import { MANIFEST_URL } from "@entities/WalletInit/lib/manifest";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react"
import { PropsWithChildren, useEffect, useState } from "react"

function TonWalletProvider({ children }: PropsWithChildren) {
        const [twaReturnUrl, setTwaReturnUrl] = useState<string | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const startParam = urlParams.get('start');
        const url = startParam
            ? `${BOT_INVITE_LINK}?startapp=${startParam}`
            : `${BOT_INVITE_LINK}`;
        setTwaReturnUrl(url);
    }, []);

    return (
        <TonConnectUIProvider
            manifestUrl={MANIFEST_URL}
            language="ru"
            uiPreferences={{
                borderRadius: 'm',
                theme: THEME.LIGHT,
            }}
            actionsConfiguration={{
                twaReturnUrl: twaReturnUrl as `${string}://${string}`,
            }}
        >
            {children}
        </TonConnectUIProvider>
    )
}

export {
    TonWalletProvider
}