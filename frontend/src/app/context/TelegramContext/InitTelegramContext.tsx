import {
	postEvent,
	// useClosingBehavior,
	// useMainButton,
	// useMiniApp,
	// useViewport,
	miniApp,
	viewport,
	mainButton,
	closingBehavior,
	init,
	retrieveLaunchParams,
	parseInitData,
	backButton,
	mockTelegramEnv,
} from '@telegram-apps/sdk-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const InitTelegramContext = () => {
	const navigate = useNavigate();

	const handleInitTelegram = () => {
		init({
			acceptCustomStyles: true
		})
		miniApp.mount();
		mainButton.mount();
		closingBehavior.mount();
		backButton.mount();
		miniApp.setHeaderColor('#11141A');
		miniApp.setBackgroundColor('#11141A')
		viewport?.expand()
		mainButton.setParams({
			isEnabled: false
		});
		closingBehavior?.enableConfirmation()
		import.meta.env.VITE_ENV !== 'development' &&
			postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false })

		retrieveLaunchParams()

		backButton.onClick(function() {
			navigate(-1)
		})
	}

	const handleMockInitTelegram = () => {

		mockTelegramEnv({
			themeParams: {
				accentTextColor: '#6ab2f2',
				bgColor: '#17212b',
				buttonColor: '#5288c1',
				buttonTextColor: '#ffffff',
				destructiveTextColor: '#ec3942',
				headerBgColor: '#17212b',
				hintColor: '#708499',
				linkColor: '#6ab3f3',
				secondaryBgColor: '#232e3c',
				sectionBgColor: '#17212b',
				sectionHeaderTextColor: '#6ab3f3',
				subtitleTextColor: '#708499',
				textColor: '#f5f5f5',
			},
			initData: {
				user: {
					id: 99281932,
					firstName: 'Andrew',
					lastName: 'Rogue',
					username: 'rogue',
					languageCode: 'en',
					isPremium: true,
					allowsWriteToPm: true,
				},
				hash: '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
				authDate: new Date(1716922846000),
				signature: 'abc',
				startParam: 'debug',
				chatType: 'sender',
				chatInstance: '8428209589180549439',
			},
			initDataRaw: new URLSearchParams([
				['user', JSON.stringify({
					id: 99281932,
					first_name: 'Andrew',
					last_name: 'Rogue',
					username: 'rogue',
					language_code: 'en',
					is_premium: true,
					allows_write_to_pm: true,
				})],
				['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
				['auth_date', '1716922846'],
				['start_param', 'debug'],
				['signature', 'abc'],
				['chat_type', 'sender'],
				['chat_instance', '8428209589180549439'],
			]).toString(),
			version: '7.2',
			platform: 'tdesktop',
		});
	}

	useEffect(() => {
		if (import.meta.env.VITE_ENV === 'development') {
			handleMockInitTelegram()
		} else {
			handleInitTelegram()
		}
	}, []);

	return null
}
