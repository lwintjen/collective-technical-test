import { CoinCapURIResponse } from "src/types/currency";

export const SET_LIKED_COIN = "SET_LIKED_COIN";
export const FETCH_COINS = "FETCH_COINS";

export const mapICoin = (coins: CoinCapURIResponse[]): ICoin[] => coins.map(c => ({ liked: false, ...c }));