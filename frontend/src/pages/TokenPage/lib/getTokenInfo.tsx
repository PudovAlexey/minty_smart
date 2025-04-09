import DogeIcon from '@shared/assets/token/doge.webp';

export const getTokenInfo = async (slug: string) => {
	return {
		image: DogeIcon,
		token: 'ton',
		symbol: slug.toUpperCase(),
		name: `${slug.toUpperCase()} Coin`,
		price: 0.5,
		change: -0.15,
		chart: [20, 50, 30, 100, 77, 30, 50, 40, 80, 95, 10],
		slug,
	}
}