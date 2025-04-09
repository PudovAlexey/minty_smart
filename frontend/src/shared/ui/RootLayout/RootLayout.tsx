// const grotesk = Space_Grotesk({
// 	subsets: ['latin'],
// 	weight: ['700', '500', '400'],
// })
import { PropsWithChildren } from "react";
import { NavigationPanel } from "../NavigationPanel/ui/NavigationPanel"
import { Toaster } from "sonner";

type NavigationItem = {
    name: string;
    icon: React.ReactNode;
    href: string;
    disabled?: boolean;
}

type RootLayoutProps = {
    navigationItems: NavigationItem[]
}

function RootLayout({
    navigationItems,
    children,
}: PropsWithChildren<RootLayoutProps>) {
    return (
        <>
            <div className="absolute left-0 top-0 right-0 bottom-0 overflow-x-hidden overflow-y-auto">
                <div className="h-full scrollbar-hide">
                    {/* <Header /> */}
                    <main className="w-full h-full flex flex-col items-center justify-start max-w-screen-sm mx-auto">
                        {children}
                    </main>
                    <NavigationPanel items={navigationItems} />
                </div>
            </div>
            <Toaster />
        </>
    )
}

export {
    RootLayout
}