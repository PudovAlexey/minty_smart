import './app.css';
import { PropsWithChildren } from "react";
import { TelegramProvider } from "@app/context/TelegramContext/TelegramContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/api/queryClient/queryClient";
import { ConnectionWalletProvider } from "@app/context/ConnectionWalletProvider/model/ConnectionWalletProvider";
import { RootLayout } from "@shared/ui/RootLayout/RootLayout";
import { navigationItems } from "@entities/NavigationPanel/const/navigationItems";
import { InstructionsContextProvider } from '@app/context/InstructionsContext/InstructionsContext';

function App({ children }: PropsWithChildren) {
    return (
        <InstructionsContextProvider>
            <QueryClientProvider client={queryClient}>
                <TelegramProvider>
                    <ConnectionWalletProvider>
                        <RootLayout navigationItems={navigationItems}>
                            {children}
                        </RootLayout>
                    </ConnectionWalletProvider>
                </TelegramProvider>
            </QueryClientProvider>
        </InstructionsContextProvider>
    )
}

export {
    App
}