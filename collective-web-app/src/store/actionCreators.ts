import * as actionTypes from "./actionTypes";

export const fetchCoins = (coins: ICoin[]): CoinAction => ({
    type: actionTypes.FETCH_COINS,
    coins,
});

export const setIsLiked = (coin: ICoin): CoinAction => ({
    type: actionTypes.SET_LIKED_COIN,
    coin,
});