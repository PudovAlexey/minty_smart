import { PropsWithChildren } from "react";
import { InitTelegramContext } from "./InitTelegramContext";

function TelegramProvider({ children }: PropsWithChildren) {
	return (
		<>
			<InitTelegramContext />
			{children}
		</>
	)
}

export {
    TelegramProvider
}