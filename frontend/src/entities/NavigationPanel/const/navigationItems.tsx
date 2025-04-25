import {Market, Launchpad, Wallet, Profile} from '@shared/assets/icons'

const navigationItems = [
	{
		name: 'Market',
		icon: <Market />,
		href: '/',
	},
	{
		name: 'Launchpad',
		icon: <Launchpad />,
		href: '/launchpad',
		disabled: true,
	},
	{
		name: 'Wallet',
		icon: <Wallet />,
		href: '/wallet?balance',
	},
	{
		name: 'P to P',
		icon: <Wallet />,
		href: '/peer-to-peer',
	},
	{
		name: 'Profile',
		icon: <Profile />,
		href: '/profile',
		disabled: true,
	},
]

export {
	navigationItems
}