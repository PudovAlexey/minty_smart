import type { PropsWithChildren } from 'react'

export const Label = ({ children }: PropsWithChildren) => {
	return <div className='leading-none font-medium mb-2.5'>{children}</div>
}
