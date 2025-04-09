import { PropsWithChildren } from "react"

type SpaceProps = {
    space: 2 | 4 | 6 | 8
}

function VSpace({space, children}: PropsWithChildren<SpaceProps>) {
    return (
        <div className={`flex flex-col px-4 gap-${space}`}>
            {children}
		</div>
    )
}

export {
    VSpace
}