import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@shared/ui/Drawer/ui/Drawer'
import { Impact } from './impact'
import { Priority } from './priority'
import { Slippage } from './slippage'
import { Setting } from '@shared/assets/icons'
import { Button } from '@shared/ui/Button/Button'

export const SettingsDrawer = () => {
	return (
		<Drawer>
			<DrawerTrigger className="bg-foreground/10 text-primary w-[34px] h-[34px] rounded-full flex items-center justify-center absolute right-4 -top-16">
				<Setting />
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Transaction settings</DrawerTitle>
				</DrawerHeader>
				<Slippage />
				<Impact />
				<Priority />

				<DrawerClose asChild>
					<Button variant="accent" className="mt-14">
						Save
					</Button>
				</DrawerClose>
			</DrawerContent>
		</Drawer>
	)
}
