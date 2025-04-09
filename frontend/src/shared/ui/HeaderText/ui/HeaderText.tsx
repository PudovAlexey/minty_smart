import { PropsWithChildren } from "react"

type HeaderTextProps = {
    title: string
    description: string
}

function HeaderText({title, description, children}: PropsWithChildren<HeaderTextProps>) {
    return (
		<div className="h-full flex flex-col w-full font-medium px-4 pt-6 scrollbar-hide overflow-y-scroll overflow-x-hidden">
			<h2 className="text-lg leading-none">{title}</h2>
			<p className="text-sm opacity-50 mb-[22px]">{description}</p>
			{children}
		</div>
	)
}

export {
    HeaderText
}