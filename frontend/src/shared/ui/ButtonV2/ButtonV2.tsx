import { PropsWithChildren } from "react";

function ButtonV2({children}: PropsWithChildren) {
    return (
        <button>
            {children}
        </button>
    )
}

export {
    ButtonV2
}