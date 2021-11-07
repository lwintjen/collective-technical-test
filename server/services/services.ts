import { Config } from '../config/config';
import axios from 'axios';

interface CoinCapURIResponse {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    explorer: string;
}

export function startPolling(cache: any, config: Config): void {
    fetchTopRankedCrypto(cache, config.coinCapURI + "assets?limit=150");
};

export async function fetchTopRankedCrypto(cache: any, coinCapURI: string) {
    try {
        const res = await axios.get(coinCapURI);
        if (res.data?.data)
            cache.set("cryptoCurrencies", res.data.data);
    } catch (e) {
        console.error(e);
    }
};