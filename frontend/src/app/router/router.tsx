import { TelegramProvider } from "@app/context/TelegramContext/TelegramContext";
import { navigationItems } from "@entities/NavigationPanel/const/navigationItems";
import { BOT_INVITE_LINK } from "@entities/WalletInit/lib/botInviteLink";
import { MANIFEST_URL } from "@entities/WalletInit/lib/manifest";
import { AddWalletPage } from "@pages/AddWalletPage/ui/AddWalletPage";
import { ImportWalletPage } from "@pages/ImportWalletPage/ui/ImportWalletPage";
import { LaunchpadPage } from "@pages/LaunchPadPage/ui/LaunchpadPage";
import { MarketPage } from "@pages/MarketPage/ui/MarketPage";
import { ProfilePage } from "@pages/ProfilePage/ui/ProfilePage";
import { TokenPage } from "@pages/TokenPage/ui/TokenPage";
import { TokenTradePage } from "@pages/TokenTradePage/ui/TokenTradePage";
import { WalletAddressPage } from "@pages/WalletAddressPage/ui/WalletAddressPage";
import { WalletListPage } from "@pages/WalletListPage/ui/WalletListPage";
import { WithdrawPage } from "@pages/WithdrawPage/ui/WithdrawPage";
import { queryClient } from "@shared/api/queryClient/queryClient";
import { RootLayout } from "@shared/ui/RootLayout/RootLayout";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { QueryClientProvider } from "@tanstack/react-query";
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
import { useEffect, useMemo, useState } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';
import { App } from "@app/ui/App";
import AddTradesTokenFormPage from "@pages/AddTradesTokenFormPage/ui/AddTradesTokenFormPage";

function RootElement() {
    return (
        <App>
            {<Outlet />}
        </App>
    )
}

const routerConfig = createBrowserRouter([
    {
        path: "/",
        element: <RootElement />,
        children: [
            {
                index: true,
                element: <MarketPage />,
            },
            {
                path: '/wallet',
                element: <AddWalletPage />,
            },
            {
                path: '/wallet/import',
                element: <ImportWalletPage />
            },
            {
                path: '/wallet/deposit/:chain',
                element: <WalletListPage />
            },
            {
                path: '/wallet/withdraw/:chain',
                element: <WithdrawPage />
            },
            {
                path: '/wallet/address/:chain',
                element: <WalletAddressPage />
            },
            {
                path: '/profile',
                element: <ProfilePage />
            },
            {
                path: '/launchpad',
                element: <LaunchpadPage />
            },
            {
                path: '/token/:id',
                element: <TokenPage />
            },
            {
                path: '/token/trade/:id',
                element: <TokenTradePage />
            },
            {
                path: '/token/create',
                element: <AddTradesTokenFormPage />
            },
        ]
    },
]);

export {
    routerConfig
}