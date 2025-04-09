import { TokenProps } from "@entities/TokenList/api/types";
import DogeIcon from '@shared/assets/token/doge.webp';
import DucIcon from '@shared/assets/token/duk.webp';
import DwfcIcon from '@shared/assets/token/dwifc.webp';
import GSpotIcon from '@shared/assets/token/gspot.webp';

const tokens: TokenProps[] = [
        {
            image: DogeIcon,
            token: 'ton',
            symbol: 'DOGE',
            name: 'DOGE Coin',
            price: 0.5,
            change: -0.15,
            chart: [20, 50, 30, 100, 77, 30, 50, 40, 80, 95, 10],
        },
        {
            image: DucIcon,
            token: 'sol',
            symbol: 'DUK',
            name: 'DUKTOKEN',
            price: 0.0000149561,
            change: 44.98,
            chart: [40, 59, 89, 100, 74, 12, 48, 49, 28, 38, 19],
        },
        {
            image: DwfcIcon,
            token: 'ton',
            symbol: 'dwifc',
            name: 'HAHAHA',
            price: 13.1233345,
            change: 1.345,
            chart: [11, 23, 34, 22, 63, 71, 88, 99, 75, 40, 55],
        },
        {
            image: GSpotIcon,
            token: 'ton',
            symbol: 'gspot',
            name: 'gspot coin',
            price: 0.000000579123,
            change: 15.13,
            chart: [25, 75, 44, 55, 55, 30, 15, 30, 95, 85],
        },
        {
            image: DwfcIcon,
            token: 'sol',
            symbol: 'LONGNAmeeeee',
            name: 'LONGNAmeeeee',
            price: 124553.334,
            change: 565.39,
            chart: [31, 88, 12, 93, 512, 57, 12, 25, 28, 33, 75],
        },
        {
            image: DogeIcon,
            token: 'ton',
            symbol: 'SHIBA',
            name: 'SHIBA Coin',
            price: 11.23,
            change: -51.2,
            chart: [10, 95, 80, 40, 50, 30, 77, 100, 30, 50, 20],
        },
        {
            image: DucIcon,
            token: 'ton',
            symbol: 'DUK',
            name: 'DUKTOKEN',
            price: 0.0000149561,
            change: 44.98,
            chart: [40, 59, 89, 100, 74, 12, 48, 49, 28, 38, 19],
        },
        {
            image: DwfcIcon,
            token: 'sol',
            symbol: 'JOKER',
            name: 'JOKER',
            price: 66.6,
            change: 66.666,
            chart: [11, 23, 34, 22, 63, 71, 88, 99, 75, 40, 55],
        },
        {
            image: GSpotIcon,
            token: 'sol',
            symbol: 'DOTA',
            name: 'DOTA2',
            price: 0.95812,
            change: -80.95,
            chart: [85, 95, 30, 15, 30, 55, 55, 44, 75, 25],
        },
        {
            image: DucIcon,
            token: 'ton',
            symbol: 'SHOPR',
            name: 'SHOPR',
            price: 0.07563,
            change: 12.23,
            chart: [13, 16, 39, 55, 13, 13, 12, 25, 28, 33, 75],
        },
    ]

    export {
        tokens
    }