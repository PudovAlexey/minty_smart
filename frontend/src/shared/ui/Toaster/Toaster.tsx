import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme="dark"
			className="toaster group"
			position="bottom-center"
			toastOptions={{
				classNames: {
					toast:
						'group toast group-[.toaster]:border-none group-[.toaster]:rounded-18 group-[.toaster]:text-sm group-[.toaster]:font-bold',
					description: 'group-[.toast]:text-muted-foreground',
					actionButton:
						'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
					cancelButton:
						'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
					success: 'group-[.toaster]:bg-positive group-[.toaster]:text-primary',
					error: 'group-[.toaster]:bg-negative group-[.toaster]:text-primary',
					info: 'group-[.toaster]:bg-input group-[.toaster]:text-foreground',
					title: 'font-bold',
				},
			}}
			{...props}
		/>
	)
}

export { Toaster }